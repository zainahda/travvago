import Vue from 'vue'

import * as VueGoogleMaps from "~/node_modules/vue2-google-maps/src/main"


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBQoJf7V_kJ946MnEFKIvAlvbn9YPnw-0U',
    libraries: 'places',
  },
})