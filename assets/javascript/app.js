$(document).ready(function () {

    //An array of buttons that retrive data from the API
    //There is a div for showing the results and each new button is pressed it would empyt it.
    //There should be a hover feature for the gifs
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

        var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=J0srxNqSiBFUtKrwLvz5ATmCprU2OOsr&limit=25");
        xhr.done(function (data) {

            console.log("success got data", data);
            var length = data.data.length;
            for (var i = 0; i < length; i++) {
                $("#results").append("<img src=" + data.data[i].images.fixed_height.url + ">");
            };

            // $("#results").append("<img src=" + data.data[0].images.fixed_height.url + ">");
            // $("#results").append("<img src=" + data.data[1].images.fixed_height.url + ">");
            // $("#results").append("<img src=" + data.data[2].images.fixed_height.url + ">");
            // $("#results").append("<img src=" + data.data[3].images.fixed_height.url + ">");
            // $("#results").append("<img src=" + data.data[4].images.fixed_height.url + ">");

        });
    };

    $(document).on("click", ".gif", displayGIFs);


});