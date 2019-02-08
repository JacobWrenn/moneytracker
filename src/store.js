import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig')

Vue.use(Vuex)

const store = new Vuex.Store({
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
    },
    setNotes(state, val) {
      state.notes = val
    }
  },
  actions: {
    clearData({ commit }) {
      commit('setCurrentUser', null)
    },
    clearNote({ commit }) {
      commit('setCurrentNote', null)
    }
  }
})

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)

    fb.db.collection(user.uid).orderBy('date', 'desc').onSnapshot(querySnapshot => {
      let notesArray = []

      querySnapshot.forEach(doc => {
        let note = doc.data()
        note.id = doc.id
        notesArray.push(note)
      })

      store.commit('setNotes', notesArray)
    })
  }
})

export default store
