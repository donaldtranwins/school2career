<?php

// Sample Insert Statement
//INSERT INTO `schools_with_programs` (uid, pid, p_pct, deg_2, deg_4)
//SELECT `uid`, "1", `prog_agri`, `deg_agri_2`, `deg_agri_4` FROM `query`
//WHERE `prog_agri` > 0;

require_once ('includes/private/connect_to_dev.php');
$programs = [
    'agri','anthro','arch','biol_sci','bus_mktg_mgmt','comm','comm_tech','comp_sci','construction', 'culinary',
    'edu','engi','engi_tech','english','fam_cnsmr_sci','health','history','humanities','law_enf_secur','legal',
    'library_sci','linguistics','math','mechanic','military','multi','nat_resources','parks_rec','phil_religion','phys_sci',
    'precision_prod','psych','pub_adm_soc_serv','sci_tech','soc_sci','theology','transportation','vis_perf_arts'
];
// -- 38 programs
// 625, 593, 280, 1668, 3577, 1542, 645, 2946, 807, 2461,
// 2022, 895, 1667, 1574, 1070, 4245, 1365, 2038, 2221, 1034,
// 56, 1175, 1408, 1228, 18, 1345, 876, 1242, 986, 1343,
// 894, 1674, 1156, 196, 1558, 437, 403, 2337
// -- 51607 rows
$query = '';

for ($index = 0; $index < count($programs); $index++){
    $item = $index + 1;
    $query = "INSERT INTO `schools_with_programs` (uid, pid, p_pct, deg_2, deg_4)
SELECT `uid`, \"$item\", `prog_$programs[$index]`, `deg_$programs[$index]_2`, `deg_$programs[$index]_4` FROM `query` 
WHERE `prog_$programs[$index]` > 0;";
    echo "<br>".$query."<BR>";
    if(!mysqli_query($conn, $query)){
        printf("<br>Error: %s\n".mysqli_error($conn), mysqli_errno($conn));
    } else {
        print(mysqli_affected_rows($conn)." rows inserted for ".$programs[$index]);
    };
}


mysqli_close($conn);
?>