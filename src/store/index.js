import Vue from 'vue'
import Vuex from 'vuex'
import notes from './modules/notes'
import shorthands from './modules/shorthands.js'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    notes,
    shorthands
  },
  
})