<template>
  <div>
    <footer class="footer-distributed">
      <div class="footer-right">
        <b-icon class="icons" icon="facebook"></b-icon>
        <b-icon class="icons" icon="instagram"></b-icon>
        <b-icon class="icons" icon="twitter"></b-icon>
      </div>

      <div class="footer-left">
        <p class="footer-text">
          Travvago
        </p>

        <p>Travvago Team &copy; 2020</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Irish+Grover&display=swap');

* {
  top: 30px;
  background-color: #f85e1d;
  padding: 10px;
}


section {
  width: 100%;
  display: inline-block;
  background: #ccc;
  height: 60vh;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  text-decoration: underline;
}

.footer-distributed {
  background-color: #292c2f;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  width: 100%;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  padding: 45px 50px;
}

.footer-distributed .footer-left p {
  color: #ffffff;
  font-size: 14px;
  margin: 0;
}
/* Footer links */

.footer-distributed p.footer-text {
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  margin: 0 0 5px 20px;
  padding: 0;
  transition: ease .25s;
  font-family: 'Irish Grover', cursive;
}

.footer-distributed p.footer-links .icons {
  display: inline-block;
  line-height: 1.8;
  text-decoration: none;
  color: inherit;
  transition: ease .25s;
}

.footer-distributed .footer-right {
  float: right;
  margin-top: 6px;
  max-width: 180px;
}

.footer-distributed .footer-right .icons {
  display: inline-block;
  width: 35px;
  height: 35px;
  background-color: #33383b;
  border-radius: 2px;
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  line-height: 35px;
  margin-left: 3px;
  transition:all .25s;
}

/* Media Queries */

@media (max-width: 600px) {
  .footer-distributed .footer-left, .footer-distributed .footer-right {
    text-align: center;
  }
  .footer-distributed .footer-right {
    float: none;
    margin: 0 auto 20px;
}
}
</style>