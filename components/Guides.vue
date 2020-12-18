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
      <div class="row mb-4">
        <div
          class="col-md-4 mt-4"
          v-for="detail in detail.results"
          :key="detail.id"
        >
          <Destinations :detail="detail" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.detail = await fetch(
      "https://http://travvago-backend.herokuapp.com/api/v1/destination/detail?id=1"
    ).then((res) => res.json());
  },
  data() {
    return {
      detail: [],
    };
  },
};
</script>
<style scoped>
</style>
