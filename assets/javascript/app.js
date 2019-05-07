$(document).ready(function () {
  var initialSearchArray = ["Artichoke", "Asparagus", "Beets", "Broccoli", "Cauliflower", "Corn", "Eggplant", "Mushrooms", "Onions", "Spinach"]

  //function searchGiffy(searchTerm = "Sri Lanka") {

  function searchGiffy(searchTerm) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?";
    var apiKey = "api_key=LsMUTJfV1ulUuw30s3BeBBPDEjezo1l6"
    var searchFor = "&q=" + searchTerm;
    var limit = "&limit=10";
    var completURL = queryURL + apiKey + searchFor + limit;

    $.ajax({
      url: completURL,
      method: "GET"
    }).then(function (response) {
      console.log("this is our response: ", response);

      for (var i = 0; i < response.data.length; i++) {        
                
        var gifDiv = $("<img>");
        gifDiv.attr({         
          "src": response.data[i].images.fixed_height_still.url,
          "data-still": response.data[i].images.fixed_height_still.url,
          "data-animate": response.data[i].images.fixed_height.url,
          "data-state": "still",
          "class": "gif",
         })         
      $("#gif-display").prepend("Rating = ", response.data[i].rating ,gifDiv);
      gifDiv="";
      }
    });
  }

  function addButton(array) {    
    $("#button-display").empty();
    for (var i = 0; i < array.length; i++) {
      var buttonDiv = $("<button>");
      buttonDiv.text(array[i]);
      buttonDiv.attr({
        "data-search": array[i],
        "class": "gifButton"
      });
      $("#button-display").append(buttonDiv);
      }
    $("#button-display").append("<hr>");
  }

  addButton(initialSearchArray);

  $("#addGifs").click(function () {
    var buttonTopic = $("#gifSearch").val().trim();
    if (!buttonTopic=="") {
        if (!initialSearchArray.includes(buttonTopic)) {
        initialSearchArray.push(buttonTopic);
        addButton(initialSearchArray);
      }
    }
    $("#gifSearch").val("");
  });

  $("#gif-display").on("click", ".gif", function () {
    var still_url = this.getAttribute("data-still");
    var animated_url = this.getAttribute("data-animate");
    if ((this.getAttribute("data-state")) == "still") {
      this.setAttribute("data-state", "animated");
      this.setAttribute("src", animated_url);
    }
    else {
      this.setAttribute("data-state", "still");
      this.setAttribute("src", still_url);
    }
  });

  $(document).on("click", ".gifButton", function () {
    var searchTerm = $(this)[0].dataset.search;
    searchGiffy(searchTerm);
   })
});






