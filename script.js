let weather = {
    apiKey: "71f6fe548bc7cb98a2545c4ff308627d",
    fetchWeather: function (city) {
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=imperial&appid=" +
            this.apiKey
        )
          .then((response) => {
            if (!response.ok) {
              alert("No weather found for this city.");
              throw new Error("No weather found for this city.");
            }
            return response.json();
          })
          .then((data) => this.displayWeather(data));
      },
      displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
          "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText =
          "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
          "Wind speed: " + speed + " mph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
          "url('https://source.unsplash.com/1600x900/?" + name + "')";
      },
      search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
      },
    };
    
    document
    .querySelector(".search button")
    .addEventListener("click", function (event) {
        event.preventDefault();
        weather.search();
        event.currentTarget.value = "";
    });

    document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            event.preventDefault();
            weather.search();
            event.currentTarget.value = ""; //clears the search box once "enter" is pressed
        }
    });

  weather.fetchWeather("Tobyhanna");