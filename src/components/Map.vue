<template>
  <GmapMap
    :center="{ lat: -12.06461693366569, lng: -77.038435658961 }"
    :zoom="20"
    map-type-id="hybrid"
    style="width: 100vw; height: 100vh"
  >
    <GmapPolyline
      :path="[
        { lat: -12.064222525122442, lng: -77.03741003055119 },
        { lat: -12.064367082166124, lng: -77.03858895571607 },
        { lat: -12.064438468331975, lng: -77.03922769225176 },
        { lat: -12.06453483962906, lng: -77.0390360712946 },
        { lat: -12.06461693366569, lng: -77.038435658961 },
      ]"
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
      position: { lat: -12.06461693366569, lng: -77.038435658961 },
      icon: require("../assets/marker.gif"),
    };
  },
};
</script>

<style lang="scss" scoped></style>
