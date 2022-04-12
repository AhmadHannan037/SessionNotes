<!-- 
System: Session Notes
Organization: XYZ
Developer:Ahmad Hanan
Date: 04/13/22
Purpose: This component display Shorthand menu to user
-->
<template>
  <v-menu min-width="250" :close-on-content-click="false" top offset-y>
    <template v-slot:activator="{ on, attrs }">
      <!-- Icon used to open menu -->
      <v-btn v-bind="attrs" v-on="on" icon class="my-auto">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-img
              v-bind="attrs"
              v-on="on"
              width="8px"
              height="22px"
              :src="require('@/assets/icons/Lightning Bolt.png')"
            ></v-img
          ></template>
          <span>Shorthands</span>
        </v-tooltip>
      </v-btn>
    </template>
    <!-- Simple Menu -->
    <v-list v-if="menu">
      <!-- Title Bar -->
      <v-sheet color="white" elevation="1" height="35">
        <p class="body-2 text-center my-2">Notes Shorthand</p></v-sheet
      >
      <!-- Search Bar -->
      <v-list-item>
        <v-text-field
          outlined
          label="Search any shorthand"
          prepend-inner-icon="mdi-magnify"
          dense
          class="mt-2"
          v-model="searchShorthand"
        ></v-text-field>
      </v-list-item>
      <div class="shorthand-list">
        <v-list-item
          v-for="(shorthand, index) in filterShortHands"
          :key="index"
        >
          <v-list-item-content
            class="pointer"
            @click="addShorthandNote(shorthand.name)"
          >
            <v-list-item-title class="text-truncate s-description">{{
              shorthand.name
            }}</v-list-item-title>
            <v-list-item-subtitle class="text-truncate s-description"
              >{{ shorthand.description }}
              <v-chip x-small class="shorthand-key p-0 m-0" label>
                <span
                  ><strong>Shift + {{ shorthand.key }}</strong></span
                ></v-chip
              >
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <div class="d-flex">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    @click="showEditMenu(shorthand, index)"
                    x-small
                    icon
                  >
                    <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Update Shorthand</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    @click="showDeleteDialog(index)"
                    x-small
                    class="ml-2"
                    icon
                  >
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete Shorthand</span>
              </v-tooltip>
            </div>
          </v-list-item-action>
        </v-list-item>
      </div>
      <v-list-item v-if="filterShortHands.length == 0 && this.searchShorthand">
        <p>No Resuts Found</p>
      </v-list-item>
      <!-- Create Shorthand button -->
      <v-btn
        text
        class="black--text mb-n2 mt-2 create-shorthand"
        color="#EEEEEE"
        block
        @click="showCreateMenu"
        >Create Shorthand</v-btn
      >
    </v-list>

    <CreateShorthand v-if="createMenu" @cancel="hideCreateMenu" />
    <EditShorthand
      :shorthand="shorthand"
      :index="index"
      v-if="editMenu"
      @cancel="hideEditMenu"
    />
    <DeleteShorthand
      :index="index"
      :dialog.sync="deleteDialog"
      @cancel="hideDeleteDialog"
    />
  </v-menu>
</template>

<script>
import CreateShorthand from "./CreateShorthand.vue";
import DeleteShorthand from "./DeleteShorthand.vue";
import EditShorthand from "./EditShorthand.vue";
import { mapGetters } from "vuex";
export default {
  components: { CreateShorthand, EditShorthand, DeleteShorthand },
  data: () => ({
    shorthand: null,
    menu: true,
    createMenu: false,
    editMenu: false,
    deleteDialog: false,
    shorthandId: null,
    searchShorthand: null,
    index: null,
  }),
  computed: {
    ...mapGetters(["getShorthands"]),

    /**
     * This computed property return shorthands with search text included otherwise all shorthands
     *
     * @param {none}
     * @return {Array} array of shorthands
     */
    filterShortHands() {
      //if search text exist
      if (this.searchShorthand) {
        //filter all shorthands have search 
        //text in title, description and in key
        return this.getShorthands.filter((shorthand) => {
          return (
            shorthand.title.includes(this.searchShorthand) ||
            shorthand.description.includes(this.searchShorthand) ||
            shorthand.key.includes(this.searchShorthand)
          );
        });
      }
      //return all shorthands
      return this.getShorthands;
    },
  },
  methods: {
    /**
     * This method is used to display create menu to create shorthands
     *
     * @param {none}
     * @return {void}
     */
    showCreateMenu() {
      this.menu = false;
      this.editMenu = false;
      this.createMenu = true;
    },
    /**
     * This method is used to hide create menu used for create shorthands
     *
     * @param {Boolean} value for menu
     * @return {void}
     */
    hideCreateMenu(value) {
      this.createMenu = value;
      this.editMenu = false;
      this.menu = true;
    },
    /**
     * This method is used to display edit menu to edit shorthands
     *
     * @param {Object,Number} shorthand containing shorthand object to update and Index
     * @return {void}
     */
    showEditMenu(shorthand, index) {
      this.editMenu = true;
      this.menu = false;
      this.createMenu = false;
      this.shorthand = shorthand;
      this.index = index;
    },
    /**
     * This method is used to hide edit menu used to edit shorthands
     *
     * @param {String} value to hide edit menu
     * @return {void}
     */
    hideEditMenu(value) {
      this.editMenu = value;
      this.createMenu = false;
      this.menu = true;
    },
    /**
     * This method is used to display delete dialog
     *
     * @param {Number} index of the shorthand to delete
     * @return {void}
     */
    showDeleteDialog(index) {
      this.deleteDialog = true;
      this.index = index;
    },
    /**
     * This method is used to hide delete dialog
     *
     * @param {String} value to hide dialog
     * @return {void}
     */
    hideDeleteDialog(value) {
      this.deleteDialog = value;
    },
    /**
     * This method is used to add notes by clicking on the shorthand property
     *
     * @param {String} note to add
     * @return {void}
     */
    addShorthandNote(note) {
      this.$store.dispatch("addNote", note);
    },
  },
};
</script>

<style scoped>
.shorthand-key {
  position: absolute;
  top: 24px;
  right: 77px;
}
.create-shorthand {
  background: #eeeeee;
}
.s-description {
  max-width: 100px;
}
.shorthand-list {
  height: 200px;
  overflow-y: auto;
}
.pointer * {
  cursor: pointer;
}
</style>
