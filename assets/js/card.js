/**
 * Class to flip an element given the ID
 *
 * @param cardId
 */
var cardClass = function(cardId) {
    var $this = this;

    cardId = cardId.trim();

    var card = document.getElementById(cardId);

    // Callback for a click event
    $this.flipCard = function(event) {
        event.preventDefault();

        $this.flip(card);
    };

    // Private method to calculate the angle or rotation
    this.flip = function(el) {
        // If the element doesn't have the "angle" attribute then it's added with value "0"
        if (el.getAttribute('angle') == null) el.setAttribute('angle', '0');

        // Calculate the new rotation angle
        var new_angle = parseInt(el.getAttribute('angle')) - 180;

        // Update element CSS
        el.style['-webkit-transform'] = 'rotateY( ' + new_angle + 'deg )';
        el.style['-moz-transform'] = 'rotateY( ' + new_angle + 'deg )';
        el.style['-o-transform'] = 'rotateY( ' + new_angle + 'deg )';
        el.style['transform']= 'rotateY( ' + new_angle + 'deg )';

        // Update element "angle" attribute for next rotation
        el.setAttribute('angle', new_angle.toString());
    };
};

/**
 * Main
 */
var init = function() {
    var cardId = 'card';

    var cardObj = new cardClass(cardId);

    document.getElementById('button_terms').addEventListener( 'click', function(e) { cardObj.flipCard(e) }, false);
    document.getElementById('button_back').addEventListener( 'click', function(e) { cardObj.flipCard(e) }, false);
};

/**
 * Bootstrap
 */
window.addEventListener('DOMContentLoaded', init, false);