<?php

class nextDrawDate {

    private $current_date;

    // Wednesday and Saturday
    private $available_days = array(3, 6);

    // 8PM - 24H
    private $avaible_hour = 20;

    public function __construct($input_date) {
        $this->current_date = $_POST['input_date'] ? htmlspecialchars($_POST['input_date'], ENT_QUOTES, 'UTF-8') : date('Y-m-d H:i:s');

        // Check that the date is a valid DateTime, else use the current datetime
        if ((date('Y-m-d H:i:s', strtotime($this->current_date)) != $this->current_date)) {
            $this->current_date = date('Y-m-d H:i:s');
        }
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