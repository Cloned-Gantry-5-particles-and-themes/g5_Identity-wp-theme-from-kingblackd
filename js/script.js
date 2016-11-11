// Preloader
$(window).load(function() {
    $("#intro-loader").delay(1000).fadeOut();
    $(".mask").delay(1000).fadeOut("slow");
});
$(document).ready(function() {
    // Elements Appear from top
    $('.item_top').each(function() {
        $(this).appear(function() {
            $(this).delay(200).animate({
                opacity: 1,
                top: "0px"
            }, 1000);
        });
    });
    // Elements Appear from bottom
    $('.item_bottom').each(function() {
        $(this).appear(function() {
            $(this).delay(200).animate({
                opacity: 1,
                bottom: "0px"
            }, 1000);
        });
    });
    // Elements Appear from left
    $('.item_left').each(function() {
        $(this).appear(function() {
            $(this).delay(200).animate({
                opacity: 1,
                left: "0px"
            }, 1000);
        });
    });
    // Elements Appear from right
    $('.item_right').each(function() {
        $(this).appear(function() {
            $(this).delay(200).animate({
                opacity: 1,
                right: "0px"
            }, 1000);
        });
    });
    // Elements Appear in fadeIn effect
    $('.item_fade_in').each(function() {
        $(this).appear(function() {
            $(this).delay(250).animate({
                opacity: 1,
                right: "0px"
            }, 1500);
        });
    });
    processLine.init();
    /*===================================================================================*/
    /*  PROFOLIO                                                                         */
    /*===================================================================================*/
    var portfolio = portfolio || {},
        $portfolioItems = $('#portfolio-items'),
        $filtrable = $('#portfolio-filter');
    /*===================================================================================*/
    /*  PROFOLIO INIT FULL WIDTH                                                         */
    /*===================================================================================*/
    portfolio.fullWidth = function() {
        $(window).load(function() {
            $portfolioItems.isotope({
                animationEngine: 'best-available',
                filter: '*',
                animationOptions: {
                    duration: 250,
                    easing: 'easeInOutSine',
                    queue: false
                }
            });
        });
        $filtrable.find('a').click(function(e) {
            var currentOption = $(this).data('cat');
            $filtrable.find('a').removeClass('active');
            $(this).addClass('active');
            if (currentOption !== '*') {
                currentOption = '.' + currentOption;
            }
            $portfolioItems.isotope({
                filter: currentOption
            });
            return false;
        });
    };

    portfolio.fullWidth();
    $(function() {
        $('.chart').appear(function() {
            $('.chart').easyPieChart({
                easing: 'easeOutBounce',
                barColor: "#474D5D",
                size: "150",
                lineWidth: 15,
                animate: 2000,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
        });
    });
    $('.skillBar li').each(function() {
        $(this).appear(function() {
            $(this).animate({
                opacity: 1,
                left: "0px"
            }, 2000);
            var b = $(this).find("span").attr("data-width");
            $(this).find("span").animate({
                width: b + "%"
            }, 2200, "easeOutBounce")
        })
    });
    // Contact Form Request
    $(".validate").validate();
    var form = $('#contactform');
    var submit = $('#contactForm_submit');
    var alertx = $('.form-respond');
    // form submit event
    $(document).on('submit', '#contactform', function(e) {
        e.preventDefault(); // prevent default form submit
        // sending ajax request through jQuery
        $.ajax({
            url: 'sendemail.php',
            type: 'POST',
            dataType: 'html',
            data: form.serialize(),
            beforeSend: function() {
                alertx.fadeOut();
                submit.html('Sending....'); // change submit button text
            },
            success: function(data) {
                form.fadeOut(300);
                alertx.html(data).fadeIn(1000); // fade in response data
                setTimeout(function() {
                    alertx.html(data).fadeOut(300);
                    $('#name, #email, #message').val('')
                    form.fadeIn(1800);
                }, 4000);
            },
            error: function(e) {
                console.log(e)
            }
        });
    });
    // Nav Bar
    jQuery(document).scroll(function() {
        var position = jQuery(document).scrollTop();
        var headerHeight = jQuery('#g-header').outerHeight();
        if (jQuery('#g-header').length > 0) {
            var headerTop = jQuery('#g-header').offset().top;
        }
        if (position >= headerHeight - 90) {
            jQuery('#g-navigation, .g-offcanvas-toggle').addClass('minified');
        } else {
            jQuery('#g-navigation, .g-offcanvas-toggle').removeClass('minified');
        }
        if (position > headerTop + 40) {
            jQuery('#g-navigation').addClass('darken');
        } else {
            jQuery('#g-navigation').removeClass('darken');
        }
        $('nav li').each(function() {
            var currentLink = $(this);
            var refElement = $(currentLink.find('a').attr("href"));
            if (refElement.position().top <= position &&
                refElement.position().top + refElement.height() > position) {
                $('nav li').removeClass("active");
                currentLink.addClass("active");
            } else {
                currentLink.find('a').removeClass("active");
            }
        });
    });

    //Back To Top
    $(window).scroll(function() {
        if ($(window).scrollTop() > 400) {
            $(".g-totop").fadeIn(200);
        } else {
            $(".g-totop").fadeOut(200);
        }
    });
});
//Navigation Scrolling
$(function() {
    $('.g-toplevel li a').click(function(event) {
        var el = $(this).attr('href');
        var $anchor = $(this);
        if (el == "#g-header") {
            $('html, body').stop().animate({
                scrollTop: $(el).offset().top
            }, 2000, 'easeInOutExpo');
            event.preventDefault();
        } else {
            $('html, body').stop().animate({
                scrollTop: $(el).offset().top + 1
            }, 2000, 'easeInOutExpo');
            event.preventDefault();
        }
    });
});
// Scroll nav Scrolling
$(function() {
    $('a.scroll').click(function(event) {
        var el = $(this).attr('href');
        $('html, body').stop().animate({
            scrollTop: $(el).offset().top + 1
        }, 2000, 'easeInOutExpo');
        event.preventDefault();
    });
});

/*-----------------------------------
Counter
-----------------------------------*/
$(function() {
    "use strict";
    $(".number-counters").appear(function() {
        $(".number-counters [data-to]").each(function() {
            var count = $(this).attr('data-to');
            $(this).delay(6000).countTo({
                from: 50,
                to: count,
                speed: 3000,
                refreshInterval: 50,
            });
        });
    });
});
// Process Bar
var processLine = {
    el: ".process-node",
    init: function() {
        processLine.bind();
    },
    bind: function() {
        $(window).scroll(function() {
            processLine.check();
        });
    },
    check: function() {
        $(processLine.el).each(function() {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 200) {
                $(this).closest("li").addClass("active").find(".line").addClass("active");
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
                $(this).closest("li").removeClass("active").find(".line").removeClass("active");
            }
        });
    }
}
