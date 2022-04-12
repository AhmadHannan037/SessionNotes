/* 
System: Session Notes
Organization: XYZ
Developer:Ahmad Hanan
Date: 04/13/22
Purpose: This file contain all the notes related functionality, reffered as NotesStore
*/
const state = () => ({
  notes: [],
});

// getters
const getters = {
  /**
   * This getter return all notes from note states
   *
   * @param {Array} state
   * @return {Array} Notes
   */
  getNotes: (state) => {
    return state.notes;
  },
};

// actions
const actions = {
  /**
   * This action call mutation to update state with new data
   *
   * @param {Object,Object} Note object to add
   * @return {void}
   */
  addNote(context, note) {
    context.commit("ADD_NOTE", note);
  },
};

// mutations
const mutations = {
  /**
   * This mutation push new note to array
   *
   * @param {Object,Object} payload object to ad
   * @return {void}
   */
  ADD_NOTE(state, payload) {
    state.notes.push(payload);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
