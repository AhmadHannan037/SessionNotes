<!-- 
System: Session Notes
Organization: XYZ
Developer:Ahmad Hanan
Date: 04/13/22
Purpose: This component display confirmation dialog for deletion of shorthand
-->
<template>
  <v-form @submit.prevent="updateShorthand" v-model="valid">
    <v-list>
      <!-- Title bar -->
      <v-sheet color="white" elevation="1" height="35" class="mb-4">
        <p class="body-2 text-center my-2">Create Shorthand</p></v-sheet
      >

      <!-- Name Field -->
      <v-list-item>
        <v-text-field
          label="Name"
          outlined
          flat
          dense
          v-model="editShorthand.name"
          :rules="nameRules"
        ></v-text-field>
      </v-list-item>
      <!-- Description Field -->
      <v-list-item>
        <v-textarea
          outlined
          label="Description"
          rows="3"
          dense
          no-resize
          v-model="editShorthand.description"
          :rules="descriptionRules"
        ></v-textarea>
      </v-list-item>
      <!-- Shortcut field -->
      <v-list-item>
        <v-chip class="p-0 mt-n5 mr-2" label>
          <span><strong>Shift + </strong></span></v-chip
        >

        <v-text-field
          outlined
          label="Shortcut"
          dense
          v-model="editShorthand.key"
          :rules="keyRules.concat(alreadyExist)"
        ></v-text-field>
      </v-list-item>
      <v-divider />
      <!-- Action buttons -->
      <v-list-item>
        <v-spacer />
        <v-btn @click="cancelMenu" text class="mr-2">Cancel</v-btn>
        <v-btn
          type="submit"
          :disabled="!valid"
          color="#35CFFF"
          class="white--text"
          elevation="0"
          >Update</v-btn
        >
      </v-list-item>
    </v-list>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
import rules from "../../../constansts/const";
export default {
  props: ["shorthand", "index"],
  data: () => ({
    name: null,
    description: null,
    shortcutKey: null,
    valid: false,
    nameRules: rules.nameRules,
    descriptionRules: rules.descriptionRules,
    keyRules: rules.keyRules,
    editShorthand: {},
  }),
  mounted() {
    //make new object contain already filled data for edit
    this.editShorthand = JSON.parse(JSON.stringify(this.shorthand));
  },
  computed: {
    ...mapGetters(["getShorthands"]),
  },
  methods: {
    /**
     * This method emit to parent component to close menu on cancel click.
     *
     * @param {none}
     * @return {void}
     */
    cancelMenu() {
      this.$emit("cancel", false);
    },
    /**
     * This method check wether the shorcut key already exist or not
     *
     * @param {String} value of the key
     * @return {String,Boolean}
     */
    alreadyExist(value) {
      let exist = this.getShorthands.find(
        (shorthand) => shorthand.key == value
      );
      if (exist) {
        return "Key already exist";
      } else {
        return true;
      }
    },

    /**
     * This method make shorthand object and dispatch
     * store action which will update shorthand on given index
     *
     * @param {none}
     * @return {void}
     */
    updateShorthand() {
      //make payload
      let payload = {
        shorthand: this.editShorthand,
        index: this.index,
      };
      //dispatch store action
      this.$store.dispatch("updateShorthand", payload);
      //close menu
      this.cancelMenu();
    },
  },
};
</script>

<style></style>
