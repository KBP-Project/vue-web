<template>
  <div id="container" v-if="isLogin == 1">
    <div id="logo-container">
      <img src="@/assets/img/logo_kbp.png" class="logo" />
    </div>
    <ul>
      <template v-if="menu != null">
        <div v-for="(menu, index) in all_menu" :key="index">
          <div v-if="menu.sub_menu_id == null">
            <li @click="goto(menu.menu)">
              {{ menu.name }}
            </li>
          </div>

          <div v-else>
            <li class="collapsed" data-bs-toggle="collapse" :data-bs-target="`#${menu.sub_menu_id}`">
              {{ menu.name }}
            </li>
            <li class="collapse ms-3 sub-menu" :id="`${menu.sub_menu_id}`">
              <ul>
                <div v-for="(sub_menu, subIndex) in menu.sub_menu" :key="subIndex">
                  <div v-if="sub_menu.sub_menu_id == null">
                    <li @click="goto(sub_menu.menu)">
                      {{ sub_menu.name }}
                    </li>
                  </div>

                  <div v-else>
                    <li class="collapsed" data-bs-toggle="collapse" :data-bs-target="`#${sub_menu.sub_menu_id}`">
                      {{ sub_menu.name }}
                    </li>
                    <li class="collapse ms-3 sub-menu" :id="`${sub_menu.sub_menu_id}`">
                      <ul>
                        <div v-for="(sub_menu2, subIndex2) in sub_menu.sub_menu" :key="subIndex2">
                          <div v-if="sub_menu2.sub_menu_id == null">
                            <li @click="goto(sub_menu2.menu)">
                              {{ sub_menu2.name }}
                            </li>
                          </div>
                        </div>
                      </ul>
                    </li>
                  </div>
                </div>
              </ul>
            </li>
          </div>
        </div>
        <hr />
        <li @click="logout()">Logout</li>
      </template>
    </ul>
  </div>
  <div class="btnCollapse" @click="hideNav()" v-if="isLogin == 1">
    <img src="@/assets/img/burger-menu.png" class="showbtn" />
  </div>
</template>

<script>
import axios from "axios";
import toast from '@/assets/js/toast';

export default {
  // props: {
  // },

  props: {
    menu: {
      default: null,
    },
  },
  mounted() {
    // console.log(this.menu)
  },
  data() {
    return {
      all_menu: [
        // recruitment
        {
          name: "MASTER FAQ",
          menu: "MASTER",
          sub_menu_id: "all-menu-customer-services",
          sub_menu: [
            {
              name: "FAQ",
              menu: "FormFAQ",
              sub_menu_id: null,
              sub_menu: [],
            },
            {
              name: "CHAT",
              menu: "CHAT",
              sub_menu_id: null,
              sub_menu: [],
            },
            {
              name: "PIC",
              menu: "PIC",
              sub_menu_id: null,
              sub_menu: [],
            },
            {
              name: "KATEGORI",
              menu: "KATEGORI",
              sub_menu_id: null,
              sub_menu: [],
            },
            {
              name: "REPORT",
              menu: "REPORT",
              sub_menu_id: null,
              sub_menu: [],
            },
          ]
        },
      ],

      isLogin:
        localStorage.getItem("auth") != null ? 1 : 0,
      activemenu: null,
      showMenu: true,
    };
  },
  methods: {
    goto: function (comp) {
      if (localStorage.getItem("auth") != null) {
        this.$root.goto(comp);
        sessionStorage.setItem("page", comp);
      } else {
        this.$root.goto("LoginView");
      }
    },
    logged(e) {
      console.log(e);
    },

    // hiding sidebar
    hideNav() {
      this.showMenu = !this.showMenu;
      if (this.showMenu) {
        this.openNav();
      } else {
        this.closeNav();
      }
    },

    openNav() {
      this.showMenu = true;
      document.getElementById("container").style.marginLeft = "0";
      document.getElementsByClassName("page-container")[0].style.marginLeft = "16em";
      document.getElementsByClassName("page-container")[0].style.width = "calc(100% - 16em)";
      document.getElementsByClassName("btnCollapse")[0].style.left = "15em";
      document.getElementsByClassName("btnCollapse")[0].style.background = "none";
      document.getElementsByClassName("btnCollapse")[0].style.padding = "0";
    },

    closeNav() {
      this.showMenu = false;
      document.getElementById("container").style.marginLeft = "-16.5em";
      document.getElementsByClassName("page-container")[0].style.marginLeft = "0";
      document.getElementsByClassName("page-container")[0].style.width = "100%";
      document.getElementsByClassName("btnCollapse")[0].style.left = "1.2em";
      document.getElementsByClassName("btnCollapse")[0].style.background = "white";
      document.getElementsByClassName("btnCollapse")[0].style.padding = "1em";
    },

    logout() {
      localStorage.clear();
      window.location.reload()
    }
  },
};
</script>

<style scoped>
#container {
  min-width: 15em;
  position: fixed;
  top: 1em;
  left: 1em;
  background-color: var(--vt-color-step-950);
  padding: 1em;
  border-radius: 1em;
  box-shadow: 0 .5em 2em .5em var(--vt-color-step-1000);
  height: calc(100% - 2em);
  overflow: auto;
  z-index: 99;
  transition: 0.5s;
}

#container>* {
  margin: 0.3em 0;
}

#container #logo-container {
  text-align: center;
}

#container #logo-container img {
  width: 13em;
  height: auto;
}

#container ul {
  margin: 0;
  padding: 0;
}

#container ul li {
  list-style: none;
  margin: 0.2em 0;
  padding: 0.2em 0.4em;
  border-radius: 0 1em 1em 0;
  font-size: 19px;
  cursor: pointer;
  background: linear-gradient(130deg, #005ca1 60%, #00135d 100%);
  color: var(--vt-color-step-950);
  text-transform: uppercase;
  font-weight: 400;
}

#container ul li:hover {
  color: var(--vt-color-step-400);
  background-color: var(--vt-color-step-950);
}

#container ul #main-menu {
  background: none;
  box-shadow: none;
}

#main-menu ul {
  margin-top: -0.4em;
}

#main-menu ul li {
  background: linear-gradient(130deg, #739072 76%, #add6b1 100%);
  border-radius: 0 1em 1em 1em;
  padding-left: 1em;
  font-size: 12px;
}

#container ul #submenu {
  background: none;
  box-shadow: none;
}

#submenu ul {
  margin-top: -0.4em;
}

#submenu ul li {
  background: linear-gradient(130deg, #739072 76%, #add6b1 100%);
  border-radius: 0 1em 1em 1em;
  padding-left: 1em;
  font-size: 14px;
}

.logo {
  padding: 20px 0;

}

.btnCollapse {
  border-radius: 1em;
  cursor: pointer;
  position: fixed;
  top: 2em;
  left: 15em;
  color: white;
  font-size: 14px;
  z-index: 100;
  transition: 0.5s;
}

.btnCollapse img {
  max-width: 30px;
  max-height: 30px;
}

#container ul .main-menu {
  background: none;
  box-shadow: none;
}

.main-menu ul {
  margin-top: -0.4em;
}

.main-menu ul li {
  background: linear-gradient(130deg, #739072 76%, #add6b1 100%);
  border-radius: 0 1em 1em 1em;
  padding-left: 1em;
  font-size: 12px;
}

#container ul .sub-menu {
  background: none;
  box-shadow: none;
}

#container ul .sub-menu ul {
  margin-top: -0.4em;
}

#container ul .sub-menu ul li {
  /* background: linear-gradient(130deg, #739072 76%, #add6b1 100%); */
  border-radius: 0 1em 1em 1em;
  padding-left: 1em;
  font-size: 15px;
}
</style>
