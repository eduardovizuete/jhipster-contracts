package org.edviz.contractsapp.repository;

import org.edviz.contractsapp.domain.Manager;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Manager entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ManagerRepository extends JpaRepository<Manager, Long> {

}
