<template>
  <div>
    <b-card
      bg-variant="warning"
      text-variant="black"
      header="Update Kasus COVID-19 di Indonesia "
      style="font-size: 25px;"
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

</style>