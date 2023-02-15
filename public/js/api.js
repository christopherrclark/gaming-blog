
$(document).ready(function () {

  // API call
  // GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY
  // GET https://api.rawg.io/api/games?key=YOUR_API_KEY&dates=2019-09-01,2019-09-30&platforms=18,1,7

  var globalData = null;
  const apiKey = "8327d8664a0940748be97c19d4af0504"
  getGames();

  //button click for search
  $("#game-dropdown").change(function buttonClick(e) {
    var selectedGameSlug = $("#game-dropdown").val();
    for (var i = 0; i < globalData.results.length; i++) {
      var slug = globalData.results[i].slug;
      if (slug === selectedGameSlug) {
        $("#name").text(globalData.results[i].name);
        $("#image").attr("src", globalData.results[i].background_image);
        $("#playtime").text("Playtime: " + globalData.results[i].playtime + " hours");
        $("#rating").text("Metacritics Rating: " + globalData.results[i].metacritic + "/100");
        for (var j = 0; j < globalData.results[i].platforms.length; j++){
        $("#platforms").append("<li>" + globalData.results[i].platforms[j].platform.name + "</li>");
        }
        $("#released").text("Date Released: " + globalData.results[i].released);
      }
      if (!selectedGameSlug){
        $("#game-info").hide();
      } else {
        $("#game-info").show();
      }

    }

    
  });

  // don't do a searchbar. drop down menu with all games listed is better

  async function getGames() {
    var url = "https://api.rawg.io/api/games?key=" + apiKey;
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      $("#allBoxes").hide();
      alert("Game not found. Try again");
    }
    else {
      const data = await response.json();
      console.log(data);
      // Extracting data as a JSON Object from the response
      if (!data) {
        alert("No results found");
      }
      else {
        globalData = data;
        for (var i = 0; i < data.results.length; i++) {
          var name = data.results[i].name;
          var slug = data.results[i].slug;
          $("#game-dropdown").append("<option value='" + slug + "'>" + name + "</option>");
        }

        return;
      }
    }
  }
});
