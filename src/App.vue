<template>
  <Head />
  <router-view />
  <FooterComponent />
</template>

<script lang="ts">
import Head from "./components/Head.vue";
import FooterComponent from "./components/FooterComponent.vue"

export default {
  components: {
    Head,
    FooterComponent,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
