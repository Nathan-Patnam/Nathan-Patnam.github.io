
/**
 * Created by Patnamnv on 8/5/17.
 */
$(document).ready(function(){
console.log("importing this files works");
    $("div#myNavbar ul li a").click(function(){
        console.log("nav bar clicked");
        $(".newscontainer").hide();
        var myDiv = $(this).attr("href");
        $(myDiv).show();
    });


});
