<!-- 
System: Session Notes
Organization: XYZ
Developer:Ahmad Hanan
Date: 04/13/22
Purpose: This component display confirmation dialog for deletion of shorthand
-->
<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class=""> Delete Shorthand </v-card-title>
      <v-divider />

      <v-card-text>
        Are you sure you want to delete this shorthand?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="cancelDialog"> Cancel </v-btn>

        <v-btn color="red" class="white--text" @click="deleteShorthand">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog", "index"],
  watch: {
    /**
     * This watcher watches for dialog and emit to parent as soon as dialog closed.
     *
     * @param {Boolean} value true/false dialog state
     * @return {void}
     */
    dialog(value) {
      if (!value) {
        this.cancelDialog();
      }
    },
  },
  methods: {
    /**
     * This method emit to parent component to close dialog on cancel click.
     *
     * @param {none}
     * @return {void}
     */
    cancelDialog() {
      this.$emit("cancel", false);
    },
    /**
     * This method dispatch store action which will delete the shorthand with given index
     *
     * @param {none}
     * @return {void}
     */
    deleteShorthand() {
      this.$store.dispatch("deleteShorthand", this.index);
      this.cancelDialog();
    },
  },
};
</script>

<style></style>
