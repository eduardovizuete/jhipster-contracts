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

----------------------------------------------------------------------

-- Table: public.department

-- DROP TABLE public.department;

CREATE TABLE public.department
(
    id bigint NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    location_id bigint NOT NULL,
    CONSTRAINT pk_department PRIMARY KEY (id),
    CONSTRAINT ux_department_name UNIQUE (name),
    CONSTRAINT fk_department_location_id FOREIGN KEY (location_id)
        REFERENCES public.location (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.department
    OWNER to contractsappuser;

-- Index: idx_department_name

-- DROP INDEX public.idx_department_name;

CREATE UNIQUE INDEX idx_department_name
    ON public.department USING btree
    (name COLLATE pg_catalog."default")
    TABLESPACE pg_default;

-- Index: idx_department_name_location_id

-- DROP INDEX public.idx_department_name_location_id;

CREATE UNIQUE INDEX idx_department_name_location_id
    ON public.department USING btree
    (name COLLATE pg_catalog."default", location_id)
    TABLESPACE pg_default;

----------------------------------------------------------------------

-- Table: public.job

-- DROP TABLE public.job;

CREATE TABLE public.job
(
    id bigint NOT NULL,
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    min_salary bigint NOT NULL,
    max_salary bigint NOT NULL,
    CONSTRAINT pk_job PRIMARY KEY (id),
    CONSTRAINT ux_job_name UNIQUE (title)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.job
    OWNER to contractsappuser;

-- Index: idx_job_name

-- DROP INDEX public.idx_job_name;

CREATE UNIQUE INDEX idx_job_name
    ON public.job USING btree
    (title COLLATE pg_catalog."default")
    TABLESPACE pg_default;

----------------------------------------------------------------------

-- Table: public.employee

-- DROP TABLE public.employee;

CREATE TABLE public.employee
(
    id bigint NOT NULL,
    doc_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(255) COLLATE pg_catalog."default",
    hire_date date NOT NULL,
    salary bigint NOT NULL,
    job_id bigint NOT NULL,
    department_id bigint NOT NULL,
    CONSTRAINT pk_employee PRIMARY KEY (id),
    CONSTRAINT ux_employee_doc_id UNIQUE (doc_id),
    CONSTRAINT ux_employee_email UNIQUE (email),
    CONSTRAINT fk_employee_department_id FOREIGN KEY (department_id)
        REFERENCES public.department (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_employee_job_id FOREIGN KEY (job_id)
        REFERENCES public.job (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.employee
    OWNER to contractsappuser;

-- Index: idx_employee_doc_id

-- DROP INDEX public.idx_employee_doc_id;

CREATE UNIQUE INDEX idx_employee_doc_id
    ON public.employee USING btree
    (doc_id COLLATE pg_catalog."default")
    TABLESPACE pg_default;

-- Index: idx_employee_email

-- DROP INDEX public.idx_employee_email;

CREATE UNIQUE INDEX idx_employee_email
    ON public.employee USING btree
    (email COLLATE pg_catalog."default")
    TABLESPACE pg_default;

-- Index: idx_employee_first_last_name

-- DROP INDEX public.idx_employee_first_last_name;

CREATE UNIQUE INDEX idx_employee_first_last_name
    ON public.employee USING btree
    (first_name COLLATE pg_catalog."default", last_name COLLATE pg_catalog."default")
    TABLESPACE pg_default;

----------------------------------------------------------------------

-- Table: public.manager

-- DROP TABLE public.manager;

CREATE TABLE public.manager
(
    id bigint NOT NULL,
    department_id bigint NOT NULL,
    employee_id bigint NOT NULL,
    CONSTRAINT pk_manager PRIMARY KEY (id),
    CONSTRAINT fk_manager_department_id FOREIGN KEY (department_id)
        REFERENCES public.department (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_manager_employee_id FOREIGN KEY (employee_id)
        REFERENCES public.employee (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.manager
    OWNER to contractsappuser;

-- Index: idx_manager_department_id_employee_id

-- DROP INDEX public.idx_manager_department_id_employee_id;

CREATE UNIQUE INDEX idx_manager_department_id_employee_id
    ON public.manager USING btree
    (department_id, employee_id)
    TABLESPACE pg_default;
