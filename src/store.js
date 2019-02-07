import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig')

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    currentUser: null,
    currentNote: null,
    notes: []
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setCurrentNote(state, val) {
      state.currentNote = val
    }
  },
  actions: {
    clearData({ commit }) {
      commit('setCurrentUser', null)
    }
  }
})

fb.auth.onAuthStateChanged(user => {
  if (user) {
      store.commit('setCurrentUser', user)
  }
})

export default store
