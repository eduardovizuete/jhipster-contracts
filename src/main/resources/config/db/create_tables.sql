-- Table: public.country

-- DROP TABLE public.country;

CREATE TABLE public.country
(
    id bigint NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_country PRIMARY KEY (id),
    CONSTRAINT ux_country_name UNIQUE (name)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.country
    OWNER to contractsappuser;

-- Index: idx_country_name

-- DROP INDEX public.idx_country_name;

CREATE UNIQUE INDEX idx_country_name
    ON public.country USING btree
    (name COLLATE pg_catalog."default")
    TABLESPACE pg_default;

----------------------------------------------------------------------

-- Table: public.country

-- DROP TABLE public.country;

CREATE TABLE public.country
(
    id bigint NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_country PRIMARY KEY (id),
    CONSTRAINT ux_country_name UNIQUE (name)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.country
    OWNER to contractsappuser;

-- Index: idx_country_name

-- DROP INDEX public.idx_country_name;

CREATE UNIQUE INDEX idx_country_name
    ON public.country USING btree
    (name COLLATE pg_catalog."default")
    TABLESPACE pg_default;

----------------------------------------------------------------------

-- Table: public.location

-- DROP TABLE public.location;

CREATE TABLE public.location
(
    id bigint NOT NULL,
    street_address character varying(255) COLLATE pg_catalog."default" NOT NULL,
    state_province character varying(255) COLLATE pg_catalog."default" NOT NULL,
    postal_code character varying(255) COLLATE pg_catalog."default",
    city_id bigint NOT NULL,
    CONSTRAINT pk_location PRIMARY KEY (id),
    CONSTRAINT fk_location_city_id FOREIGN KEY (city_id)
        REFERENCES public.city (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.location
    OWNER to contractsappuser;
