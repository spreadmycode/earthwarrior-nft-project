$(document).ready(function() {
  var $menuToggle = $('#menu-toggle')
  var $menuItems = $('#menu-items')

  $menuToggle.click(function() {
    $menuItems.toggle("slow")
  })

  if($( window ).width() < 768) {
    $menuItems.hide()
  } else {
    $menuItems.show()
  }

  $(window).resize(function() {
    if($( window ).width() < 768) {
      $menuItems.hide()
    } else {
      $menuItems.show()
    }
  })
})

const swiper = new Swiper('.swiperCards', {
  // Optional parameters
  direction: 'horizontal',
  effect: "cards",
  grabCursor: true,
  autoplay: {
    delay: 3000,
  },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    bulletActiveClass: "!bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-600 !opacity-100"
  },
});

const swiper2 = new Swiper(".mySwiper", {
  slidesPerView: 2,
  spaceBetween: 30,
  freeMode: true,
  loop: true,
  speed: 5000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  breakpoints: {
    426: {
        slidesPerView: 4,
        spaceBetweenSlides: 50
    },
    768: {
        slidesPerView: 5,
        spaceBetweenSlides: 50
    }
  }
});

$(document).ready(function() {
  $('.minus').click(function () {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $('.plus').click(function () {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });
});

$(document).ready(function() {
  var $inputEl = $('#mintInput') // Minting Input Element
  var $totalEl = $('#mintTotal') // Minting Total Element
  var $mintPrice = 2 // NFT Price IN ETH

  // On change updates total equation
  $inputEl.change(() => {
    var $total = parseInt($inputEl.val()) * $mintPrice
    $totalEl.html($total.toFixed(0))
  })
});

$(document).ready(function() {
  var $accordionButton = $('.accordion-header')
  var allAccordionBody = $('.accordion-body').hide()

  $accordionButton.click(function() {
    allAccordionBody.slideUp();
    $this = $(this);
    $target =  $this.next();

    if(!$target.hasClass('active')){
      allAccordionBody.removeClass('active').slideUp();
      $accordionButton.find('.accordion-icon > i').replaceWith('<i class="fas fa-chevron-down"></i>')
      $target.addClass('active').slideDown();
      $this.find('.accordion-icon > i').replaceWith('<i class="fas fa-chevron-up"></i>')
    } else {
      allAccordionBody.removeClass('active').slideUp();
      $this.find('.accordion-icon > i').replaceWith('<i class="fas fa-chevron-down"></i>')
    }
    
    return false;
  })
})

function handleTickInit(tick) {

  // uncomment to set labels to different language
  /*
  var locale = {
      YEAR_PLURAL: 'Jaren',
      YEAR_SINGULAR: 'Jaar',
      MONTH_PLURAL: 'Maanden',
      MONTH_SINGULAR: 'Maand',
      WEEK_PLURAL: 'Weken',
      WEEK_SINGULAR: 'Week',
      DAY_PLURAL: 'Dagen',
      DAY_SINGULAR: 'Dag',
      HOUR_PLURAL: 'Uren',
      HOUR_SINGULAR: 'Uur',
      MINUTE_PLURAL: 'Minuten',
      MINUTE_SINGULAR: 'Minuut',
      SECOND_PLURAL: 'Seconden',
      SECOND_SINGULAR: 'Seconde',
      MILLISECOND_PLURAL: 'Milliseconden',
      MILLISECOND_SINGULAR: 'Milliseconde'
  };

  for (var key in locale) {
      if (!locale.hasOwnProperty(key)) { continue; }
      tick.setConstant(key, locale[key]);
  }
  */

  // format of due date is ISO8601
  // https://en.wikipedia.org/wiki/ISO_8601

  // '2018-01-31T12:00:00'        to count down to the 31st of January 2018 at 12 o'clock
  // '2019'                       to count down to 2019
  // '2018-01-15T10:00:00+01:00'  to count down to the 15th of January 2018 at 10 o'clock in timezone GMT+1

  // create the countdown counter
  var counter = Tick.count.down('2021-11-08T22:00:00+05:00');

  counter.onupdate = function(value) {
    tick.value = value;
  };

  counter.onended = function() {
      // redirect, uncomment the next line
      // window.location = 'my-location.html'

      // hide counter, uncomment the next line
      tick.root.style.display = 'none';

      // show message, uncomment the next line
      document.querySelector('.tick-onended-message').style.display = '';
  };
}