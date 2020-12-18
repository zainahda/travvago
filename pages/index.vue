<template>
  <div>
    <Navbar />
    <Landing />
    <!-- populars star -->
    <!-- <Populars /> -->
    <!-- populars end -->
    <!-- destination card start -->
    <div class="container">
      <div class="header">
        <h1 class="animate__animated animate__fadeInLeft animate__slower">Destination</h1>

        <div class="row mb-4">
          <div
            class="col-md-4 mt-4"
            v-for="all in all.results.slice(0, 12)"
            :key="all.id"
          >
          <Destinations :all="all" />
          </div>
        </div>
      </div>
    </div>
    <Galery />
    <!-- destination card end -->
    <!-- <ProductCard
  v-for="popular in populars.results"
  :key="popular.id"
  :popular="popular"/> -->
  </div>
</template>

<script>
export default {
  async fetch() {
    this.all = await fetch(
      "https://travvago-backend.herokuapp.com/api/v1/destination/all?page=1"
    ).then((res) => res.json());
  },
  data() {
    return {
      all: [],
    };
  },

  
  // async fetch(){
  //   this.populars = await fetch(
  //     'https://travvago-backend.herokuapp.com/api/v1/destination/populars?page=2'
  //   ).then((res) => res.json())
  // },
  // data() {
  //   return {
  //     populars: []
  //   }
  // }
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
</style>
