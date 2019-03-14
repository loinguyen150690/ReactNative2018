$('.gallery-home').owlCarousel({
    loop:true,
    margin:0,
    nav:true,
      navText: '',
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
$('.slide_sp_home').owlCarousel({
    loop:false,
    margin:0,
    nav:true,
    navText: '',
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:4
        }
    }
})

$(".chk_color_box .list-color li span").on('click', function () {
  var inner = $(this).closest('.chk_color_box');
    if (inner != undefined){
      var cl = $(this).data("cl");
      var image = $(this).data("img");
      $(inner).find(".txt-color").text(cl);
      $(inner).find(".img_box img").attr("src", image);
   }
})

$(".p-header .phone_contact .icon i ").addClass("tada animated infinite");
$(document).ready(function() {

});
