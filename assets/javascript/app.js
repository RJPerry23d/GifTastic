      // Initial array of gifs
      var topics = ["Super Man", "Wonder Woman", "The Flash", "Spiderman"];
      var responseCopy;
      var gifToggle = false;
      // Function for dumping the JSON content for each button into the div
      function displayGifyInfo() {

        var gif = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=f7ea57d3c6bb4d069046900b92c8f30d&q=" + gif +"&limit=10";
        
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	for (var i = 0; i < 10; i++) {
        	var gifDiv = $("<div class='item'>");
        	var rating = response.data[i].rating;
        	var gifP = $('<p class="rating-info">');
        	var gifImage = $('<img class="gif-image">');
        	gifImage.attr("src",response.data[i].images.fixed_height_still.url);        	     
        	gifP.text(rating);
        	gifDiv.append(gifP);
        	gifDiv.append(gifImage);
        	$("#gif-display").append(gifDiv);
        	console.log(rating);

        	}
        	responseCopy = response;
        	return responseCopy;
          //$("#gif-display").html();
          renderButtons();
        });
      }

      // Function for displaying gif data
      function renderButtons() {

        // Deleting the buttons prior to adding new gifs
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each gif in the array
          
          var a = $("<button>");
          // Adding a class of gify to our button
          a.addClass("gify");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#add-gify").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var gify = $("#gify-input").val().trim();

        // Adding the gif from the textbox to our array
        topics.push(gify);
        console.log(topics)

        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
      });
      function swapGif() {
      	var state = $(this).index();
      	if (gifToggle === false) {
      	$(this).find("img").attr("src",responseCopy.data[state].images.fixed_height.url);
      	gifToggle = true;
      } else {
      	$(this).find("img").attr("src",responseCopy.data[state].images.fixed_height_still.url);
      	gifToggle = false;
      	}
      	
      };

      // Function for displaying the gif info
      // Using $(document).on instead of $(".gif").on to add event listenersto dynamically generated elements
      $(document).on("click", ".gify", displayGifyInfo);
      $(document).on("click", ".item", swapGif);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();
    

	















