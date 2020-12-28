<template>
  <div>
    <div class="container">
      <div class="top">
      <Navbar />
      </div>
      <div class="header">
        <h1 class="animate__animated animate__fadeInLeft animate__slower">
          Destination
        </h1>
      </div>
      <div class="row mt-3">
        <div class="col">
          <div class="input-group mb-3">
            <input type="text" class="form-control"
            placeholder="Cari Destinasi..."
            aria-label="cari"
            v-model="search"
            @keyup="searchDestinations">
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div
          class="col-md-4 mt-4"
          v-for="all in all.results"
          :key="all.id"
        >
          <Destinations :all="all" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      all: [],
    };
  },
  async fetch() {
    this.all = await fetch(
      "https://travvago-backend.herokuapp.com/api/v1/destination/all?page=1"
    ).then((res) => res.json());
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
.overlay {
  background: linear-gradient(294.89deg, #fea858 0.54%, #6cc6cb 99.34%);
  background-size: cover;
}
.header h1 {
  display: flex;
  font-family: 'Montserrat', sans-serif;
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
</style>
