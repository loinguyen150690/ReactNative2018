// fixed-top-animated-menu.1.0.js

$(document).on('click', 'ul.scrollspy a', function (event) {
    "use strict";
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 117
    }, 500);
});
$(document).on('click', 'a.anchorlink', function (event) {
    "use strict";
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 117
    }, 500);
});
//changing color of menu elements when scrolling
$(function () {
    "use strict";
    $(window).bind('scroll', function () {
        $('.anchor').each(function () {
            var anchored = $(this).attr("id"),
            position = $(this).position().top - $(window).scrollTop(),
            targetOffset = $(this).offset().top - 50;

            if ($(window).scrollTop() > targetOffset) {
                $('ul.scrollspy').find('li').removeClass("active");
                $('ul.scrollspy').find(('*[data-anchor="' + anchored + '"]')).addClass("active");
            }
        });
    });
});


/***

<ul class="scrollspy">
<li class="active" data-anchor="about"><a href="#about">ABOUT</a></li>
<li data-anchor="portfolio"><a href="#portfolio">PORTFOLIO</a></li>
<li data-anchor="contact"><a href="#contact">CONTACT</a></li>
<li data-anchor="feedback"><a href="#feedback">FEEDBACK</a></li>
</ul>

<div class="anchor" id="about">
<!-- start slipsum code -->
<!-- end slipsum code -->
</div>
<div class="anchor" id="portfolio">
<h1>Portfolio</h1>
<!-- start slipsum code -->
<!-- end slipsum code -->
</div>

***/
