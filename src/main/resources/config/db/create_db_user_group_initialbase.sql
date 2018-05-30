-- Database: contracts
CREATE ROLE contracts_group
    NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE;
CREATE ROLE contractsappuser LOGIN
    PASSWORD 'contractsappuser'
    NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE;
GRANT contracts_group TO contractsappuser;
CREATE DATABASE contracts
    WITH OWNER = contracts_group
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;
GRANT ALL ON DATABASE contracts TO contracts_group;
