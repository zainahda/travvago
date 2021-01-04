<template>
  <div>
    <b-img
      class="img-hero"
      :src="destination.image"
      fluid
      :alt="destination.name"
    ></b-img>
    <div class="container">
      <div class="title">
        <div class="title-text">
          <em>{{ destination.name }}</em>
        </div>
        <h4>{{ destination.address }}</h4>
        <h4 v-for="guide in guides.slice(8, 9)" :key="guide">
          Termasuk dalam
          <span class="zonasi"
            ><strong > {{ guide.description }}</strong></span
          >
          Covid-19
        </h4>
      </div>

      <div class="content">
        <p>{{ destination.about }}</p>

        <div class="weather-card">
          <b-card
            no-body
            class="overflow-hidden ml-auto mr-auto"
            style="max-width: 800px"
          >
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img
                  src="https://img.icons8.com/clouds/500/000000/sun.png"
                  alt="Image"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body class="card-body mt-5 ml-5">
                  <b-card-text class="weather-box">
                    <div class="location">{{ name }}</div>
                    <div class="date">{{ dateBuilder() }}</div>
                    <div class="temp">{{ Math.round(maxTemp) }}°c</div>
                    <div class="weather">{{ overcast }}</div>
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>

          <div class="information-head mt-3">
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
            <pre>{{ latitude }} {{ longitude }}</pre>
          <div class="maps mt-5">
            <GmapMap
              :center="coordinate"
              :zoom="17"
              map-type-id="roadmap"
              style="width: 1000px; height: 520px;"
            >
            </GmapMap>
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
      coordinate: {
              lat: -8.527716,
              lng: 119.48332
            }
    };
  },
  beforeMount() {
    // this.getWeather();
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
        this.getWeather(data.results);
      });
  },
  methods: {
    getWeather(data) {
      let lat = data["lat"];
      let lng = data["lng"];
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
.information-title,
.guides-title {
  color: #f85e1d;
  font-size: 40px;
  font-weight: 700;
  font-family: "Montserrat", sans-serif;

}
.img-hero {
  width: 100%;
  height: 782px;
}
.title-text {
  color: #f85e1d;
  font-size: 50px;
  font-weight: 500;
  font-style: italic;
}
.location {
  margin-top: -20px;
  color: #f85e1d;
  font-size: 40px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}
.date {
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}
.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #f85e1d;
  font-size: 70px;
  font-weight: 900;
  text-shadow: 3px 3px rgba(0, 0, 0, 0.25);
  background-color:rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin-left: 55px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.weather {
  text-align: center;
  color: #f85e1d;
  font-size: 35px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 3px rgba(0, 0, 0, 0.25);
  margin-top: 15px;
}

</style>