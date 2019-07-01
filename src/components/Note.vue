<template>
  <div class="col2 text-center">
    <div v-if="currentNote.date">
      <section>
        <input @keyup="updateTitle" v-model="currentNote.title">
        <span class="button" @click="deleteNote">&times;</span>
      </section>

    </div>
    <p v-else>No note selected.</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { db, auth } from "../firebaseConfig";

export default {
  computed: mapState(['currentNote', 'toDelete']),
  methods: {
    updateNote: function () {
      db.collection(auth.currentUser.uid).doc(this.currentNote.id).update({ content: this.currentNote.content })
    },
    updateTitle: function () {
      db.collection(auth.currentUser.uid).doc(this.currentNote.id).update({ title: this.currentNote.title })
    },
    deleteNote: function () {
      db.collection(auth.currentUser.uid).doc(this.currentNote.id).delete().then(() => {
        document.querySelector('trix-editor').value = ''
        this.currentNote.content=''
        this.$store.dispatch('clearNote')
      })
    }
  }
}
</script>
