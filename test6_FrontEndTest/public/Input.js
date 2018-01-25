$('.ui.search.dropdown').dropdown();
$(".first").hide();
$(".second").hide();
$(".third").hide();
$(".selected").hide();
$("#submit").hide();
  
$("#add").click(function(event){
    var Text;
    $(".selected").show();
    if($(".grid>div:visible").attr("id") == "4"){
        Text = $(".grid>div:visible").find("input[type='text']").val();
        $("ul").append("<li class='4th'><span><i class='fa fa-trash'></i></span> " + Text + "</li>");
        $(".fourth").hide();
        $(".third").show();    
    }else if($(".grid>div:visible").attr("id") == "3"){
        Text = $(".grid>div:visible").find("input[type='text']").val();
        $("ul").append("<li class='3rd'><span><i class='fa fa-trash'></i></span> " + Text + "</li>");
        $(".third").hide();
        $(".second").show();    
    }else if($(".grid>div:visible").attr("id") == "2"){
        Text = $(".grid>div:visible").find("input[type='text']").val();
        $("ul").append("<li class='2nd'><span><i class='fa fa-trash'></i></span> " + Text + "</li>");
        $(".second").hide();
        $(".first").show();
    }else if($(".grid>div:visible").attr("id") == "1"){
        Text = $(".grid>div:visible").find("input[type='text']").val();
        $("ul").append("<li class='1st'><span><i class='fa fa-trash'></i></span> " + Text + "</li>");
        $(".first").hide();
        $(".fourth").show();
    }
    if($('li').length == 4){
        $("#add").hide();
        $("#submit").show();
    }
});

$("ul").on("click", "span", function(event){
	if($(this).parent().attr("class") == "4th"){
	    $(".grid>div:visible").hide();
	    $(".fourth").show();
	}else if($(this).parent().attr("class") == "3rd"){
	    $(".grid>div:visible").hide();  
	    $(".third").show();
	}else if($(this).parent().attr("class") == "2nd"){
	    $(".grid>div:visible").hide(); 
	    $(".second").show();
	}else if($(this).parent().attr("class") == "1st"){
	    $(".grid>div:visible").hide(); 
	    $(".first").show();
	}
	$(this).parent().fadeOut(300,function(){
		$(this).remove();
	});
	
	console.log($('li').length);
	if($("li").length == 1){
	    $(".selected").fadeOut(300);
	}
	if($('li').length == 4){
	    $("#add").show();
        $("#submit").hide();
	}
	event.stopPropagation();
});


$(function() {
    $("#changePageButton").click(function() {
        $.mobile.changePage("#page2",{transition:"slideup"});
    });        
});