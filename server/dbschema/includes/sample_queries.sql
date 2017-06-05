-- ** Sample Queries to base our search off of **

-- *******************************************
-- ** Base All Schools Query to concat onto **
-- *******************************************
SELECT s.uid, s.name, s.city, s.state, s.lat, s.lng, s.url, s.size, s.adm_rate, s.sat_avg
FROM `schools` s
-- joins are dynamically added here
WHERE (
        `s.lat` BETWEEN
                  "26.80093496676429"
                  AND
                  "37.671516816440754"
      ) AND (
        `s.lng` BETWEEN
                  "-91.56519197656252"
                  AND
                  "-81.22461580468752"
      )
  AND
-- filters are dynamically added here
GROUP BY s.uid

-- Example: Select all schools with Biology (1668)
SELECT s.uid, s.name, s.city, s.state, s.lat, s.lng, s.url, s.alias, s.size, s.demog_men, s.demog_women, s.adm_rate, s.sat_avg, s.ownership, s.tuition_in, s.tuition_out,
  p.external, pts.p_pct AS percent, pts.deg_2, pts.deg_4
FROM schools s
JOIN programs p ON pts.pid=p.pid
JOIN programs_to_schools pts ON s.uid=pts.uid
WHERE (
        `s.lat` BETWEEN
                  "26.80093496676429"
                  AND
                  "37.671516816440754"
      ) AND (
        `s.lng` BETWEEN
                  "-91.56519197656252"
                  AND
                  "-81.22461580468752"
      )
  AND p.external="Biology/Biomedical"
GROUP BY s.uid

-- ***************************
-- ** Base One School Query **
-- ***************************
SELECT s.uid, s.name, s.city, s.state, s.lat, s.lng, s.url, s.alias, s.size, s.demog_men, s.demog_women, s.adm_rate, s.sat_avg, s.ownership, s.tuition_in, s.tuition_out
                          FROM schools s
                          WHERE s.uid=?
