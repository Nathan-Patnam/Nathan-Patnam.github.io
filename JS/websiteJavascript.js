
/**
 * Created by Patnamnv on 8/5/17.
 */
$(document).ready(function(){
console.log("importing this files works");
    $("div#myNavbar ul li a").click(function(){
        console.log("nav bar clickedddd");

        $(".newscontainer").fadeOut('slow');
        var myDiv = $(this).attr("href");
        $(myDiv).fadeIn('slow');
    });


});
