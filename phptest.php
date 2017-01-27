<?php
date_default_timezone_set('UTC');

$next_date = '';

class nextDrawDate {

    private $current_date;

    // Wednesday and Saturday
    private $available_days = array(3, 6);

    // 8PM - 24H
    private $avaible_hour = 20;

    public function __construct($input_date) {
        $this->current_date = $_POST['input_date'] ? htmlspecialchars($_POST['input_date'], ENT_QUOTES, 'UTF-8') : date('Y-m-d H:i:s');
    }

    public function getNextDate() {
        $skip_days = $this->getSkipDays();

        $oNextDate = new DateTime($this->current_date);
        $oNextDate->modify('+' . $skip_days . ' days');

        return $oNextDate->format('Y-m-d H:i:s');
    }

    private function getSkipDays() {
        $dayofweek = date('w', strtotime($this->current_date));
        $date = date_parse($this->current_date);

        $skip_days = 0;

        // Sunday
        if ($dayofweek > $this->available_days[1]) {
            $skip_days = 4;
        }

        // Saturday - Check hour
        else if ($dayofweek == $this->available_days[1]) {
            ($date['hour'] < $this->avaible_hour) ? $skip_days = 0 : $skip_days = 3;
        }

        // Higher then Wednesday
        else if ($dayofweek > $this->available_days[0]) {
            $skip_days = $this->available_days[1] - $dayofweek;
        }

        // Wednesday - Check hour
        else if ($dayofweek == $this->available_days[0]) {
            ($date['hour'] < $this->avaible_hour) ? $skip_days = 0 : $skip_days = $this->available_days[1] - $dayofweek;
        }

        // Lower than Wednesday
        else {
            $skip_days = $this->available_days[0] - $dayofweek;
        }

        return $skip_days;
    }

}

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