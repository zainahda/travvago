<template>
  <div class="container">
    <div class="header">
      <h1 class="animate__animated animate__fadeInLeft animate__slower">
        Destinations
      </h1>
    </div>

    <!-- <div class="row mt-3">
      <div class="col">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Cari Destinasi..."
            aria-label="cari"
            v-model="search"
            @keyup="searchDestinations"
          />
        </div>
      </div>
    </div> -->

    <div class="row mb-4">
      <div
        class="col-md-4 mt-4"
        v-for="destination in destinations.slice(0, 12)"
        :key="destination.id"
      >
        <div class="card-group">
          <b-card
            class="card animate__animated animate__fadeInDown animate__slower"
            overlay
            :img-src="destination.image"
            :img-alt="destination.title"
            text-variant="info"
            img-width="600px"
            img-height="500px"
          >
            <nuxt-link
              class="explore btn btn-block"
              :to="`/destinations/${destination.id}`"
              >Explore Now</nuxt-link
            >
          </b-card>
          <b-card-text
            class="info animate__animated animate__fadeInUp animate__slower"
          >
            {{ destination.name }}
          </b-card-text>
            <pre>{{ latitude }} {{ longitude}}</pre>

          <!-- <div class="weather-box">
            <div class="temp">{{ Math.round(temp) }}°c</div>
            <div class="weather">{{ overcast }}</div>
          </div> -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      destinations: [],
      currentTemp: "",
      minTemp: "",
      maxTemp: "",
      overcast: "",
      name: "",
      latitude: "",
      longitude: "",
    };
  },
  created() {
    fetch("https://travvago-backend.herokuapp.com/api/v1/destination/all")
      .then((response) => response.json())
      .then((data) => {
        this.destinations = data.results;
        this.latitude = data.results.lat;
        this.longitude = data.results.lng;
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
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

.header h1 {
  display: flex;
  background: linear-gradient(
    135deg,
    rgba(248, 94, 29, 0.7) 30%,
    rgba(255, 255, 255, 0) 60%
  );
  margin: 0 0 50px 0;
  font-family: "Lato", sans-serif;
  color: #ffffff;
  font-weight: bold;
  font-size: 2rem;
  position: relative;
  font-weight: 700;
  letter-spacing: 2px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.41));
}
.explore {
  color: white;
  border: 1px solid grey;
  background: linear-gradient(180deg, #fea858 0%, #f85e1d 100%);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.41));
  margin: 425px auto;
}
.explore:hover {
  background: white;
  color: #f85e1d;
}
.info {
  position: absolute;
  margin: 10px 0 0 5px;
  background: linear-gradient(
    135deg,
    rgba(248, 94, 29, 0.8) 80%,
    rgba(255, 255, 255, 0) 0%
  );
  padding: 5px 100px 5px 5px;
  color: #ffffff;
}
.ratings {
  position: absolute;
  color: #ffd700;
  left: 20px;
  top: 50px;
}
/* .weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #FFF;
  font-size: 25px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color:rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
} */
</style>
