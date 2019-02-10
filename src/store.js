import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig')

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentUser: null,
    currentNote: {},
    notes: [],
    toDelete: []
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
    },
    toDelete(state, val) {
      state.toDelete.push(val)
    }
  },
  actions: {
    clearData({ commit }) {
      commit('setCurrentUser', null)
    },
    clearDelete({ state }) {
      state.toDelete = []
    },
    clearNote({ commit }) {
      commit('setCurrentNote', {})
    },
    newNote({ commit }) {
      fb.db.collection(this.state.currentUser.uid).add({
        date: fb.firebase.firestore.FieldValue.serverTimestamp(),
        title: '',
        content: ''
      }).then(doc => {
        doc.get().then(data => {
          let note = { id: doc.id, ...data.data() }
          commit('setCurrentNote', note)
        })
      })
    }
  }
})

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)

    fb.db.collection(user.uid).orderBy('date').onSnapshot(querySnapshot => {
      let notesArray = []

      querySnapshot.forEach(doc => {
        let note = doc.data()
        note.id = doc.id
        notesArray.unshift(note)
      })

      store.commit('setNotes', notesArray)
    })
  }
})

export default store
