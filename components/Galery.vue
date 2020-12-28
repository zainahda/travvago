<template>
  <div>
    <h1 class="header">Destinations Galery</h1>
    <div class="carousel-wrapper">
      <VueSlickCarousel v-bind="settings">
        <div
          v-for="all in all.results"
          :key="all.id"
          :all="all"
          class="img-wrapper"
        >
          <img :src="all.image" />
        </div>
      </VueSlickCarousel>
    </div>
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
      settings: {
        arrows: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true,
      },
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Satisfy&display=swap");

* {
  background-color: #e2e2e2;
}
.header {
  display: flex;
  font-family: "Satisfy", cursive;
  margin-bottom: -20px;
  color: #f85e1d;
  justify-content: center;
  font-weight: bold;
  font-size: 30px;
  padding: 40px 0 10px 0;
}
.carousel-wrapper {
  padding: 40px;
}
.img-wrapper img {
  margin: auto;
  width: 200px;
  height: 100px;
}
/* tablet version */
@media (min-width: 768px) and (max-width: 991.98px) {
.header {
  font-size: 40px;
}
.img-wrapper img {
  width: 300px;
  height: 200px;
}
}
/* Desktop Version */
@media (min-width: 992px) {
.header {
  font-size: 48px;
}
.carousel-wrapper {
  padding: 40px;
}
.img-wrapper img {
  margin: auto;
  width: 600px;
  height: 400px;
}  
}
</style>