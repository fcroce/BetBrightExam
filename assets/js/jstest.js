var flickrObj = new (function() {
    var self = this;

    var max_items = 5;

    var current_search = null;
    var search_results = null;

    var el = null;

    self.setSearchUIElements = function(search_output, results_output) {
        current_search = search_output;
        search_results = results_output;
    };

    self.searchImages = function(e, element) {
        e.preventDefault();

        el = element;

        var search = encodeURIComponent(element.getAttribute("search").trim());

        if (search.length) {
            // Reset previous search
            search_results.innerHTML = 'Loading ...';

            // Start a new search
            current_search.innerHTML = search;
            self.loadFromFlickr(search, 5);
        }
    };

    self.flickResponse = function(json) {
        // Clear the result area
        search_results.innerHTML = '';

        if (typeof json.items == 'undefined') {
            search_results.innerHTML = 'No items found.';
            return;
        }

        for(var i=0 ; i<json.items.length; i++) {
            var title = (typeof json.items[i].title != 'undefined') ? this.decodeFromUnicode(json.items[i].title) : '';
            var author = (typeof json.items[i].author != 'undefined') ? this.decodeFromUnicode(json.items[i].author) : '';
            var published = (typeof json.items[i].published != 'undefined') ? (new Date(Date.parse(json.items[i].published))).toDateString() : '';
            var link = (typeof json.items[i].link != 'undefined') ? json.items[i].link : '';

            var tags_list = (typeof json.items[i].tags != 'undefined') ? json.items[i].tags.split(" ") : [];

            var tags = '';
            for(var j=0 ; j<tags_list.length ; j++) {
                tags += '<li><a target="_blank" href="https://www.flickr.com/photos/tags/' + tags_list[j] + '" title="' + tags_list[j] + '">' + tags_list[j] + '</a></li>';
            }

            var media = '';
            if (typeof json.items[i].media != 'undefined') {
                if (typeof json.items[i].media.m != 'undefined') {
                    media = json.items[i].media.m;
                }
            }

            if (!media.length) {
                search_results.innerHTML = 'No items found.';
                return;
            }

            search_results.innerHTML +=
                '<div class="flickr_item radius-3">' +
                    '<h3 class="flickr_title">' + title + ' - By: ' + author + '</h3>' +

                    '<section class="flickr_image shadow_bottom radius-5">' +
                        '<a class="radius-5" target="_blank" href="' + link+ '" title="' + title+ '">' +
                            '<img class="radius-5" src="' + media + '" alt="' + title+ '" title="' + title+ '" />' +
                        '</a>' +

                        '<div class="flickr_date radius-5-bottom">' +
                            '<p>' + published + '</p>' +
                        '</div>' +
                    '</section>' +

                    '<div class="flickr_tags">' +
                        '<div>Tags:</div>' +
                        '<ul class="clearfix">' + tags + '</ul>' +
                    '</div>' +
                '</div>';

            // Max items
            if ( (i + 1) >= max_items ) return;
        }
    };

    this.loadFromFlickr = function(search, per_page) {
        var flickrURL = 'https://www.flickr.com/services/feeds/photos_public.gne?jsoncallback=flickrObj.flickResponse&format=json&per_page=' + per_page + '&tags=' + search;

        /*
         * Flickr solved their Cross Origin issues with JSONP which cannot be called via "XMLHttpRequest".
         * Also they changed their APIs from:
         *      https://api.flickr.com
         * To:
         *      https://www.flickr.com
         */
        var script = document.createElement('script');
        script.src = flickrURL;

        document.getElementsByTagName('head')[0].appendChild(script);

        /*
         * Cross Origin Issue here
         */
        // // Ajax CORS request
        // function createCORSRequest(method, url) {
        //     var xhr = new XMLHttpRequest();
        //
        //     if ("withCredentials" in xhr) {
        //         xhr.withCredentials = true;
        //         xhr.open(method, url, true);
        //     }
        //     else if (typeof XDomainRequest != "undefined") {
        //         xhr = new XDomainRequest();
        //         xhr.open(method, url);
        //     }
        //     else {
        //         xhr = null;
        //     }
        //
        //     return xhr;
        // }
        //
        // var xhr = createCORSRequest('GET', flickrURL);
        // if (!xhr) {
        //     throw new Error('CORS not supported');
        // }
        //
        // xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
        // xhr.setRequestHeader("Content-Type",'application/x-www-form-urlencoded');
        //
        // // Error
        // xhr.onerror = function() {
        //     if (xhr.status == 400) {
        //         search_results.innerHTML = 'There was an error 400, please check the console log.';
        //     }
        //     else {
        //         search_results.innerHTML = 'something else other than 200 was returned, please check the console log.';
        //     }
        //
        //     // Log error
        //     console.log("xhr.status: " + xhr.status);
        // };
        //
        // // Success
        // xhr.onload = function() {
        //     if (xhr.responseText.length) {
        //         search_results.innerHTML = xhr.responseText;
        //     }
        //     else {
        //         search_results.innerHTML = 'No results found.';
        //     }
        // };
        //
        // // Send
        // xhr.send();
    };

    this.decodeFromUnicode = function(string) {
        return decodeURIComponent(JSON.parse('"' + string.replace(/\"/g, '\\"') + '"'));
    };
}) ();


/**
 * Main
 */
var init = function() {
    var self = this;

    var current_search  = document.getElementById('current_search');
    var jstest_results  = document.getElementById('jstest_results');

    flickrObj.setSearchUIElements(current_search, jstest_results);

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

    custom.addEventListener( 'keydown', function(e) { if (e.keyCode === 13) self.sendCustomSearch(e); }, false);
    custom_send.addEventListener( 'click', function(e) { self.sendCustomSearch(e); }, false);
};

/**
 * Bootstrap
 */
window.addEventListener('DOMContentLoaded', init, false);