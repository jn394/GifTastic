$(document).ready(function () {

    //First few items for the button
    var topics = ["Ferris Bueller Day Off", "Alf", "Back To The Future", "Micheal Jackson", "The Oregon Trail", "The Goonies", "He-Man", "Ghostbusters", "Duran Duran", "Top Gun", "The Breakfast Club", "Pee-wee's Playhouse", "Berlin Wall", "Walkman"];

    //Runs the array and creates new buttons for each element
    function renderButtons() {

        $("#buttons").empty();

        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.attr("data-name", topics[i]);
            a.addClass("gif btn btn-outline-warning");
            a.text(topics[i]);
            $("#buttons").append(a);
        };
    };

    renderButtons();


    //When new entry is added to the array it will render all the buttons again
    $("#add-gif").on("click", function (event) {

        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        topics.push(gif);
        renderButtons();
        $("#gif-input").val("");
    });

    //Default at 10
    $("#results-10").show();
    $("#results-20").hide();
    $("#results-30").hide();
    $("#results-40").hide();
    $("#results-50").hide();

    //Displays the gifs of the clicked entry
    function displayGIFs() {

        $("#results-10").empty();
        $("#results-20").empty();
        $("#results-30").empty();
        $("#results-40").empty();
        $("#results-50").empty();

        var gif = $(this).attr("data-name");
        //A call for the API to get the data
        var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=J0srxNqSiBFUtKrwLvz5ATmCprU2OOsr&limit=50");
        xhr.done(function (data) {

            console.log("success got data", data);
            for (var i = 0; i < 10; i++) {
                //Creating a div with the img tag so the gifs can be appended. Also adding attributes like data-status and data-num to locate the right gif in the later functions.
                $("#results-10").append("<div id='gifDiv'>" + data.data[i].title + "<br>Rating: " + data.data[i].rating + "<br><img class='clickGIF p-1 round' src=" + data.data[i].images.fixed_height_still.url + " data-status = 'still' data-num=" + [i] + "></div>");
            };
            for (var i = 10; i < 20; i++) {
                //Creating a div with the img tag so the gifs can be appended. Also adding attributes like data-status and data-num to locate the right gif in the later functions.
                $("#results-20").append("<div id='gifDiv'>" + data.data[i].title + "<br>Rating: " + data.data[i].rating + "<br><img class='clickGIF p-1 round' src=" + data.data[i].images.fixed_height_still.url + " data-status = 'still' data-num=" + [i] + "></div>");
            };
            for (var i = 20; i < 30; i++) {
                //Creating a div with the img tag so the gifs can be appended. Also adding attributes like data-status and data-num to locate the right gif in the later functions.
                $("#results-30").append("<div id='gifDiv'>" + data.data[i].title + "<br>Rating: " + data.data[i].rating + "<br><img class='clickGIF p-1 round' src=" + data.data[i].images.fixed_height_still.url + " data-status = 'still' data-num=" + [i] + "></div>");
            };
            for (var i = 30; i < 40; i++) {
                //Creating a div with the img tag so the gifs can be appended. Also adding attributes like data-status and data-num to locate the right gif in the later functions.
                $("#results-40").append("<div id='gifDiv'>" + data.data[i].title + "<br>Rating: " + data.data[i].rating + "<br><img class='clickGIF p-1 round' src=" + data.data[i].images.fixed_height_still.url + " data-status = 'still' data-num=" + [i] + "></div>");
            };
            for (var i = 40; i < 50; i++) {
                //Creating a div with the img tag so the gifs can be appended. Also adding attributes like data-status and data-num to locate the right gif in the later functions.
                $("#results-50").append("<div id='gifDiv'>" + data.data[i].title + "<br>Rating: " + data.data[i].rating + "<br><img class='clickGIF p-1 round' src=" + data.data[i].images.fixed_height_still.url + " data-status = 'still' data-num=" + [i] + "></div>");
            };

            //When the clickGIF imgs are clicked the function will change the src of the img to make it a gif as well as change the status from "still" to "gif"
            $(".clickGIF").on("click", function () {
                //Checks to see if its working
                console.log("yes!");
                var src = $(this).attr("src");
                console.log(src);
                var newStat = $(this).attr("data-status");
                console.log(newStat);
                var i = $(this).attr("data-num");
                console.log(i);

                //If statement for when its status is "still" it would change the src to the gif src and change the status to "gif". Same if it was a gif the src would change to still and status as well
                if (newStat === 'still') {
                    src = $(this).attr("src", data.data[i].images.fixed_height.url);
                    newStat = $(this).attr("data-status", "gif")
                }
                else {
                    src = $(this).attr("src", data.data[i].images.fixed_height_still.url);
                    newStat = $(this).attr("data-status", "still");
                }
            })
        });
    };

    function showthings(){
        $(this).on("click", function () {
            if ($(".form-control").val() === "10") {
                $("#results-10").show();
                $("#results-20").hide();
                $("#results-30").hide();
                $("#results-40").hide();
                $("#results-50").hide();
            }
            else if ($(".form-control").val() === "20") {
                $("#results-10").show();
                $("#results-20").show();
                $("#results-30").hide();
                $("#results-40").hide();
                $("#results-50").hide();
            }
            else if ($(".form-control").val() === "30") {
                $("#results-10").show();
                $("#results-20").show();
                $("#results-30").show();
                $("#results-40").hide();
                $("#results-50").hide();
            }
            else if ($(".form-control").val() === "40") {
                $("#results-10").show();
                $("#results-20").show();
                $("#results-30").show();
                $("#results-40").show();
                $("#results-50").hide();
            }
            else if ($(".form-control").val() === "50") {
                $("#results-10").show();
                $("#results-20").show();
                $("#results-30").show();
                $("#results-40").show();
                $("#results-50").show();
            }
        });
    }

    //When a gif is clicked it will display the gif in the html
    $(document).on("click", ".gif", displayGIFs);
    $(document).on("click", ".form-control", showthings);

    //Create a document on click that only works with a class and varifies it with the number value.
    $(".form-control").on("click", function () {
        console.log($(".form-control").val());
        console.log(typeof (($(".form-control").val())));
    })

});

//should trigger when the numbers are selected
