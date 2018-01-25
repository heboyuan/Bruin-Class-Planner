console.log("here")
$(function() {
    $("#changePageButton").click(function() {
        $.mobile.changePage("#page2",{transition:"slideup"});
    });        
});

