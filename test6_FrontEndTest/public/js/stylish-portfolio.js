(function($) {
  "use strict"; // Start of use strict

  $("#2").hide();
  $("#3").hide();
  $("#4").hide();
  $("#5").hide();
  $("#6").hide();
  $("#selected").hide();
  $("label").css({
    fontSize: 20
});
  // $(".messages").hide();

// $("input[type='text']").on( "mouseenter", function(){
//   $(".messages").show();
// } );

// $("input[type='text']").on( "mouseout", function(){
//   $(".messages").hide();
// } );

$("#add").click(function(event){
  if($(".dropdown:visible").val() == ""){
    alert("Please Select Subject Area");
    return;
  }
  if($(".search:visible").find("input[type='text']").val() == ""){
    alert("Please Input Class ID");
    return;
  }
    var Text;
    $("#selected").slideDown();
    if($(".search:visible").attr("id")=="1"){
      Text = $(".dropdown:visible").val() + " " +$(".search:visible").find("input[type='text']").val();
      $("#clasList").append("<li class='one list'><span class='delete'><i class='fa fa-trash'></i></span> " + Text + "</li>");
      $("#1").hide();
      $("#2").show();
    }else if($(".search:visible").attr("id")=="2"){
      Text = $(".dropdown:visible").val() + " " +$(".search:visible").find("input[type='text']").val();
      $("#clasList").append("<li class='two list'><span class='delete'><i class='fa fa-trash'></i></span> " + Text + "</li>");
      $("#2").hide();
      $("#3").show();
    }else if($(".search:visible").attr("id")=="3"){
      Text = $(".dropdown:visible").val() + " " +$(".search:visible").find("input[type='text']").val();
      $("#clasList").append("<li class='three list'><span class='delete'><i class='fa fa-trash'></i></span>  " + Text + "</li>");
      $("#3").hide();
      $("#4").show();
    }else if($(".search:visible").attr("id")=="4"){
      Text = $(".dropdown:visible").val() + " " +$(".search:visible").find("input[type='text']").val();
      $("#clasList").append("<li class='four list'><span class='delete'><i class='fa fa-trash'></i></span>  " + Text + "</li>");
      $("#4").hide();
      $("#5").show();
    }else if($(".search:visible").attr("id")=="5"){
      Text = $(".dropdown:visible").val() + " " +$(".search:visible").find("input[type='text']").val();
      $("#clasList").append("<li class='five list'><span class='delete'><i class='fa fa-trash'></i></span> " + Text + "</li>");
      $("#5").hide();
      $("#6").show();
    }else if($(".search:visible").attr("id")=="6"){
      Text = $(".dropdown:visible").val() +" " + $(".search:visible").find("input[type='text']").val();
      $("#clasList").append("<li class='six list'><span class='delete'><i class='fa fa-trash'></i></span> " + Text + "</li>");
      $("#6").hide();
      $("#1").show();
    }
if($('#clasList>li').length == 6){
        $("#add").hide();
    }
});

$("#clasList").on("click", ".delete", function(event){
  if($(this).parent().attr("class") == "one list"){
      $(".search:visible").hide();
      $("#1").show();
  }else if($(this).parent().attr("class") == "two list"){
      $(".search:visible").hide();  
      $("#2").show();
  }else if($(this).parent().attr("class") == "three list"){
      $(".search:visible").hide(); 
      $("#3").show();
  }else if($(this).parent().attr("class") == "four list"){
      $(".search:visible").hide(); 
      $("#4").show();
  }else if($(this).parent().attr("class") == "five list"){
      $(".search:visible").hide(); 
      $("#5").show();
  }else if($(this).parent().attr("class") == "six list"){
      $(".search:visible").hide(); 
      $("#6").show();
  }

  $(this).parent().fadeOut(300,function(){
    $(this).remove();
  });
  
  console.log($('#clasList>li').length);
  if($('#clasList>li').length == 1){
      $("#selected").slideUp();
  }
  if($('#clasList>li').length == 6){
      $("#add").show();
  }
  event.stopPropagation();
});



  // Closes the sidebar menu
  $("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
  });



  // Opens the sidebar menu
  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $("#sidebar-wrapper").removeClass("active");
  });

  //#to-top button appears after scrolling
  var fixed = false;
  $(document).scroll(function() {
    if ($(this).scrollTop() > 250) {
      if (!fixed) {
        fixed = true;
        $('#to-top').show("slow", function() {
          $('#to-top').css({
            position: 'fixed',
            display: 'block'
          });
        });
      }
    } else {
      if (fixed) {
        fixed = false;
        $('#to-top').hide("slow", function() {
          $('#to-top').css({
            display: 'none'
          });
        });
      }
    }
  });

})(jQuery); // End of use strict