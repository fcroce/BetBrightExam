<?php

class nextDrawDate {

    private $current_date;

    // Wednesday and Saturday
    private $available_days = array(3, 6);

    // 8PM - 24H
    private $avaible_hour = 20;

    public function __construct($input_date) {
        // Set the current date from input
        $this->current_date = $input_date;

        // Check that the date is a valid DateTime, else use the current datetime
        if ((date('Y-m-d H:i:s', strtotime($this->current_date)) != $this->current_date)) {
            $this->current_date = date('Y-m-d H:i:s');
        }
    }

    public function getNextDate() {
        $skip_days = $this->getSkipDays();

        $oNextDate = new DateTime($this->current_date);
        $oNextDate->modify('+' . $skip_days . ' days');

        return $oNextDate->format('Y-m-d ' . $this->avaible_hour . ':00:00');
    }

    private function getSkipDays() {
        // Get the numeric week day from the date
        $dayofweek = date('w', strtotime($this->current_date));

        // Get the hour from the date
        $hour = date('H', strtotime($this->current_date));

        /*
         * Calculate how many days to skip
         */

        // Sunday
        if ($dayofweek > $this->available_days[1]) {
            $skip_days = 4;
        }

        // Saturday
        else if ($dayofweek == $this->available_days[1]) {
            // Check hour
            $skip_days = ($hour < $this->avaible_hour) ? 0 : 3;
        }

        // Higher then Wednesday
        else if ($dayofweek > $this->available_days[0]) {
            $skip_days = $this->available_days[1] - $dayofweek;
        }

        // Wednesday
        else if ($dayofweek == $this->available_days[0]) {
            // Check hour
            $skip_days = ($hour < $this->avaible_hour) ? 0 : $this->available_days[1] - $dayofweek;
        }

        // Lower than Wednesday
        else {
            $skip_days = $this->available_days[0] - $dayofweek;
        }

        return $skip_days;
    }

}