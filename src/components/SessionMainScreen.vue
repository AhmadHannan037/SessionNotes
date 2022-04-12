<!-- 
System: Session Notes
Organization: XYZ
Developer:Ahmad Hanan
Date: 04/13/22
Purpose: This component display the main homepage to user, a live session page
-->
<template>
  <div>
    <v-footer padless fixed>
      <v-card
        flat
        tile
        :width="drawer ? 'calc(100vw - 300px)' : '100%'"
        class="black lighten-1 d-flex justify-space-between"
      >
        <v-card-text></v-card-text>
        <v-card-text class="d-flex justify-center">
          <v-btn
            v-for="icon in icons"
            :color="icon.color"
            :key="icon.text"
            rounded
            class="mx-2 white--text"
          >
            <v-icon size="24px">
              {{ icon.text }}
            </v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text
          :class="{ 'sm-btn': $vuetify.breakpoint.xs }"
          class="d-flex justify-end"
        >
          <v-btn text class="white--text">
            <v-img width="24px" :src="require('@/assets/icons/Member.png')">
            </v-img>
          </v-btn>
           <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" @click="drawer = !drawer" text class="white--text">
            <v-img
              width="24px"
              :src="require('@/assets/icons/Create Document.png')"
            >
            </v-img>

          </v-btn>
          </template>
          <span>Add Notes</span>
           </v-tooltip>
        </v-card-text>
      </v-card>
    </v-footer>
    <NotesDrawer :drawer.sync="drawer" @update="handleNoteDrawer" />
  </div>
</template>

<script>
import NotesDrawer from "./notes/NotesDrawer.vue";
export default {
  name: "SessionMainScreen",
  components: {
    NotesDrawer,
  },
  data: () => ({
    icons: [
      { text: "mdi-microphone", color: "grey" },
      { text: "mdi-phone-hangup ", color: "red" },
      { text: "mdi-video", color: "grey" },
    ],
    drawer: false,
  }),
  methods: {
    /**
     * This method used to decide note drawer state hide/visible
     *
     * @param {Boolean} value true/false dialog state
     * @return {void}
     */
    handleNoteDrawer(value) {
      this.drawer = value;
    },
  },
};
</script>
<style scoped>
.sm-btn {
  position: absolute;
  bottom: 40px;
}
</style>
