package org.edviz.contractsapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.edviz.contractsapp.domain.Manager;
import org.edviz.contractsapp.repository.ManagerRepository;
import org.edviz.contractsapp.repository.search.ManagerSearchRepository;
import org.edviz.contractsapp.web.rest.errors.BadRequestAlertException;
import org.edviz.contractsapp.web.rest.util.HeaderUtil;
import org.edviz.contractsapp.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Manager.
 */
@RestController
@RequestMapping("/api")
public class ManagerResource {

    private final Logger log = LoggerFactory.getLogger(ManagerResource.class);

    private static final String ENTITY_NAME = "manager";

    private final ManagerRepository managerRepository;

    private final ManagerSearchRepository managerSearchRepository;

    public ManagerResource(ManagerRepository managerRepository, ManagerSearchRepository managerSearchRepository) {
        this.managerRepository = managerRepository;
        this.managerSearchRepository = managerSearchRepository;
    }

    /**
     * POST  /managers : Create a new manager.
     *
     * @param manager the manager to create
     * @return the ResponseEntity with status 201 (Created) and with body the new manager, or with status 400 (Bad Request) if the manager has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/managers")
    @Timed
    public ResponseEntity<Manager> createManager(@Valid @RequestBody Manager manager) throws URISyntaxException {
        log.debug("REST request to save Manager : {}", manager);
        if (manager.getId() != null) {
            throw new BadRequestAlertException("A new manager cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Manager result = managerRepository.save(manager);
        managerSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/managers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /managers : Updates an existing manager.
     *
     * @param manager the manager to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated manager,
     * or with status 400 (Bad Request) if the manager is not valid,
     * or with status 500 (Internal Server Error) if the manager couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/managers")
    @Timed
    public ResponseEntity<Manager> updateManager(@Valid @RequestBody Manager manager) throws URISyntaxException {
        log.debug("REST request to update Manager : {}", manager);
        if (manager.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Manager result = managerRepository.save(manager);
        managerSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, manager.getId().toString()))
            .body(result);
    }

    /**
     * GET  /managers : get all the managers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of managers in body
     */
    @GetMapping("/managers")
    @Timed
    public ResponseEntity<List<Manager>> getAllManagers(Pageable pageable) {
        log.debug("REST request to get a page of Managers");
        Page<Manager> page = managerRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/managers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /managers/:id : get the "id" manager.
     *
     * @param id the id of the manager to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the manager, or with status 404 (Not Found)
     */
    @GetMapping("/managers/{id}")
    @Timed
    public ResponseEntity<Manager> getManager(@PathVariable Long id) {
        log.debug("REST request to get Manager : {}", id);
        Optional<Manager> manager = managerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(manager);
    }

    /**
     * DELETE  /managers/:id : delete the "id" manager.
     *
     * @param id the id of the manager to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/managers/{id}")
    @Timed
    public ResponseEntity<Void> deleteManager(@PathVariable Long id) {
        log.debug("REST request to delete Manager : {}", id);

        managerRepository.deleteById(id);
        managerSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/managers?query=:query : search for the manager corresponding
     * to the query.
     *
     * @param query the query of the manager search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/managers")
    @Timed
    public ResponseEntity<List<Manager>> searchManagers(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Managers for query {}", query);
        Page<Manager> page = managerSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/managers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
