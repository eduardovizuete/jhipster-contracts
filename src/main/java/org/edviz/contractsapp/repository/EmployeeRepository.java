package org.edviz.contractsapp.repository;

import org.edviz.contractsapp.domain.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Employee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Page<Employee> findByDocIdContainsIgnoreCase(String docId, Pageable pageable);
    Page<Employee> findByLastNameContainsIgnoreCase(String name, Pageable pageable);
}
