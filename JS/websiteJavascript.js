
/**
 * Created by Patnamnv on 8/5/17.
 */
$(document).ready(function(){

console.log("importing this files works");
    $("#myNavbar ul li a").click(function(){

        $(".newscontainer").fadeOut('slow', function(){
            var myDiv = $(this).attr("href");
        });

        $(myDiv).fadeIn('slow', function(){
            console.log("yeet");
        });

    });


});
