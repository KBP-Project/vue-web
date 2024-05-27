<template>
  <component :is="activeRoute" :params="params"></component>
  <component :is="mainMenu" :menu="menus"></component>
  <component :is="configMenu" :menu="configMenus"></component>
  <FormLoader :active="loader" />
  <notifications position="bottom right" width="500" />
</template>

<script>
import { markRaw } from "vue";
import FormLoader from "@/components/template/FormLoader.vue";
import MainMenu from "@/views/template/MainMenuView.vue";
import ConfigMenu from "@/views/template/ConfigMenuView.vue";
import { Modal } from 'bootstrap';

import db from './firebase/init.js';
import { doc,getDoc,onSnapshot, updateDoc, collection, addDoc} from "firebase/firestore";


const componentViews = import.meta.globEager("@/views/*.vue");
const componentPages = import.meta.globEager("@/views/pages/**/*.vue");
const componentAuth = import.meta.globEager("@/views/auth/*.vue");

let routeComponent = {};
Object.entries(componentViews).forEach((path, i) => {
  let name = path[0].split("/").pop().replace(".vue", "");
  routeComponent[name] = path[1].default;
});
Object.entries(componentPages).forEach((path, i) => {
  let name = path[0].split("/").pop().replace(".vue", "");
  routeComponent[name] = path[1].default;
});
Object.entries(componentAuth).forEach((path, i) => {
  let name = path[0].split("/").pop().replace(".vue", "");
  routeComponent[name] = path[1].default;
});

const currentUrl = window.location.pathname;

export default {
  components: {
    FormLoader,
  },
  data() {



    let routes = "";
    if (
      sessionStorage.getItem("page") != null &&
      localStorage.getItem("auth") != null
    ) {
      routes = markRaw(routeComponent[sessionStorage.getItem("page")]);
    } else if (
      sessionStorage.getItem("page") == null &&
      localStorage.getItem("auth") != null
    ) {
      routes = markRaw(routeComponent["DashboardView"]);
    } else if (
      localStorage.getItem("token") == null &&
      currentUrl == "/verify"
    ) {
      routes = markRaw(routeComponent["VerifyView"]);
    } else if (currentUrl == "/privacy-policy") {
      routes = markRaw(routeComponent["PrivacyAndPolicy"]);
    } else {
      routes = markRaw(routeComponent["LoginView"]);
    }

    const auth = JSON.parse(localStorage.getItem("auth"));

    return {
      activeRoute: routes,
      mainMenu: markRaw(MainMenu),
      configMenu: markRaw(ConfigMenu),
      params: null,
      menus: routeComponent,
      loader: false,
      configMenus: routeComponent,

      dbfirebase: db,
      docFirebase: doc,
      getDocFirebase: getDoc,
      onSnapshotFirebase: onSnapshot, 
      updateDocFirebase: updateDoc, 
      collectionFirebase: collection,
      addDocFirebase: addDoc,

      id_chat:0,
      flagNotif: false,
    };
  },

  mounted() {

  },
  created() {

  },
  methods: {
    async sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  },
    goto: function (comp, p) {
      if (typeof p != "undefined") {
        this.params = p;
      }

      this.activeRoute = markRaw(routeComponent[comp]);
      sessionStorage.setItem("page", comp);
    },
    
    actionModal: function(modal, actFor){
      const modalInstance = Modal.getOrCreateInstance(document.getElementById(modal));
      if(actFor == 'show') modalInstance.show();
      if(actFor == 'hide') modalInstance.hide();
    }

  },
};
</script>

<style scoped>
.title {
  margin: 0;
  padding: 0px;
  font-size: 16px;
  color: #ffffff;
}

.my-notification {
  margin: 0 5px 5px;
  padding: 10px;
  font-size: 15px;
  color: #ffffff;

  background: #44a4fc;
  border-left: 5px solid #187fe7;

  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }
}
</style>
