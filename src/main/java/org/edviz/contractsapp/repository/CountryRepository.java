package org.edviz.contractsapp.repository;

import org.edviz.contractsapp.domain.Country;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Country entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
    Page<Country> findByNameContainsIgnoreCase (String name, Pageable pageable);
}
