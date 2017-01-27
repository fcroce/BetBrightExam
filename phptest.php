<?php
date_default_timezone_set('UTC');

if (!class_exists('nextDrawDate')) require_once 'libs/next_draw_date.php';

$next_date = '';

if (isset($_POST['get_next_draw']) && !empty($_POST['get_next_draw'])) {
    if ( (bool) $_POST['get_next_draw'] ) {
        $current_date = $_POST['input_date'] ? htmlspecialchars($_POST['input_date'], ENT_QUOTES, 'UTF-8') : date('Y-m-d H:i:s');

        $oNextDrawDate = new nextDrawDate($current_date);

        $next_date = $oNextDrawDate->getNextDate();
    }
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
        <input type="hidden" name="get_next_draw" value="1" />
        <input type="datetime" name="input_date" value="" />

        <button type="submit">Get next valid draw date</button>
    </form>

    <div>Next date: <?php echo $next_date; ?></div>

</div>

</body>
</html>