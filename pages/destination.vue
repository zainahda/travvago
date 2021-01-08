<template>
  <div>
    <div class="head">
    <Navbar />
    </div>

    <div class="container">
      <div class="header mt-4">
        <h1 class="animate__animated animate__fadeInLeft animate__slower">
          Destinations
        </h1>
      </div>

      <div class="row mt-3">
        <div class="col">
          <div class="input-group mb-3 shadow">
            <input
              v-model="search"
              class="form-control"
              type="text"
              placeholder="Cari Destinasi .."
            />
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div
          class="col-md-4 mt-4"
          v-for="destination in filteredDestinations"
          :key="destination.id"
        >
          <div class="card-group shadow">
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
      destinations: [],
      search: "",
    };
  },
  created() {
    fetch("https://travvago-backend.herokuapp.com/api/v1/destination/all")
      .then((response) => response.json())
      .then((data) => {
        this.destinations = data.results;
        this.destinations = data.results.name.slice(0, 10);
      });
  },
  computed: {
    filteredDestinations: function () {
      return this.destinations.filter((destination) => {
        return destination.name.match(this.search);
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

.head {
  background-color: #85929e;
}
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
  text-transform: uppercase;
  margin: -500px 0 0 5px;
  background: linear-gradient(
    135deg,
    rgba(248, 94, 29, 0.8) 90%,
    rgba(255, 255, 255, 0) 0%
  );
  padding: 5px 100px 5px 5px;
  color: #ffffff;
}
/* tablet version */
@media (min-width: 768px) {
  .info {
    font-size: 15px;
    background: linear-gradient(
    135deg,
    rgba(248, 94, 29, 0.8) 60%,
    rgba(255, 255, 255, 0) 0%
  );
  margin: 15px 0 0 5px;
  }
}
/* desktop versio */
@media (min-width: 992px) {
  .info {
    margin: 10px 0 0 5px;
    background: linear-gradient(
    135deg,
    rgba(248, 94, 29, 0.8) 80%,
    rgba(255, 255, 255, 0) 0%
  );
  }
}
</style>
