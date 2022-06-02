<template>
  <div class="wrapper relative">
    <div class="wrapper__nav">
      <Nav />
    </div>

    <div class="wrapper__view">
      <MobileNav />
      <router-view></router-view>
    </div>

    <Popup />
  </div>
</template>

<script>
import Nav from "./components/Nav/Nav.vue";
import MobileNav from "./components/MobileNav/MobileNav.vue";
import Popup from "./components/Popup/Popup.vue";

import axios from "axios";

export default {
  name: "App",
  components: {
    Nav,
    MobileNav,
    Popup,
  },
  created() {
    this.$store.dispatch("getAllProjects");
    this.$store.dispatch("getAllRepos");
    this.$store.dispatch("getAllMaterials");
    this.$store.dispatch("getAllTags");
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  // margin: 0;
  padding: 0 1.25rem;
  // width: 100%;
  min-height: 100vh;

  &__nav {
    display: none;
  }

  @include responsive($screen-md) {
    height: 100vh;
    padding: 0;
    grid-template-columns: 300px 1fr;

    &__nav {
      display: block;
    }

    & > *:not(.popup) {
      overflow-y: auto;
    }

    & > .wrapper__view {
      padding: 0 1.25rem;
    }
  }
}
</style>
