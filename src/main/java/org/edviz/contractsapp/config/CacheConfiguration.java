package org.edviz.contractsapp.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(org.edviz.contractsapp.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.domain.Country.class.getName(), jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.domain.Country.class.getName() + ".cities", jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.domain.City.class.getName(), jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.domain.City.class.getName() + ".locations", jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.domain.Location.class.getName(), jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.domain.Location.class.getName() + ".departments", jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.domain.Department.class.getName(), jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.domain.Department.class.getName() + ".employees", jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.domain.Department.class.getName() + ".managers", jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.domain.Job.class.getName(), jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.domain.Job.class.getName() + ".employees", jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.domain.Employee.class.getName(), jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.domain.Employee.class.getName() + ".managers", jcacheConfiguration);
            cm.createCache(org.edviz.contractsapp.domain.Manager.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
