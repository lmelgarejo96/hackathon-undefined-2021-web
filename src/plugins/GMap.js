import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

console.log(process.env.VUE_APP_API_GMAP)
Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyDtxjBY6iyU9YtA4s0zCuLY8gd0uY80-1o",
        libraries: 'places', // This is required if you use the Autocomplete plugin
        // OR: libraries: 'places,drawing'
        // OR: libraries: 'places,drawing,visualization'
        // (as you require)

        //// If you want to set the version, you can do so:
        // v: '3.26',
    },
})