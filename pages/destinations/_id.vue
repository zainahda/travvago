<template>
  <div>
    <div class="head">
      <Navbar />
    </div>
    <!-- image start -->
    <b-img
      class="img-hero"
      :src="destination.image"
      fluid
      :alt="destination.name"
    ></b-img>
    <!-- image end -->

    <!-- info start -->
    <div class="container">
      <div class="title">
        <div class="title-text">
          <em>{{ destination.name }}</em>
        </div>
        
        <h4>{{ destination.address }}</h4>
        <h4 v-for="guide in guides.slice(8, 9)" :key="guide">
          Termasuk dalam
          <span class="zonasi"
            ><strong> {{ guide.description }}</strong></span
          >
          Covid-19
        </h4>
      </div>

      <div class="content">
        <p>{{ destination.about }}</p>

        <!-- info end -->

        <!-- weather start -->
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
                    <div class="location">{{ name }}, {{ country }}</div>
                    <div class="date">{{ dateBuilder() }}</div>
                    <div class="temp">{{ Math.round(maxTemp) }}°c</div>
                    <div class="weather">{{ overcast }}</div>
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
          <!-- weather end -->

          <!-- operational hour & prokes start -->
          <div class="information-head mt-3">
            <h3 class="information-title">Operational Hours</h3>
            <div
              class="information ml-2 mt-2"
              v-for="hour in opening_hours"
              :key="hour.id"
            >
              <strong>{{ hour.day_name }}</strong> <br />
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
          <!-- operational hour & prokes end -->
          <!-- gmap button start -->
          <div class="map-option mt-5 mb-1">
            <b-button class="direction" @click="drawDirection" variant="success"
              >Direction</b-button
            >
            <b-button
              class="clear-direction"
              @click="clearMap"
              variant="success"
              >Clear Map</b-button
            >
          </div>
          <!-- gmap button end -->

          <!-- google maps start -->
          <div class="maps mt-5">
            <GmapMap
              :center="endCoordinate"
              :zoom="10"
              map-type-id="roadmap"
              style="width: 100%; height: 520px"
            >
              <!-- gmap marker start -->
              <gmap-marker :position="this.startCoordinate"> </gmap-marker>
              <gmap-marker
                :position="this.endCoordinate"
                :label="destination.name"
              >
              </gmap-marker>
              <!-- gmap marker end coordinates-->

              <!-- gmap direction line start -->
              <gmap-polygon :paths="paths"></gmap-polygon>
              <!-- gmap direction line end -->
            </GmapMap>
          </div>
          <!-- google maps end -->
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
      startCoordinate: {
        lat: 0,
        lng: 0,
      },
      endCoordinate: {
        lat: 0,
        lng: 0,
      },
      paths: [],
    };
  },

  mounted() {
    this.geolocate();
  },

  beforeMount() {
    // this.getWeather();
  },
  // get destination api
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
        this.endCoordinate.lat = parseFloat(data.results.lat);
        this.endCoordinate.lng = parseFloat(data.results.lng);
      });
  },
  // get weather info
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
          this.country = response.sys.country;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // get date
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

    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.startCoordinate = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },

    drawDirection() {
      this.paths = [this.startCoordinate, this.endCoordinate];
    },

    clearMap() {
      this.paths = [];
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap");

.head {
  background-color: #85929e;
}
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
  text-transform: uppercase;
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
  font-size: 50px;
  font-weight: 900;
  text-shadow: 3px 3px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin-left: 35px;
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
.direction {
  display: inline-block;
  position: absolute;
  margin-top: 55px;
  margin-left: 10px;
  z-index: 1;
}
.clear-direction {
  display: inline-block;
  position: absolute;
  margin-top: 55px;
  margin-left: 105px;
  z-index: 1;
}
/* tablet version */
@media (min-width: 768px) {
  .weather-box .temp {
    font-size: 60px;
    margin-left: 35px;
  }
  .direction {
    margin-top: 11px;
    margin-left: 205px;
  }
  .clear-direction {
    margin-top: 11px;
    margin-left: 300px;
  }
}
/* desktop versio */
@media (min-width: 992px) {
  .weather-box .temp {
    font-size: 60px;
    margin-left: 55px;
  }
  .direction {
    margin-top: 12px;
    margin-left: 205px;
  }
  .clear-direction {
    margin-top: 12px;
    margin-left: 300px;
  }
}
</style>