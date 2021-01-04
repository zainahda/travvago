import Vue from 'vue'

import * as VueGoogleMaps from "~/node_modules/vue2-google-maps/src/main"


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBCCZWacEPejmGXWJS12n9Rt-JObSc6Lbw',
    libraries: 'places',
  },
})