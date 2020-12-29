<template>
  <div>
    <pre>{{ destination }}</pre>
    <div class="container">

      <div class="title">
      <b-img :src="destination.image" fluid :alt="destination.name"></b-img>
      <h1><em>{{ destination.name }}</em></h1>
      <h4>{{ destination.address }}</h4>
      <h4 v-for="guide in guides" :key="guide">Termasuk dalam <strong> {{ guide.description }}</strong> Covid-19</h4>
      </div>

      <div class="content">
        <p>{{ destination.about }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      destination: "",
      opening_hours: [],
      guides: [],
      currentTemp: "",
      minTemp: "",
      maxTemp: "",
      sunrise: "",
      sunset: "",
      pressure: "",
      humidity: "",
      wind: "",
      overcast: "",
      icon: "",
      name: "",
      lat: "",
      lon: "",
    };
  },
  beforeMount() {
    this.getWeather();
  },
  created() {
    fetch(
      `https://travvago-backend.herokuapp.com/api/v1/destination/detail?id=${this.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.destination = data.results;
        this.opening_hours = data.results.opening_hours;
        this.guides = data.results.guides;
      });
  },
  methods: {
    getWeather() {
      const lat = "-7.945660";
      const lng = "110.555190";
      const apiKey = "3bcd73cddf9df377bc3e2d51bcf915cf";
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${apiKey}`
      )
        .then((response) => response.json())
        .then((response) => {
          this.currentTemp = response.main.temp;
          this.minTemp = response.main.temp_min;
          this.maxTemp = response.main.temp_max;
          this.pressure = response.main.pressure;
          this.humidity = response.main.humidity + "%";
          this.wind = response.wind.speed + "m/s";
          this.name = response.name;
          this.lat = response.coord.lat;
          this.lon = response.coord.lon;
          this.overcast = response.weather[0].description;
          this.icon = "images/" + response.weather[0].icon.slice(0, 2) + ".svg";
          this.sunrise = new Date(response.sys.sunrise * 1000)
            .toLocaleTimeString("en-GB")
            .slice(0, 4);
          this.sunset = new Date(response.sys.sunset * 1000)
            .toLocaleTimeString("en-GB")
            .slice(0, 4);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap");

.header h1 {
  display: flex;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 50px;
  color: #f85e1d;
  justify-content: center;
  font-weight: bold;
  font-size: 48px;
  padding: 40px 0 10px 0;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.41));
}
.top {
  background-color: grey;
}
.container {
  margin-top: 30px;
}
.content {
  margin-top: 30px;
}
</style>