var flickrClass = function(search_output, results_output) {
    var $this = this;

    var current_search = search_output;
    var search_results = results_output;

    var el = null;
    var search = '';

    $this.searchImages = function(e, element) {
        e.preventDefault();

        el = element;

        search = encodeURIComponent(element.getAttribute("search").trim());

        if (search.length) {
            current_search.innerHTML = search;

            this.loadXMLDoc();
        }
    };

    this.loadXMLDoc = function() {
        var flickrURL = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=' + search;

        // Ajax CORS request
        function createCORSRequest(method, url) {
            var xhr = new XMLHttpRequest();

            if ("withCredentials" in xhr) {
                xhr.withCredentials = true;
                xhr.open(method, url, true);
            }
            else if (typeof XDomainRequest != "undefined") {
                xhr = new XDomainRequest();
                xhr.open(method, url);
            }
            else {
                xhr = null;
            }

            return xhr;
        }

        var xhr = createCORSRequest('GET', flickrURL);
        if (!xhr) {
            throw new Error('CORS not supported');
        }

        // xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');

        xhr.onerror = function() {
            if (xhr.status == 400) {
                search_results.innerHTML = 'There was an error 400, please check the console log.';
            }
            else {
                search_results.innerHTML = 'something else other than 200 was returned, please check the console log.';
            }

            // Log error
            console.log("xhr.status: " + xhr.status);
        };
        xhr.onload = function() {
            if (xhr.responseText.length) {
                search_results.innerHTML = xhr.responseText;
            }
            else {
                search_results.innerHTML = 'No results found.';
            }
        };

        xhr.send();
    };
};


/**
 * Main
 */
var init = function() {
    var $this = this;

    var current_search  = document.getElementById('current_search');
    var jstest_results  = document.getElementById('jstest_results');

    var flickrObj = new flickrClass(current_search, jstest_results);

    var cow             = document.getElementById('cow');
    var dog             = document.getElementById('dog');
    var giraffe         = document.getElementById('giraffe');

    var custom          = document.getElementById('custom');
    var custom_send     = document.getElementById('custom_send');

    cow.addEventListener( 'click', function(e) { flickrObj.searchImages(e, this) }, false);
    dog.addEventListener( 'click', function(e) { flickrObj.searchImages(e, this) }, false);
    giraffe.addEventListener( 'click', function(e) { flickrObj.searchImages(e, this) }, false);

    this.sendCustomSearch = function(e) {
        custom.setAttribute('search', custom.value.replace('"', '&#34;'));

        flickrObj.searchImages(e, custom);
    };

    custom.addEventListener( 'keydown', function(e) { if (e.keyCode === 13) $this.sendCustomSearch(e); }, false);
    custom_send.addEventListener( 'click', function(e) { $this.sendCustomSearch(e); }, false);
};

/**
 * Bootstrap
 */
window.addEventListener('DOMContentLoaded', init, false);