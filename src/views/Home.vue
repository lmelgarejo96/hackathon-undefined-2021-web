<template>
  <div class="app-map" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div v-if="!trackId" class="error-container">Something went wrong</div>
    <template v-else>
      <div v-if="userInfo" ref="cardInfo" class="track-card-info">
        <button @click="openCard" class="btn-open">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-4.5 14c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm4.5 0c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm4.5 0c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z"
            />
          </svg>
        </button>
        <h4>INFORMACIÓN DEL CONTACTO</h4>
        <h6><strong>Usuario:</strong> {{ userInfo.fullName }}</h6>
        <div v-if="message" class="card-error">
          {{ message }}
        </div>
        <div v-if="polynes && polynes.length > 0" class="scroll-content">
          <li v-for="(route, idx) in polynes" :key="idx + 1">
            Lat: {{ route.lat }}, Long: {{ route.lng }}<p class="mb-0 text-left">Fecha: {{ route.createdAt }}</p>
          </li>
        </div>
      </div>
      <GmapMap
        :center="lastPositionCenter"
        :zoom="20"
        :map-type-id="mapType"
        :style="styles"
      >
        <GmapPolyline :path="polynes" :options="optsPolyne" />
        <GmapMarker
          v-if="position"
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
      hostURI: "https://prueba2.castillodetalentos.edu.pe",
      socket: null,
      trackId: null,
      optsPolyne: { strokeColor: "#af0000", strokeOpacity: "1.0", strokeWeight: "5" },
      polynes: [],
      lastPositionCenter: { lat: -12.06461693366569, lng: -77.038435658961 },
      position: null,
      current: [],
      haveUser: false,
      userInfo: null,
      isMouseEnter: false,
      icon: require("../assets/person.png"),
      mapType: "hybrid",
      styles: "width: 100vw; height: 100vh",
      message: "",
    };
  },
  async created() {
    try {
      const { trackId } = this.$route.query;
      if (!trackId) return;
      this.trackId = trackId;
      this.socket = io(this.hostURI, {
        //cambiar url si es necesario
        path: "/hackathon-comercio/api/socket/connect",
      });
      this.socket.emit("track:initListen", trackId);
      this.socket.on("track:listen", (data) => {
        this.haveUser = true;
        this.polynes = [...data.route, { ...data.now }];
        this.position = data.now;
        if (this.isMouseEnter) {
          this.lastPositionCenter = data.now;
        }
      });
      this.socket.on("track:message", (data) => {
        this.message = data.message;
      });
      await this.getUser();
    } catch (error) {}
  },
  methods: {
    async getUser() {
      try {
        const response = await fetch(
          `${this.hostURI}/hackathon-comercio/api/users/${this.trackId}`
        );
        const data = await response.json();
        this.userInfo = data.data;
      } catch (error) {}
    },
    openCard() {
      this.$refs.cardInfo.classList.toggle("active");
    },
    handleMouseEnter() {
      this.isMouseEnter = true;
    },
    handleMouseLeave() {
      this.isMouseEnter = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-map {
  position: relative;
  .track-card-info {
    position: fixed;
    padding: 8px;
    left: 15px;
    top: 50%;
    transform: translate(0, -50%);
    width: 250px;
    height: 330px;
    background: #fff;
    z-index: 5;
    transition: all ease-in-out 0.25s;
    //border: 1px solid rgba(0, 0, 0, 0.5);
    box-shadow: -1px 4px 74px -16px rgba(0, 0, 0, 0.3);
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    h4 {
      font-weight: 700;
      font-size: 14px;
      text-align: left;
    }
    h6 {
      font-size: 13px;
      font-weight: 500;
      text-align: left;
    }
    .scroll-content {
      max-height: 230px;
      height: 250px;
      overflow-y: auto;
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
      padding-left: 10px;
      li {
        list-style: square;
        padding-left: 0;
        margin-left: 0;
        margin-right: 0;
        font-size: 12px;
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        border-bottom: 1px solid #ccc;
      }
    }
    @media screen and (min-width: 901px) {
      left: 15px !important;
    }
    @media screen and (max-width: 900px) {
      left: calc(-250px);
      &.active {
        left: 0px;
      }
    }
  }
  .btn-open {
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 2px;
    position: absolute;
    left: 100%;
    top: 0;
    display: none;
    @media screen and (max-width: 900px) {
      display: inline-block;
    }
  }

  .card-error {
    font-size: 12px;
    color: #af0000;
    padding-bottom: 3px;
  }
}
</style>
