package org.edviz.contractsapp.service;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.Collectors;

import javax.persistence.ManyToMany;

import org.edviz.contractsapp.domain.City;
import org.edviz.contractsapp.domain.Country;
import org.edviz.contractsapp.domain.Department;
import org.edviz.contractsapp.domain.Employee;
import org.edviz.contractsapp.domain.Job;
import org.edviz.contractsapp.domain.Location;
import org.edviz.contractsapp.domain.Manager;
import org.edviz.contractsapp.domain.User;
import org.edviz.contractsapp.repository.CityRepository;
import org.edviz.contractsapp.repository.CountryRepository;
import org.edviz.contractsapp.repository.DepartmentRepository;
import org.edviz.contractsapp.repository.EmployeeRepository;
import org.edviz.contractsapp.repository.JobRepository;
import org.edviz.contractsapp.repository.LocationRepository;
import org.edviz.contractsapp.repository.ManagerRepository;
import org.edviz.contractsapp.repository.UserRepository;
import org.edviz.contractsapp.repository.search.CitySearchRepository;
import org.edviz.contractsapp.repository.search.CountrySearchRepository;
import org.edviz.contractsapp.repository.search.DepartmentSearchRepository;
import org.edviz.contractsapp.repository.search.EmployeeSearchRepository;
import org.edviz.contractsapp.repository.search.JobSearchRepository;
import org.edviz.contractsapp.repository.search.LocationSearchRepository;
import org.edviz.contractsapp.repository.search.ManagerSearchRepository;
import org.edviz.contractsapp.repository.search.UserSearchRepository;
import org.elasticsearch.ResourceAlreadyExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Service
@Transactional(readOnly = true)
public class ElasticsearchIndexService {

    private static final Lock reindexLock = new ReentrantLock();

    private final Logger log = LoggerFactory.getLogger(ElasticsearchIndexService.class);

    private final CityRepository cityRepository;

    private final CitySearchRepository citySearchRepository;

    private final CountryRepository countryRepository;

    private final CountrySearchRepository countrySearchRepository;

    private final DepartmentRepository departmentRepository;

    private final DepartmentSearchRepository departmentSearchRepository;

    private final EmployeeRepository employeeRepository;

    private final EmployeeSearchRepository employeeSearchRepository;

    private final JobRepository jobRepository;

    private final JobSearchRepository jobSearchRepository;

    private final LocationRepository locationRepository;

    private final LocationSearchRepository locationSearchRepository;

    private final ManagerRepository managerRepository;

    private final ManagerSearchRepository managerSearchRepository;

    private final UserRepository userRepository;

    private final UserSearchRepository userSearchRepository;

    private final ElasticsearchTemplate elasticsearchTemplate;

    public ElasticsearchIndexService(
        UserRepository userRepository,
        UserSearchRepository userSearchRepository,
        CityRepository cityRepository,
        CitySearchRepository citySearchRepository,
        CountryRepository countryRepository,
        CountrySearchRepository countrySearchRepository,
        DepartmentRepository departmentRepository,
        DepartmentSearchRepository departmentSearchRepository,
        EmployeeRepository employeeRepository,
        EmployeeSearchRepository employeeSearchRepository,
        JobRepository jobRepository,
        JobSearchRepository jobSearchRepository,
        LocationRepository locationRepository,
        LocationSearchRepository locationSearchRepository,
        ManagerRepository managerRepository,
        ManagerSearchRepository managerSearchRepository,
        ElasticsearchTemplate elasticsearchTemplate) {
        this.userRepository = userRepository;
        this.userSearchRepository = userSearchRepository;
        this.cityRepository = cityRepository;
        this.citySearchRepository = citySearchRepository;
        this.countryRepository = countryRepository;
        this.countrySearchRepository = countrySearchRepository;
        this.departmentRepository = departmentRepository;
        this.departmentSearchRepository = departmentSearchRepository;
        this.employeeRepository = employeeRepository;
        this.employeeSearchRepository = employeeSearchRepository;
        this.jobRepository = jobRepository;
        this.jobSearchRepository = jobSearchRepository;
        this.locationRepository = locationRepository;
        this.locationSearchRepository = locationSearchRepository;
        this.managerRepository = managerRepository;
        this.managerSearchRepository = managerSearchRepository;
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Async
    @Timed
    public void reindexAll() {
        if (reindexLock.tryLock()) {
            try {
                reindexForClass(City.class, cityRepository, citySearchRepository);
                reindexForClass(Country.class, countryRepository, countrySearchRepository);
                reindexForClass(Department.class, departmentRepository, departmentSearchRepository);
                reindexForClass(Employee.class, employeeRepository, employeeSearchRepository);
                reindexForClass(Job.class, jobRepository, jobSearchRepository);
                reindexForClass(Location.class, locationRepository, locationSearchRepository);
                reindexForClass(Manager.class, managerRepository, managerSearchRepository);
                reindexForClass(User.class, userRepository, userSearchRepository);

                log.info("Elasticsearch: Successfully performed reindexing");
            } finally {
                reindexLock.unlock();
            }
        } else {
            log.info("Elasticsearch: concurrent reindexing attempt");
        }
    }

    @SuppressWarnings("unchecked")
    private <T, ID extends Serializable> void reindexForClass(Class<T> entityClass, JpaRepository<T, ID> jpaRepository,
                                                              ElasticsearchRepository<T, ID> elasticsearchRepository) {
        elasticsearchTemplate.deleteIndex(entityClass);
        try {
            elasticsearchTemplate.createIndex(entityClass);
        } catch (ResourceAlreadyExistsException e) {
            // Do nothing. Index was already concurrently recreated by some other service.
        }
        elasticsearchTemplate.putMapping(entityClass);
        if (jpaRepository.count() > 0) {
            // if a JHipster entity field is the owner side of a many-to-many relationship, it should be loaded manually
            List<Method> relationshipGetters = Arrays.stream(entityClass.getDeclaredFields())
                .filter(field -> field.getType().equals(Set.class))
                .filter(field -> field.getAnnotation(ManyToMany.class) != null)
                .filter(field -> field.getAnnotation(ManyToMany.class).mappedBy().isEmpty())
                .filter(field -> field.getAnnotation(JsonIgnore.class) == null)
                .map(field -> {
                    try {
                        return new PropertyDescriptor(field.getName(), entityClass).getReadMethod();
                    } catch (IntrospectionException e) {
                        log.error("Error retrieving getter for class {}, field {}. Field will NOT be indexed",
                            entityClass.getSimpleName(), field.getName(), e);
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

            int size = 100;
            for (int i = 0; i <= jpaRepository.count() / size; i++) {
                Pageable page = new PageRequest(i, size);
                log.info("Indexing page {} of {}, size {}", i, jpaRepository.count() / size, size);
                Page<T> results = jpaRepository.findAll(page);
                results.map(result -> {
                    // if there are any relationships to load, do it now
                    relationshipGetters.forEach(method -> {
                        try {
                            // eagerly load the relationship set
                            ((Set) method.invoke(result)).size();
                        } catch (Exception ex) {
                            log.error(ex.getMessage());
                        }
                    });
                    return result;
                });
                elasticsearchRepository.saveAll(results.getContent());
            }
        }
        log.info("Elasticsearch: Indexed all rows for {}", entityClass.getSimpleName());
    }
}
