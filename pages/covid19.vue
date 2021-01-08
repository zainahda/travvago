<template>
  <div>
    <div class="head mb-3">
      <Navbar />
    </div>
    <h1 class="covid d-flex justify-content-center">Update Data Sebaran COVID-19 di Indonesia</h1>

    <div class="row mb-4">
      <div
        class="container col-md-4 mt-4"
        v-for="region in stats.regions"
        :key="region"
      >
        <b-card-group deck class="card">
          <b-card
            bg-variant="primary"
            text-variant="white"
            :header="region.name"
            class="text text-center"
          >
            <b-card-text
        >Kasus Positif: {{ region.numbers.infected }}</b-card-text
      >

      <b-card-text
        >Kasus Meninggal: {{ region.numbers.fatal }}</b-card-text
      >

      <b-card-text
        >Angka Kesembuhan: {{ region.numbers.recovered }}</b-card-text
      >
          </b-card>
        </b-card-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stats: [],
    };
  },
  async fetch() {
    this.stats = await fetch(
      "https://dekontaminasi.com/api/id/covid19/stats"
    ).then((res) => res.json());
  },
};
</script>

<style scoped>
.head {
  background-color: #85929e;
}
.text {
  font-size: 20px;
}

.covid {
  color: #f85e1d; 
}
.card {
  min-height: 100%;
}
/* tablet version */
@media (min-width: 768px) {
.text {
  font-size: 15px;
}
}
/* desktop versio */
@media (min-width: 992px) {
  .text {
  font-size: 25px;
}
}
</style>