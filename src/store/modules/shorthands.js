/* 
System: Session Notes
Organization: XYZ
Developer:Ahmad Hanan
Date: 04/13/22
Purpose: This file contain all the shorthands related functionality, reffered as ShorthandStore
*/
const state = () => ({
  shorthands: [
    { name: "+", description: "Successful", key: "a" },
    { name: "-", description: "Unsuccessful", key: "s" },
    { name: "IWP", description: "Initial Word Position", key: "k" },
  ],
});

// getters
const getters = {
  /**
   * This getter return all shorthands from shorthand state
   *
   * @param {Array} state
   * @return {Array} shorthands
   */
  getShorthands: (state) => {
    return state.shorthands;
  },
};

// actions
const actions = {
  /**
   * This action call mutation to create new shorthand with new data
   *
   * @param {Object,Object} shorthand object to add
   * @return {void}
   */
  createShorthand(context, shorthand) {
    context.commit("CREATE_SHORTHAND", shorthand);
  },
  /**
   * This action call mutation to update new shorthand with new data
   *
   * @param {Object,Object} payload object to update
   * @return {void}
   */
  updateShorthand(context, payload) {
    context.commit("UPDATE_SHORTHAND", payload);
  },

  /**
   * This action call mutation to delete shorthand
   *
   * @param {Object,Number} payload index to delete
   * @return {void}
   */
  deleteShorthand(context, payload) {
    context.commit("DELETE_SHORTHAND", payload);
  },
};

// mutations
const mutations = {
  /**
   * This mutation push new shorthand to array
   *
   * @param {Object,Object} payload object to add
   * @return {void}
   */
  CREATE_SHORTHAND(state, payload) {
    state.shorthands.push(payload);
  },
  /**
   * This mutation update new shorthand to array
   *
   * @param {Object,Object} payload object to update
   * @return {void}
   */
  UPDATE_SHORTHAND(state, payload) {
    Object.assign(state.shorthands[payload.index], payload.shorthand);
  },
  /**
   * This mutation delete shorthand
   *
   * @param {Object,index} index to delete
   * @return {void}
   */
  DELETE_SHORTHAND(state, index) {
    state.shorthands.splice(index, 1);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
