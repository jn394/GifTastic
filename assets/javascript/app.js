$(document).ready(function () {

    //The gifs also have a rating that is gotten from the API
    //Every time I enter a new string it would add a button
    //The new string will be called from the API

    var topics = ["dogs", "cats", "fish"];

    function renderButtons() {

        $("#buttons").empty();

        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.attr("data-name", topics[i]);
            a.addClass("gif");
            a.text(topics[i]);
            $("#buttons").append(a);
        };
    };

    renderButtons();

    $("#add-gif").on("click", function (event) {

        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        topics.push(gif);
        renderButtons();

    });

    function displayGIFs() {

        $("#results").empty();

        var gif = $(this).attr("data-name");

        var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=J0srxNqSiBFUtKrwLvz5ATmCprU2OOsr&limit=10");
        xhr.done(function (data) {

            console.log("success got data", data);
            var length = data.data.length;
            for (var i = 0; i < length; i++) {
                //Add a value attribute equal to [i] that varifies the number of the made gif or "data-" attr 
                $("#results").append("<div id='ratingDiv'> Rating: " + data.data[i].rating + "<br><img class='clickGIF' src=" + data.data[i].images.fixed_height_still.url + " data-status = 'still' data-num=" + [i] + "></div>");
            };

            $(".clickGIF").on("click",function(){
                console.log("yes!");
                var src = $(this).attr("src");
                console.log(src);
                var newStat = $(this).attr("data-status");
                console.log(newStat);
                var i = $(this).attr("data-num");
                console.log(i);

                if (newStat === 'still') {
                    src = $(this).attr("src", data.data[i].images.fixed_height.url);
                    newStat = $(this).attr("data-status","gif")
                }
                else {
                    src = $(this).attr("src", data.data[i].images.fixed_height_still.url);
                    newStat = $(this).attr("data-status","still");
                }
            })
        });
    };
    
    $(document).on("click", ".gif", displayGIFs);

//Create a document on click that only works with a class and varifies it with the number value.

});