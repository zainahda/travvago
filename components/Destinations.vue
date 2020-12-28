<template>
  <div>
    <div class="card-group">
      <b-card
        class="card animate__animated animate__fadeInDown animate__slower"
        overlay
        :img-src="all.image"
        :img-alt="all.title"
        text-variant="info"
        img-width="600px"
        img-height="500px"
      >
      <nuxt-link class="explore btn btn-block" to="/${destination.id}">Explore Now</nuxt-link>
          <!-- <b-button class="explore btn-block"></b-button> -->
      </b-card>
      <b-card-text
        class="info animate__animated animate__fadeInUp animate__slower"
      >
        {{ all.name }}
      </b-card-text>
      <div>
    <b-form-rating class="ratings" id="rating-inline" inline :value="all.ratings"></b-form-rating>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  
  props: {
    all: {},
  },
};
</script>

<style scoped>
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
  margin: 10px 0 0 5px;
  background: linear-gradient(
    135deg,
    rgba(248, 94, 29, 0.8) 80%,
    rgba(255, 255, 255, 0) 0%
  );
  padding: 5px 100px 5px 5px;
  color: #ffffff;
}
.card {
  filter: drop-shadow(6px 3px 4px rgba(0, 0, 0, 0.4));
}
.card-group:hover {
  bottom: 0;
  height: 100%;
  transform: scale(1.1);
}
.ratings {
  position: absolute;
  color: #FFD700;
  left: 20px;
  top: 50px;
}
/* .text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
} */

/* .search2 {
  background: linear-gradient(180deg, #fea858 0%, #f85e1d 100%);
} */

/* tablet version */
/* @media (min-width: 768px) {
  .explore {
    margin-left: 170px;
    margin-top: 270px;
  }
  .card-group {
    margin-right: 15px;
  }
} */

/* Desktop Version */
/* @media (min-width: 992px) {
  .container-destination {
    margin-top: 100px;
    margin-left: 250px;
    width: 1440px;
    height: 100%;
    margin-top: -10px;
  }
  .header h1 {
    margin-bottom: 110px;
    justify-content: center;
    font-size: 64px;
    padding: 50px 0 10px 0;
  }
  .card-group {
    justify-content: center;
    margin-right: 10px;
  }
  .home {
    margin-top: -350px;
  }
  .text {
    font-size: 20px;
  }
  .explore {
    margin-left: 90px;
    margin-top: 250px;
  }
} */
</style>