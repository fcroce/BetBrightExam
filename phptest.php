<?php

$next_date = '';

if (isset($_POST['get_next_draw']) && !empty($_POST['get_next_draw'])) {
    print_r($_POST);
}

?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="user-scalable=yes,width=device-width,minimum-scale=1,initial-scale=1">
    <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge" /><![endif]-->

    <link href=assets/img/card/favicon.png rel="shortcut icon" />

    <title>BetBright Casino Bonus</title>
    <meta content="Ready to bet? Don't miss the BetBright Casino Bonus!">

    <link rel='stylesheet' href='assets/css/phptest.css' type='text/css' media='all' />
</head>

<body>
<div id="page_wrapper">

    <form method="POST">
        <button type="submit" value="get_next_draw">Get next valid draw date</button>
    </form>

    <div><?php echo $next_date; ?></div>

</div>

</body>
</html>