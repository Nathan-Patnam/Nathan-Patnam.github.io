// Preloader

  $(window).load(function(){
        $('.loader').fadeOut();    
        $('#preloader').delay(350).fadeOut('slow');    
        $('body').delay(350);   

    });

// Global document ready function

jQuery(document).ready(function($) {
     // "use strict";
    //check if background-images have been loaded and show single pages
    $('.single-page').bgLoaded({
        afterLoaded: function() {
            showCaption($('.page-container .single-page').eq(0));
        }
    });

    //open page
    $('.single-page').on('click', function() {
        var selectedProject = $(this),
            toggle = !selectedProject.hasClass('is-full-width');
        if (toggle) toggleProject($(this), $('.page-container'), toggle);

    });

    //close page
    $('.page-container .page-close').on('click', function() {
        toggleProject($('.is-full-width'), $('.page-container'), false);

    });

    //scroll to page info
    $('.page-container .page-scroll').on('click', function() {
        $('.page-container').animate({
            'scrollTop': $(window).height()
        }, 500);
    });

    //update title and .page-scroll opacity while scrolling
    $('.page-container').on('scroll', function() {
        window.requestAnimationFrame(changeOpacity);
    });

    function toggleProject(project, container, bool) {
        if (bool) {
            //expand page
            container.addClass('project-is-open');
            project.addClass('is-full-width').siblings('.single-page').removeClass('is-loaded');
        } else {
            //check media query
            var mq = window.getComputedStyle(document.querySelector('.page-container'), '::before').getPropertyValue('content'),
                delay = (mq == 'mobile') ? 100 : 0;

            container.removeClass('project-is-open');
            //fade out page
            project.animate({
                opacity: 0
            }, 800, function() {
                project.removeClass('is-loaded');
                $('.page-container').find('.page-scroll').attr('style', '');
                setTimeout(function() {
                    project.attr('style', '').removeClass('is-full-width').find('.page-title').attr('style', '');
                }, delay);
                setTimeout(function() {
                    showCaption($('.page-container .single-page').eq(0));
                }, 300);
            });
        }
    }

    function changeOpacity() {
        var newOpacity = 1 - ($('.page-container').scrollTop()) / 300;
        $('.page-container .page-scroll').css('opacity', newOpacity);
        $('.is-full-width .page-title').css('opacity', newOpacity);
    }

    function showCaption(project) {
        if (project.length > 0) {
            setTimeout(function() {
                project.addClass('is-loaded');
                showCaption(project.next());
            }, 150);
        }
    }

    // Magnific Popup

    $('.open-portfolio').magnificPopup({
        type: 'inline',
        midClick: true,
        zoom: {
            enabled: true,
            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out' // CSS transition easing function 
        }
    });


    // Mixitup Filter

    $(function notStrict() {
        // Instantiate MixItUp:
        $('#portfolio').mixItUp();
    });


    // Testimonial Slider

    $("#testimonial-slides").owlCarousel({
        items: 1
    });

    // Skills Chart

    var options = {
        //segmentShowStroke: false,
        percentageInnerCutout: 70,
        //animation: true,
        animationEasing: 'easeOutQuint',
        //animateRotate: false,
        animateScale: true
    };
    var data = {
        html_css: [{
            value: 100,
            color: "#3b5998"
        }, {
            value: 0,
            color: "#f7f7f7"
        }],
        javascript_jquery: [{
            value: 90,
            color: "#3b5998"
        }, {
            value: 10,
            color: "#f7f7f7"
        }],
        php_mysql: [{
            value: 60,
            color: "#3b5998"
        }, {
            value: 40,
            color: "#f7f7f7"
        }],
        python: [{
            value: 80,
            color: "#3b5998"
        }, {
            value: 20,
            color: "#f7f7f7"
        }],
        java: [{
            value: 70,
            color: "#3b5998"
        }, {
            value: 30,
            color: "#f7f7f7"
        }],
        django_flask: [{
            value: 50,
            color: "#3b5998"
        }, {
            value: 50,
            color: "#f7f7f7"
        }]
    };

    var offset = 0;
    $.each(data, function(key, data) {
        var canvas = document.querySelector('#' + key);
        if (canvas) {
            offset += 250;
            setTimeout(function() {
                var ctx = canvas.getContext('2d');
                var chart = new Chart(ctx);
                chart.Doughnut(data, options);
            }, offset);
        }
    });



    // API call for medium articles https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40nathanpatnam

    getMediumArticles()




});

function getMediumArticles(){
    //need to make website https to be able to do this
    // var content = document.getElementById('content');
    //
    // var xhr = new XMLHttpRequest();
    //
    // xhr.onreadystatechange = function(){
    //     if (xhr.readyState===4 && xhr.status===200)
    //     {
    //         var data = JSON.parse(xhr.responseText);
    //         var itemsContainer = document.createElement('DIV');
    //
    //         if(data.status === 'ok'){
    //
    //
    //             for( var i=0,t = data.items.length ; i < t ; ++i ){
    //                 console.log(data);
    //                 var item = data.items[i];
    //                 var itemContainer = document.createElement('DIV');
    //
    //                 var itemTitleElement = document.createElement('H2');
    //                 var itemLinkElement = document.createElement('A');
    //                 var itemDescriptionElement = document.createElement('P');
    //
    //
    //                 itemLinkElement.setAttribute('href' , item.link);
    //                 itemLinkElement.innerText = item.title;
    //                 itemTitleElement.appendChild(itemLinkElement);
    //
    //                 // note : make sure the content is XSS safe before using innerHTML
    //                 itemDescriptionElement.innerHTML = item.description;
    //
    //                 itemContainer.appendChild(itemTitleElement);
    //                 itemContainer.appendChild(itemDescriptionElement);
    //
    //                 itemsContainer.appendChild(itemContainer);
    //
    //             }
    //
    //
    //
    //             var titleElement = document.createElement('H1');
    //             titleElement.innerText = data.feed.title;
    //
    //             content.appendChild(titleElement);
    //             content.appendChild(itemsContainer);
    //
    //
    //         }
    //     }
    // };
    // xhr.open(
    //     'GET',
    //     'https://rss2json.com/#rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40nathanpatnam',
    //     true
    // );
    // xhr.send();
}

/*
 * BG Loaded
 * Copyright (c) 2014 Jonathan Catmull
 * Licensed under the MIT license.
 */
(function($) {
    $.fn.bgLoaded = function(custom) {
        var self = this;

        // Default plugin settings
        var defaults = {
            afterLoaded: function() {
                this.addClass('bg-loaded');
            }
        };

        // Merge default and user settings
        var settings = $.extend({}, defaults, custom);

        // Loop through element
        self.each(function() {
            var $this = $(this),
                bgImgs = window.getComputedStyle($this.get(0), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "").split(', ');
            $this.data('loaded-count', 0);
            $.each(bgImgs, function(key, value) {
                var img = value.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                $('<img/>').attr('src', img).load(function() {
                    $(this).remove(); // prevent memory leaks
                    $this.data('loaded-count', $this.data('loaded-count') + 1);
                    if ($this.data('loaded-count') >= bgImgs.length) {
                        settings.afterLoaded.call($this);
                    }
                });
            });

        });
    };
})(jQuery);



