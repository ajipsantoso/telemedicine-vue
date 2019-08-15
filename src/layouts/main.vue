<template>
  <v-layout>
    <left-navbar/>
    <top-navbar/>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    <footer-bar/>
  </v-layout>
</template>
<script>
import LeftNavbar from './left-navbar.vue';
import TopNavbar from './top-navbar.vue';
import FooterBar from './footerBar.vue';

export default {
  components: {
    LeftNavbar,
    TopNavbar,
    FooterBar,
  },
  data: () => ({
  }),
};
</script>
