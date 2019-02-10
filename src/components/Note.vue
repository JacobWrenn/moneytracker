<template>
  <div class="col2 text-center">
    <div v-if="currentNote.date">
      <section>
        <input @keyup="updateTitle" v-model="currentNote.title">
        <span class="button" @click="deleteNote">&times;</span>
      </section>
      <VueTrix
        @trix-attachment-add="uploadFile"
        @trix-attachment-remove="deleteFile"
        v-on:update="updateNote"
        v-model="currentNote.content"
      ></VueTrix>
      <div id="hidden-div" class="hidden"></div>
    </div>
    <p v-else>No note selected.</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VueTrix from "vue-trix";
import { db, auth, storage, firebase } from "../firebaseConfig";

export default {
  computed: mapState(['currentNote', 'toDelete']),
  components: { VueTrix },
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
    },
    uploadFile: function (e) {
      if (e.attachment.file) {
        let date = new Date()
        let day = date.toISOString().slice(0, 10)
        let name = date.getTime() + "-" + e.attachment.file.name
        let id = [auth.currentUser.uid, day, name].join("/")
        let upload = storage.ref().child(id).put(e.attachment.file)
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
          e.attachment.setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        })
        upload.then(ref => {
          ref.ref.getDownloadURL().then(url => {
            e.attachment.setAttributes({ url, id })
          })
        })
      }
    },
    deleteFile: function (e) {
      if(e.attachment.attachment.attributes.values.id)this.$store.commit('toDelete', { id: e.attachment.attachment.attributes.values.id, url: e.attachment.attachment.attributes.values.url })
    }
  },
  watch: {
    currentNote: function (newNote, oldNote) {
      if (document.querySelector('trix-editor')) document.querySelector('trix-editor').value = this.currentNote.content
      for (let img of this.toDelete) {
        let trix = document.getElementById('hidden-div')
        trix.innerHTML = oldNote.content
        let notfound = true
        for (let image of trix.getElementsByTagName('img')) {
          if (image.src == img.url) notfound = false
        }
        if (notfound) {
          storage.ref().child(img.id).delete()
        }
      }
      this.$store.dispatch('clearDelete')
    }
  }
}
</script>
