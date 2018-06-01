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

