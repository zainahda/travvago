<template>
  <div>
    <b-card
      bg-variant="warning"
      text-variant="black"
      header="Situasi virus COVID-19 di Indonesia "
      style="font-size: 25px"
      class="text-center"
    >
      <b-card-text
        >Total kasus positif: {{ stats.numbers.infected }}</b-card-text
      >

      <b-card-text
        >Total kasus meninggal: {{ stats.numbers.fatal }}</b-card-text
      >

      <b-card-text
        >Total angka kesembuhan: {{ stats.numbers.recovered }}</b-card-text
      >
    </b-card>

    <VueSlickCarousel v-bind="settings">
      <div v-for="region in stats.regions" :key="region">
        <b-card
          bg-variant="primary"
          text-variant="white"
          :header="region.name"
          class="text-center"
        >
          <b-card-text
            >Total kasus positif: {{ region.numbers.infected }}</b-card-text>

            <b-card-text
            >Total kasus meninggal:  {{ region.numbers.fatal }}</b-card-text>

            <b-card-text
            >Total angka kesembuhan:  {{ region.numbers.recovered }}</b-card-text>

        </b-card>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stats: [],
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
  async fetch() {
    this.stats = await fetch(
      "https://dekontaminasi.com/api/id/covid19/stats"
    ).then((res) => res.json());
  },
  // created() {
  //   fetch("https://dekontaminasi.com/api/id/covid19/stats")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       this.stats = data.response;
  //     });
  // },
};
</script>

<style scoped>
</style>