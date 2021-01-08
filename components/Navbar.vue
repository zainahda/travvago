<template>
    <div class="nav-all">
    <b-navbar toggleable="lg" type="light">
        <div class="container navbar">
            <b-img src="../assets/logo.png" width="50px"></b-img>
            <b-navbar-brand class="nav-brand" href="#">TravvaGo</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="navbar-link ml-auto">
                <b-nav-item href="/">Home |</b-nav-item>
                <b-nav-item href="/destination">Destination |</b-nav-item>
                <b-nav-item href="/covid19">Info Covid-19 |</b-nav-item>
            </b-navbar-nav>

            </b-collapse>
        </div>
    </b-navbar>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Irish+Grover&family=Montserrat&display=swap');

.navbar {
    position: relative;
    z-index: 1;
}
.navbar-brand {
    font-family: 'Irish Grover', cursive;
    font-size: 26px;
}
.navbar-nav {
    text-transform: uppercase;
    margin-right: 20px;
}
.navbar-brand, .nav-link, .btn-login{
    color: #F85E1D !important;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.41);
}
.btn-login{
    margin-left: 0px;
    background: none;
    border: none;

}
.btn-signup {
    background: linear-gradient(180deg, #FEA858 0%, #F85E1D 100%);
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.btn:active {
    position: relative;
    top: 7px;
    box-shadow: none;
}

/* tablet version */
@media (min-width: 768px) {
.btn-login{
    margin-left: -10px;
}
}

/* Desktop Version */
@media (min-width: 992px) {

.nav-link:hover::after {
    content: "";
    display: block;
    border-bottom: 2px solid #F85E1D;
    width: 50%;
    margin: auto;
    padding-bottom: 5px;
    margin-bottom: -8px;
}
.navbar-brand, .nav-link, .btn-login{
    color: white !important;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.41);
}
.btn{
    color: white;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.41);
    
} 
.navbar-brand {
    font-size: 36px;
}
}

</style>