
-- Adds a new Vocational Column to the `schools` table using a populated `programs_to_schools` table

ALTER TABLE schools
ADD `vocational` TINYINT(1) UNSIGNED NOT NULL DEFAULT '1'
AFTER `tuition_out`;

UPDATE schools s
JOIN programs_to_schools ps ON ps.uid=s.uid
SET s.vocational=0
WHERE ps.uid=s.uid;