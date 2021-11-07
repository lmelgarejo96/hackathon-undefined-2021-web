<template>
  <div class="app-map" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div v-if="!trackId" class="error-container">
      Error, 
    </div>
    <template v-else>
      <div class="track-card-info">
        <div v-if="message" class="card-error">
          {{message}}
        </div>
      </div>
      <GmapMap
        :center="lastPositionCenter"
        :zoom="20"
        :map-type-id="mapType"
        :style="styles"
      >
        <GmapPolyline
          :path="polynes"
          :options="optsPolyne"
        />
        <GmapMarker
          :position="position"
          :clickable="true"
          :draggable="false"
          :icon="icon"
          @click="center = position"
        />
      </GmapMap>
    </template>
  </div>
</template>

<script>
const { io } = require("socket.io-client");

export default {
  data() {
    return {
      socket: null,
      trackId: null,
      optsPolyne: { strokeColor: "#af0000", strokeOpacity: "1.0", strokeWeight: "5" },
      polynes: [],
      lastPositionCenter: { lat: -12.06461693366569, lng: -77.038435658961 },
      position: { lat: -12.06461693366569, lng: -77.038435658961 },
      current: [],
      isMouseEnter: false,
      icon: require("../assets/person.png"),
      mapType: "hybrid",
      styles: "width: 100vw; height: 100vh",
      message: ""
    };
  },
  created() {
    const { trackId } = this.$route.query;
    if(!trackId) return;
    this.trackId = trackId;
    console.log(trackId)
    this.socket = io('https://prueba2.castillodetalentos.edu.pe', {  //cambiar url si es necesario
        path: "/hackathon-comercio/api/socket/connect"
    });
    this.socket.emit("track:initListen", trackId);
    this.socket.on("track:listen", (data) => {
      this.polynes = [...data.route, ...data.now]
      this.position = data.now
      if(this.isMouseEnter) {
        this.lastPositionCenter = data.now;
      }
    })
    this.socket.on("track:message", (data) => {
      this.message = data.message;
    })
  },
  methods: {
    handleMouseEnter() {
      this.isMouseEnter = true
    },
    handleMouseLeave() {
      this.isMouseEnter = false
    },
  }
};
</script>

<style lang="scss" scoped>
.app-map {
  position: relative;
  .track-card-info {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translate(0, -50%);
    width: 200px;
    height: 200px;
    background: #fff;
    z-index: 5;
    
  }
}
</style>