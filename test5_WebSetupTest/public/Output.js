$(".details").hide();

$(".fluid.ui.button.myButton").on('click', function() { 
    $(this).parent().find('.details').slideToggle(400);
    $(this).find("i").toggleClass("fa-angle-double-down fa-angle-double-up");
});

