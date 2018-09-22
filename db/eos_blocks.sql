--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5 (Debian 10.5-1.pgdg90+1)
-- Dumped by pg_dump version 10.4

-- Started on 2018-09-21 23:34:38 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 196 (class 1259 OID 16385)
-- Name: eos_blocks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.eos_blocks (
    blockNum integer NOT NULL,
    hash text NOT NULL,
    actionCount integer NOT NULL
);


ALTER TABLE public.eos_blocks OWNER TO postgres;

--
-- TOC entry 2846 (class 0 OID 16385)
-- Dependencies: 196
-- Data for Name: eos_blocks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.eos_blocks (blockNum, hash, actionCount) FROM stdin;
\.


--
-- TOC entry 2724 (class 2606 OID 16392)
-- Name: eos_blocks eos_blocks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eos_blocks
    ADD CONSTRAINT eos_blocks_pkey PRIMARY KEY (blockNum);


-- Completed on 2018-09-21 23:34:38 EDT

--
-- PostgreSQL database dump complete
--

