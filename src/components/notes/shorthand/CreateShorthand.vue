<!-- 
System: Session Notes
Organization: XYZ
Developer:Ahmad Hanan
Date: 04/13/22
Purpose: This component display create shorthand menu to user so that user can create shorthand
-->
<template>
  <v-form v-model="valid" @submit.prevent="createShorthand">
    <v-list>
      <!-- Title Bar -->
      <v-sheet color="white" elevation="1" height="35" class="mb-4">
        <p class="body-2 text-center my-2">Update Shorthand</p></v-sheet
      >
      <!-- Name Field -->
      <v-list-item>
        <v-text-field
          label="Name"
          outlined
          flat
          dense
          :rules="nameRules"
          v-model="name"
        ></v-text-field>
      </v-list-item>
      <!-- Description Field -->
      <v-list-item>
        <v-textarea
          v-model="description"
          outlined
          label="Description"
          rows="3"
          dense
          :rules="descriptionRules"
          no-resize
        ></v-textarea>
      </v-list-item>
      <!-- Shortcut Field -->
      <v-list-item>
        <v-chip class="p-0 mt-n5 mr-2" label>
          <span><strong>Shift + </strong></span></v-chip
        >

        <v-text-field
          outlined
          label="Shortcut"
          dense
          v-model="shortcutKey"
          :rules="keyRules.concat(alreadyExist)"
        ></v-text-field>
      </v-list-item>
      <v-divider />
      <!-- Action Buttons -->
      <v-list-item>
        <v-spacer />
        <v-btn @click="cancelMenu" text class="mr-2">Cancel</v-btn>
        <v-btn
          type="submit"
          :disabled="!valid"
          color="#35CFFF"
          class="white--text"
          elevation="0"
          >Create</v-btn
        >
      </v-list-item>
    </v-list>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
import rules from "../../../constansts/const";
export default {
  data: () => ({
    name: null,
    description: null,
    shortcutKey: null,
    valid: false,
    nameRules: rules.nameRules,
    descriptionRules: rules.descriptionRules,
    keyRules: rules.keyRules,
  }),
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
     * This method make shorthand object and dispatch store action which create new shorthand
     *
     * @param {none}
     * @return {void}
     */
    createShorthand() {
      //make shorthand
      let shorthand = {
        name: this.name,
        description: this.description,
        key: this.shortcutKey,
      };
      //dispatch store action
      this.$store.dispatch("createShorthand", shorthand);
      //close menu
      this.cancelMenu();
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
  },
};
</script>

<style></style>
