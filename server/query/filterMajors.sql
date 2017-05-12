-- Sample Queries to base our search off of.  Most of these queries are not in current project, yet

-- Base Single Selection Query to concat onto
SELECT s.uid, s.name, s.city, s.state, s.lat, s.lng, s.url, s.size, s.adm_rate, s.sat_avg
FROM schools s
-- add joins here
WHERE (
            `s.lat` BETWEEN "26.80093496676429" AND "37.671516816440754"
        ) AND (
            `s.lng` BETWEEN "-91.56519197656252" AND "-81.22461580468752"
        )
AND
-- add filters here
GROUP BY s.uid

-- Select all schools with Biology (1668)
SELECT s.uid, s.name, s.city, s.state, s.lat, s.lng, s.url, s.alias, s.size, s.demog_men, s.demog_women, s.adm_rate, s.sat_avg, s.ownership, s.tuition_in, s.tuition_out,
  p.external, pts.p_pct AS percent, pts.deg_2, pts.deg_4 FROM schools s
JOIN programs_to_schools pts ON s.uid=pts.uid
JOIN programs p ON p.pid=pts.pid
WHERE p.external="Biology and Biomedical"

-- All schools in range that have specified major (6)
SELECT s.uid, s.name, s.city, s.state, s.lat, s.lng, s.url, s.alias, s.size, s.demog_men, s.demog_women, s.adm_rate, s.sat_avg, s.ownership, s.tuition_in, s.tuition_out, p.external, pts.p_pct AS percent, pts.deg_2, pts.deg_4
FROM `schools` s
JOIN programs_to_schools pts ON s.uid=pts.uid
JOIN programs p ON p.pid=pts.pid
WHERE (
        `lat` BETWEEN 33.399046547994 AND 33.900899534253
      ) AND (
          `lng` BETWEEN -117.92599581465 AND -117.54834078535
      ) AND p.external="Engineering"

-- All schools in range, sorted by major p.pid (41349)
SELECT s.uid, s.name, s.city, s.state, s.lat, s.lng, s.url, s.alias, s.size, s.demog_men, s.demog_women, s.adm_rate, s.sat_avg, s.ownership, s.tuition_in, s.tuition_out, p.pid, p.external, pts.p_pct, pts.deg_2, pts.deg_4
FROM schools s
JOIN programs_to_schools pts ON s.uid=pts.uid
JOIN programs p ON pts.pid=p.pid
WHERE (s.lat BETWEEN "21.39621820157396" AND "78.15171077202175")
	AND (s.lng BETWEEN "-155.7538118632047" AND "-77.08501913769533")

-- All schools in range, sorted by s.uid (41349)
SELECT s.uid, s.name, s.city, s.state, s.lat, s.lng, s.url, s.alias, s.size, s.demog_men, s.demog_women, s.adm_rate, s.sat_avg, s.ownership, s.tuition_in, s.tuition_out, p.pid, p.external, pts.p_pct, pts.deg_2, pts.deg_4
FROM schools s
LEFT JOIN programs_to_schools pts ON s.uid=pts.uid
LEFT JOIN programs p ON pts.pid=p.pid
WHERE (s.lat BETWEEN "21.39621820157396" AND "78.15171077202175")
	AND (s.lng BETWEEN "-155.7538118632047" AND "-77.08501913769533")

-- All schools with the following majors (1000)
SELECT s.uid, s.name, s.city, s.state, s.lat, s.lng, s.url, s.alias, s.size, s.demog_men, s.demog_women, s.adm_rate, s.sat_avg, s.ownership, s.tuition_in, s.tuition_out, p.pid, p.external, pts.p_pct, pts.deg_2, pts.deg_4
FROM schools s
LEFT JOIN programs_to_schools pts ON s.uid=pts.uid
LEFT JOIN programs p ON pts.pid=p.pid
WHERE (s.lat BETWEEN "21.39621820157396" AND "78.15171077202175")
	AND (s.lng BETWEEN "-155.7538118632047" AND "-77.08501913769533")
    AND (p.external="Agriculture" OR p.external="Engineering")
    GROUP BY s.uid