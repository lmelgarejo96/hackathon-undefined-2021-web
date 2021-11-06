<template>
  <GmapMap
    :center="position"
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

<script>
export default {
  data() {
    return {
      optsPolyne: { strokeColor: "#af0000", strokeOpacity: "1.0", strokeWeight: "5" },
      polynes: [
        { lat: -12.064222525122442, lng: -77.03741003055119 },
        { lat: -12.064367082166124, lng: -77.03858895571607 },
        { lat: -12.064438468331975, lng: -77.03922769225176 },
        { lat: -12.06453483962906, lng: -77.0390360712946 },
        { lat: -12.06461693366569, lng: -77.038435658961 },
      ],
      position: { lat: -12.06461693366569, lng: -77.038435658961 },
      icon: require("../assets/marker.gif"),
      mapType: "hybrid",
      styles: "width: 100vw; height: 100vh",
    };
  },
  mounted() {
    setInterval(() => {
      this.renderMorePoints()
    }, 2000);
  },
  methods: {
    renderMorePoints() {
      const last = this.polynes[this.polynes.length - 1];
      const current = { lat: last.lat -0.000016, lng: last.lng - 0.0000025 }
      this.position = current;
      this.polynes.push(current)
    }
  }
};
</script>

<style lang="scss" scoped></style>