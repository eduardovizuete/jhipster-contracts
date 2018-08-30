package org.edviz.contractsapp.repository;

import org.edviz.contractsapp.domain.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the City entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CityRepository extends JpaRepository<City, Long> {
    Page<City> findByNameContainsIgnoreCase(String name, Pageable pageable);
}
