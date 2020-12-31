<template>
  <div>
    <pre>{{ latitude }} {{ longitude }}</pre>
    <div class="container">
      <div class="title">
        <b-img :src="destination.image" fluid :alt="destination.name"></b-img>
        <h1>
          <em>{{ destination.name }}</em>
        </h1>
        <h4>{{ destination.address }}</h4>
        <h4 v-for="guide in guides.slice(8,9)" :key="guide">
          Termasuk dalam <span class="zonasi"><strong> {{ guide.description }}</strong></span> Covid-19
        </h4>
      </div>

      <div class="content">
        <p>{{ destination.about }}</p>

        <div class="weather-card">
          <b-card no-body class="overflow-hidden ml-auto mr-auto" style="max-width: 800px">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img
                  src="https://img.icons8.com/clouds/500/000000/sun.png"
                  alt="Image"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body class="card-body mt-5 ml-5":title="name">
                  <b-card-text>
                    <h5>{{ dateBuilder() }}</h5>
                    <p class="temp">{{ Math.round(maxTemp) }}°c</p>
                    <p class="overcast">{{ overcast }}</p>
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>

          <div class="information-head mt-3 ">
            <h3 class="information-title">Operational Hours</h3>
            <div
              class="information ml-2 mt-2"
              v-for="hour in opening_hours"
              :key="hour.id"
            >
              {{ hour.day_name }} <br />
              {{ hour.time_from }} - {{ hour.time_to }}
            </div>
          </div>

          <div class="guides-head mt-3">
            <h3 class="guides-title">Protokol Kesehatan di Tempat Wisata</h3>
            <div class="guides">
              <ul>
                <li v-for="guide in guides.slice(0, 8)" :key="guide">
                  {{ guide.description }}
                </li>
              </ul>
            </div>
          </div>

        </div>
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
      overcast: "",
      name: "",
      latitude: "",
      longitude: "",
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
        this.latitude = data.results.lat;
        this.longitude = data.results.lng;
        this.opening_hours = data.results.opening_hours;
        this.guides = data.results.guides;
      });
  },
  methods: {
    getWeather() {
      let lat = `${this.latitude}`;
      let lng = `${this.longitude}`;
      const apiKey = "c04cf6ec1e38d1c38628564a821b0bb5";
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${apiKey}`
      )
        .then((response) => response.json())
        .then((response) => {
          this.currentTemp = response.main.temp;
          this.minTemp = response.main.temp_min;
          this.maxTemp = response.main.temp_max;
          this.name = response.name;
          this.overcast = response.weather[0].description;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dateBuilder() {
      let d = new Date();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
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
.temp {
  color: #f85e1d;
  font-size: 60px;
  margin-bottom: -10px;
}
.overcast {
  font-size: 20px;
}
.information-title, .guides-title {
  color: #f85e1d;
  font-size: 40px;
  font-family: "Montserrat", sans-serif;
}

</style>