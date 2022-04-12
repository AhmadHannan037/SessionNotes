<template>
  <v-app>
    <!-- Must have the app property -->
    <!-- <v-app-bar app></v-app-bar> -->

    <v-main class="main-style"> <SessionMainScreen /> </v-main>
  </v-app>
</template>

<script>
import SessionMainScreen from "@/components/SessionMainScreen.vue";
export default {
  name: "App",
  components: {
    SessionMainScreen,
  },
  mounted(){
      document.title = 'Session Notes';
  }
};
</script>
<style scoped>
.main-style {
  background: black;
}
</style>
