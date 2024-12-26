-- Type: STATUS

-- DROP TYPE IF EXISTS public."STATUS";

CREATE TYPE public."STATUS" AS ENUM
    ('TODO', 'ONGOING', 'COMPLETED');

ALTER TYPE public."STATUS"
    OWNER TO chronosflow;
