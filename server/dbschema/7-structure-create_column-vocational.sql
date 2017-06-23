
-- Adds a new Vocational Column to the `schools` table using a populated `programs_to_schools` table
-- Simply run this after having all 3 tables (schools, programs, programs_to_schools) populated with data.

ALTER TABLE schools
ADD `vocational` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Boolean: School is Vocational'
AFTER `tuition_out`;

UPDATE schools s
JOIN programs_to_schools ps ON ps.uid=s.uid
SET s.vocational=0
WHERE ps.uid=s.uid;