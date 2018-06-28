package org.edviz.contractsapp.repository.search;

import org.edviz.contractsapp.domain.Manager;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Manager entity.
 */
public interface ManagerSearchRepository extends ElasticsearchRepository<Manager, Long> {
}
