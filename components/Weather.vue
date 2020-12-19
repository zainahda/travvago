<template>
  <div id="weather">
    <main>
            <b-card no-body class="card-weather overflow-hidden" style="max-width: 540px">
              <b-row no-gutters>
                <b-col md="6">
                  <b-card-img
                    src="../assets/weather.png"
                    alt="Image"
                    class="rounded-0"
                    width="200"
                    min-height="400"
                  ></b-card-img>
                </b-col>
                <!-- Search start -->
                <b-col md="6">
                  <b-card-body title="Check your weather">
                    <b-card-text>
                      <div class="search-box">
                        <input
                          type="text"
                          class="search-bar"
                          placeholder="Search..."
                          v-model="query"
                          @keypress="fetchWeather"
                        />
                      </div>
                      <!-- search end -->
                      
                      <!-- value of weather -->
                      <div
                        class="weather-wrap"
                        v-if="typeof weather.main != 'undefined'"
                      >
                        <div class="location-box">
                          <div class="location">
                            <strong>{{ weather.name }},</strong> {{ weather.sys.country }}
                          </div>
                          <div class="date">{{ dateBuilder() }}</div>
                        </div>

                        <div class="weather-box">
                          <div class="temp">
                            {{ Math.round(weather.main.temp) }}°c
                          </div>
                          <div class="weather">
                            {{ weather.weather[0].main }}
                          </div>
                        </div>
                      </div>

                    </b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      api_key: "c04cf6ec1e38d1c38628564a821b0bb5",
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {},
    };
  },
  methods: {
    fetchWeather(e) {
      if (e.key == "Enter") {
        fetch(
          `${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`
        )
          .then((res) => {
            return res.json();
          })
          .then(this.setResults);
      }
    },
    setResults(results) {
      this.weather = results;
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

<style>
.location-box .location {
  font-size: 25px;
  color: #F85E1D;
}
</style>
