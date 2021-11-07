import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },

];

const router = new VueRouter({
    mode: "hash",
    base: "hackathon-undefined-2021-web", // process.env.BASE_URL,
    routes,
});

export default router;