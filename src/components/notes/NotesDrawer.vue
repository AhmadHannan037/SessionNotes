<!-- 
System: Session Notes
Organization: XYZ
Developer:Ahmad Hanan
Date: 04/13/22
Purpose: This component display Notes drawer to user and contain notes display and input
-->
<template>
  <v-navigation-drawer width="300" v-model="drawer" app right>
    <v-card class="overflow-hidden" flat>
      <!-- Title Bar -->
      <v-sheet color="white" elevation="1" height="50">
        <v-card-title class="body-2"
          >Add Session Notes<v-spacer />
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                @click="closeDrawer"
                color="black"
                >mdi-arrow-right-circle</v-icon
              >
            </template>
            <span>Close Drawer</span>
          </v-tooltip></v-card-title
        ></v-sheet
      >
      <!-- Area to display notes -->
      <v-card-text id="note-area" class="notes-disp-area overflow-y-auto">
        <v-list>
          <p class="m-0" v-for="(note, index) in getNotes" :key="index">
            {{ note }}
          </p>
        </v-list>
      </v-card-text>
      <!-- Input field to enter notes -->
      <v-card-actions>
        <v-footer padless fixed>
          <v-textarea
            name="note-input"
            outlined
            append-icon="mdi-send"
            autocomplete
            autofocus
            auto-grow
            dense
            flat
            placeholder="Enter your note here"
            rows="2"
            class="note-input"
            background-color="#F6F6F6"
            v-model.trim="note"
            @click:append="addNote"
            @keypress.prevent.enter="addNote"
            @keypress="addShorthandNote"
          ></v-textarea>
          <div class="d-flex justify-start shorthand">
            <ShorthandMenu />
          </div>
        </v-footer>
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import ShorthandMenu from "./shorthand/ShorthandMenu.vue";
import { mapGetters } from "vuex";
export default {
  components: { ShorthandMenu },

  props: ["drawer"],
  data: () => ({
    note: null,
  }),
  watch: {
    /**
     * This watcher watches for dialog and emit to parent as soon as dialog closed.
     *
     * @param {Boolean} value true/false dialog state
     * @return {void}
     */
    drawer(value) {
      if (!value) {
        this.closeDrawer();
      }
    },
    /**
     * This watcher watches for notes array and
     * move scroll to bottom whenver a note is added
     *
     * @param {none}
     * @return {void}
     */
    getNotes() {
      this.scrollBottom();
    },
  },
  computed: {
    ...mapGetters(["getNotes", "getShorthands"]),
  },

  methods: {
    /**
     * This method emit to parent component to close drawer on close arrow click.
     *
     * @param {none}
     * @return {void}
     */
    closeDrawer() {
      this.$emit("update", false);
    },
    /**
     * This method is used to dispatch store action to add notes
     *
     * @param {none}
     * @return {void}
     */
    addNote() {
      //if note is empty return
      if (this.note == "" || this.note == null) {
        return;
      } else {
        this.$store.dispatch("addNote", this.note);
        //clear input field
        this.note = "";
      }
    },
    /**
     * This method is used to listen key on input fields and
     * add note base on the shortcut keys
     *
     * @param {Event} event
     * @return {void}
     */
    addShorthandNote(event) {
      //if shift
      if (event.shiftKey) {
        event.preventDefault();
        //check other key exist in our shorthands shortcut
        let shortcutExist = this.getShorthands.find(
          (shorthand) => shorthand.key == event.key.toLowerCase()
        );
        //if exist add note
        if (shortcutExist) {
          this.$store.dispatch("addNote", shortcutExist.name);
        }
      }
    },
    /**
     * This method is used to scroll to bottom whenver a new note is added
     *
     * @param {none}
     * @return {void}
     */
    scrollBottom() {
      var noteContainer = document.getElementById("note-area");
      noteContainer.scrollTop = noteContainer.scrollHeight;
    },
  },
};
</script>

<style scoped>
.note-input {
  max-height: 100px;
  height: 100px;
  overflow-y: auto;
  margin-bottom: 20px;
}
.shorthand {
  background: #d1d1d1;
  max-height: 48px;
  height: 48px;
  width: 100%;
  position: fixed;
  bottom: 0px;
}
.notes-disp-area {
  height: calc(100vh - 150px);
}
</style>
