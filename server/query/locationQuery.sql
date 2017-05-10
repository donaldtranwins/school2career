-- Sample Queries
SELECT s.uid, s.name, s.city, s.state, s.lat, s.lng, s.url, s.alias, s.size, s.demog_men, s.demog_women, s.adm_rate, s.sat_avg, s.ownership, s.tuition_in, s.tuition_out FROM `schools` s JOIN programs_to_schools pts ON s.uid=pts.uid JOIN programs p ON pts.pid=p.pid WHERE (
                                  `lat` BETWEEN
                                      33.283746784191
                                      AND
                                      34.015376095692
                          ) AND (
                                  `lng` BETWEEN
                                      -118.18760775313
                                      AND
                                      -117.28672884688
                          ) AND p.external="Engineering" AND s.tuition_out<50000


SELECT * FROM `metadata` m
JOIN `query` q ON m.uid=q.uid
WHERE (`lat` BETWEEN 40.349552068772695 AND 41.07404452729765)
      AND (`lng` BETWEEN -74.48178663691408 AND -73.53009596308596);



SELECT * FROM `metadata`
WHERE (`lat` BETWEEN 40.349552068772695 AND 41.07404452729765)
      AND (`lng` BETWEEN -74.48178663691408 AND -73.53009596308596);




SELECT * FROM `metadata`
WHERE `lat` >= 40.349552068772695
      AND `lat` <= 41.07404452729765
      AND `lng` <= -73.53009596308596
      AND `lng` >= -74.48178663691408