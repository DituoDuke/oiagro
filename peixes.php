<?php 

    if (isset($_GET['peixe'])) {
        $peixe = $_GET['peixe'];
        $peixeEncoded = urlencode($peixe);
        header("Location: peixes.html?peixe=$peixeEncoded");
        exit;
    } else {
        echo 'Nome do peixe não foi fornecido.';
    }

?>