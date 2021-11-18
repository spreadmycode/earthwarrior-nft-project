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


$(document).ready(function() {
  var $wallet = $('.wallet')
  var $mintArea = $('#mint-area').hide()

  $wallet.click(function(e) {
    e.preventDefault();

    // Connect wallet pop up

    // Then
    $mintArea.slideDown("slow");
  })
})