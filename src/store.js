import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig')

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentUser: null,
    currentList: {},
    lists: []
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setcurrentList(state, val) {
      state.currentList = val
    },
    setLists(state, val) {
      state.lists = val
    }
  },
  actions: {
    clearData({ commit }) {
      commit('setCurrentUser', null)
    },
    clearList({ commit }) {
      commit('setcurrentList', {})
    },
    newList({ commit }) {
      fb.db.collection(this.state.currentUser.uid).add({
        date: fb.firebase.firestore.FieldValue.serverTimestamp(),
        title: '',
        content: { items: [], total: "" }
      }).then(doc => {
        doc.get().then(data => {
          let list = { id: doc.id, ...data.data() }
          commit('setcurrentList', list)
        })
      })
    }
  }
})

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)

    fb.db.collection(user.uid).orderBy('date').onSnapshot(querySnapshot => {
      let listsArray = []

      querySnapshot.forEach(doc => {
        let list = doc.data()
        list.id = doc.id
        listsArray.unshift(list)
      })

      store.commit('setLists', listsArray)
    })
  }
})

export default store
