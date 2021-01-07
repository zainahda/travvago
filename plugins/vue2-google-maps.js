import Vue from 'vue'

import * as VueGoogleMaps from "~/node_modules/vue2-google-maps/src/main"


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD2ctpunvl7cI2ZL6d-03qCXcbvP9WLEqg',
    libraries: 'places',
  },
})