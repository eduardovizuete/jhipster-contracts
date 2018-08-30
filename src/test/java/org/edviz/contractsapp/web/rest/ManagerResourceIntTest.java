package org.edviz.contractsapp.web.rest;

import org.edviz.contractsapp.ContractsApp;

import org.edviz.contractsapp.domain.Manager;
import org.edviz.contractsapp.domain.Department;
import org.edviz.contractsapp.domain.Employee;
import org.edviz.contractsapp.repository.ManagerRepository;
import org.edviz.contractsapp.repository.search.ManagerSearchRepository;
import org.edviz.contractsapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static org.edviz.contractsapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ManagerResource REST controller.
 *
 * @see ManagerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ContractsApp.class)
public class ManagerResourceIntTest {

    @Autowired
    private ManagerRepository managerRepository;


    /**
     * This repository is mocked in the org.edviz.contractsapp.repository.search test package.
     *
     * @see org.edviz.contractsapp.repository.search.ManagerSearchRepositoryMockConfiguration
     */
    @Autowired
    private ManagerSearchRepository mockManagerSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restManagerMockMvc;

    private Manager manager;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ManagerResource managerResource = new ManagerResource(managerRepository, mockManagerSearchRepository);
        this.restManagerMockMvc = MockMvcBuilders.standaloneSetup(managerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Manager createEntity(EntityManager em) {
        Manager manager = new Manager();
        // Add required entity
        Department department = DepartmentResourceIntTest.createEntity(em);
        em.persist(department);
        em.flush();
        manager.setDepartment(department);
        // Add required entity
        Employee employee = EmployeeResourceIntTest.createEntity(em);
        em.persist(employee);
        em.flush();
        manager.setEmployee(employee);
        return manager;
    }

    @Before
    public void initTest() {
        manager = createEntity(em);
    }

    @Test
    @Transactional
    public void createManager() throws Exception {
        int databaseSizeBeforeCreate = managerRepository.findAll().size();

        // Create the Manager
        restManagerMockMvc.perform(post("/api/managers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manager)))
            .andExpect(status().isCreated());

        // Validate the Manager in the database
        List<Manager> managerList = managerRepository.findAll();
        assertThat(managerList).hasSize(databaseSizeBeforeCreate + 1);
        Manager testManager = managerList.get(managerList.size() - 1);

        // Validate the Manager in Elasticsearch
        verify(mockManagerSearchRepository, times(1)).save(testManager);
    }

    @Test
    @Transactional
    public void createManagerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = managerRepository.findAll().size();

        // Create the Manager with an existing ID
        manager.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restManagerMockMvc.perform(post("/api/managers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manager)))
            .andExpect(status().isBadRequest());

        // Validate the Manager in the database
        List<Manager> managerList = managerRepository.findAll();
        assertThat(managerList).hasSize(databaseSizeBeforeCreate);

        // Validate the Manager in Elasticsearch
        verify(mockManagerSearchRepository, times(0)).save(manager);
    }

    @Test
    @Transactional
    public void getAllManagers() throws Exception {
        // Initialize the database
        managerRepository.saveAndFlush(manager);

        // Get all the managerList
        restManagerMockMvc.perform(get("/api/managers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(manager.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getManager() throws Exception {
        // Initialize the database
        managerRepository.saveAndFlush(manager);

        // Get the manager
        restManagerMockMvc.perform(get("/api/managers/{id}", manager.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(manager.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingManager() throws Exception {
        // Get the manager
        restManagerMockMvc.perform(get("/api/managers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateManager() throws Exception {
        // Initialize the database
        managerRepository.saveAndFlush(manager);

        int databaseSizeBeforeUpdate = managerRepository.findAll().size();

        // Update the manager
        Manager updatedManager = managerRepository.findById(manager.getId()).get();
        // Disconnect from session so that the updates on updatedManager are not directly saved in db
        em.detach(updatedManager);

        restManagerMockMvc.perform(put("/api/managers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedManager)))
            .andExpect(status().isOk());

        // Validate the Manager in the database
        List<Manager> managerList = managerRepository.findAll();
        assertThat(managerList).hasSize(databaseSizeBeforeUpdate);
        Manager testManager = managerList.get(managerList.size() - 1);

        // Validate the Manager in Elasticsearch
        verify(mockManagerSearchRepository, times(1)).save(testManager);
    }

    @Test
    @Transactional
    public void updateNonExistingManager() throws Exception {
        int databaseSizeBeforeUpdate = managerRepository.findAll().size();

        // Create the Manager

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restManagerMockMvc.perform(put("/api/managers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manager)))
            .andExpect(status().isBadRequest());

        // Validate the Manager in the database
        List<Manager> managerList = managerRepository.findAll();
        assertThat(managerList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Manager in Elasticsearch
        verify(mockManagerSearchRepository, times(0)).save(manager);
    }

    @Test
    @Transactional
    public void deleteManager() throws Exception {
        // Initialize the database
        managerRepository.saveAndFlush(manager);

        int databaseSizeBeforeDelete = managerRepository.findAll().size();

        // Get the manager
        restManagerMockMvc.perform(delete("/api/managers/{id}", manager.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Manager> managerList = managerRepository.findAll();
        assertThat(managerList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Manager in Elasticsearch
        verify(mockManagerSearchRepository, times(1)).deleteById(manager.getId());
    }

    @Test
    @Transactional
    public void searchManager() throws Exception {
        // Initialize the database
        managerRepository.saveAndFlush(manager);
        when(mockManagerSearchRepository.search(queryStringQuery("id:" + manager.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(manager), PageRequest.of(0, 1), 1));
        // Search the manager
        restManagerMockMvc.perform(get("/api/_search/managers?query=id:" + manager.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(manager.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Manager.class);
        Manager manager1 = new Manager();
        manager1.setId(1L);
        Manager manager2 = new Manager();
        manager2.setId(manager1.getId());
        assertThat(manager1).isEqualTo(manager2);
        manager2.setId(2L);
        assertThat(manager1).isNotEqualTo(manager2);
        manager1.setId(null);
        assertThat(manager1).isNotEqualTo(manager2);
    }
}
