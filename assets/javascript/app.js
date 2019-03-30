
$(document).ready(function(){


  var topics = ["New York Yankees", "Derek Jeter", "Babe Ruth", "Aaron Judge", "Philadelphia 76ers", "Allen Iverson", "Dr. J", "Philadelphia Eagles", "Brian Dawkins", "Donovan McNabb", "Carson Wentz", "New Jersey Devils", "Martin Brodeur", "Scott Stevens", "NBA", "MLB", "NFL"];

  function createButtons() {


    $("#gif-buttons").empty();


    for (var i = 0; i < topics.length; i++) {
      var newButton = $("<button>");
      newButton.text(topics[i]);
      newButton.addClass("buttons btn btn-default");
      newButton.attr("data-topic", topics[i]);
      newButton.attr("id", topics[i]);
      $("#gif-buttons").append(newButton);
    }
  }


  $(document.body).on("click", ".buttons", function() {

    var baseURL = "https://api.giphy.com/v1/gifs/search?q=";
    var apiKey = "api_key=dc6zaTOxFJmzC";
    var searchTerm = $(this).text();
    var limit = 10;
    var rating;


    var queryURL = baseURL + searchTerm + "&" + "limit="+ limit + "&" + apiKey;


    $("#gif-container").empty();

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {

      var results = response.data;


      for (var i = 0; i < results.length; i++) {


        var sportDiv = $("<div>").attr("id", "sport-div");


        var ratingText = $("<p>").text("Rating: " + results[i].rating);
        ratingText.addClass("rating");


        var sportImage = $("<img>");
        sportImage.addClass("img-fluid pic rounded");


        sportImage.attr("data-still", results[i].images.fixed_height_still.url);
        sportImage.attr("src", results[i].images.fixed_height_still.url);
        sportImage.attr("data-animated", results[i].images.fixed_height.url);
        sportImage.attr("data-state", "still");


        sportDiv.append(ratingText);
        sportDiv.append(sportImage);


        $("#gif-container").prepend(sportDiv);
      }
    });
  });


  $(document.body).on("click", ".pic", function() {


    var state = $(this).attr("data-state");


    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animated"));
      $(this).attr("data-state", "animated");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-sport").on("click", function(event) {

    event.preventDefault();


    var sport = $("#sport-input").val().trim();


    if (sport.length > 0) {
      topics.push(sport);
    }


    createButtons();


    $("#sport-input").val("");
  });


  createButtons();

});
