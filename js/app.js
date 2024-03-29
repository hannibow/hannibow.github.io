jQuery(document).ready(function($) {

  "use strict";

  $(document).foundation();


  // if($('form#contact_form').length > 0) {
  //   $('form#contact_form').validate({
  //     messages: { },
  //     submitHandler: function(form) {
  //       $.ajax({
  //         type: 'POST',
  //         url: 'send.php',
  //         data: $(form).serialize(),
  //         success: function(data) {
  //           if(data.match(/success/)) {
  //             $(form).trigger('reset');
  //             $('#thanks').show().fadeOut(5000);
  //           }
  //         }
  //       });
  //       return false;
  //     }
  //   });
  // }

  $('#menu-toggler').on('click', function() {
    $('.top-bar-section').toggle();
    return false;
  });

  new WOW().init();


  var bars = $(".bars");

  for(var i = 0; i < bars.length; i++) {
    var bar = bars[i];
    var highlights = $('> li > .highlighted', $(bar));

    for ( var j = 0; j < highlights.length; j++ ) {

      var highlight = highlights[j];

      $(highlight).appear(function() {
        var percent = $(this).attr("data-percent");
        // $bar.html('<p class="highlighted"><span class="tip">'+percent+'%</span></p>');
        // http://stackoverflow.com/questions/3363035/jquery-animate-forces-style-overflowhidden
        $(this).animate({
          'width': percent + '%'
        }, 1700, function() { $(highlight).css('overflow', 'visible'); });
      });

    }
  }


  $(".milestone").appear(function() {
    $('.number', $(this)).countTo({
      speed: 1400
    });
  });


  var masonryGallery = function(sel) {

    var $ctx = $(sel);
    var items = $('.gallery li', $ctx);
    var gutter = $ctx.data('gutter');

    if ( !gutter ) { gutter = 0 };

    for( var i = 0; i < items.length; i++ ) {
      var item = items[i];
      $(item).data('masonry-id', i);
    }

    var msnry = new Masonry($('.gallery', $ctx)[0], { itemSelector: 'li', gutter: gutter, isInitLayout: false, columnWidth: ".gallery li:not(.wide)" });

    window.msnry = msnry;

    $('.gallery', $ctx).imagesLoaded( function() {
      msnry.layout();
    });

    $('.gallery-nav ul li a', $ctx).on('click', function() {

      // disable filter
      // if( $('.gallery-nav', $ctx).hasClass('disabled') ) return false;

      // $('.gallery-nav', $ctx).addClass('disabled');

      $('.gallery-nav ul li').removeClass('current');
      $(this).closest('li').addClass('current');

      var cat = $(this).attr('data-cat');

      var gallery = $('.gallery-nav').closest('.masonry-gallery').find('ul.gallery');

      if (cat === 'all') {
        var exists = $('.gallery li', $ctx);
        var elems = [];

        for( var i = 0; i < items.length; i++ ) {
          var item = items[i];
          var skip = false;

          for(var j = 0; j < exists.length; j++ ) {
            var exist = exists[j];
            if ($(item).data('masonry-id') == $(exist).data('masonry-id')) {
              skip = true;
            }
          }

          if (!skip) {
            ($('.gallery', $ctx)[0]).appendChild($(item)[0]);
            elems.push($(item)[0]);
          }
        }
        msnry.prepended(elems);

      } else {
        var lis = $('li', gallery);

        for(var i = 0; i < lis.length; i++) {
          var li = lis[i];

          if (!$(li).hasClass(cat)) {
            msnry.remove($(li));
          }
        }

        var exists = $('.gallery li', $ctx);
        var elems = [];

        for( var i = 0; i < items.length; i++) {
          var item = items[i];
          var skip = false;

          for( var j = 0; j < exists.length; j++) {
            var exist = exists[j];

            if ($(item).data('masonry-id') == $(exist).data('masonry-id')) {
              skip = true;
            }
          }


          if ( $(item).hasClass(cat) && !skip) {
            ($('.gallery', $ctx)[0]).appendChild($(item)[0]);
            elems.push($(item)[0]);
          }
        }

        msnry.appended(elems);

      }

      msnry.layout();


      // enable filter
      // setTimeout(function() {
      //   $('.gallery-nav', $ctx).removeClass('disabled');
      // }, 500);

      return false;

    });

  }

});