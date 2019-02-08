<template>
    <div class="col2 text-center">
        <div v-if="note.date">
            <section>
                <input @change="updateTitle" v-model="note.title">
                <span class="button" @click="deleteNote">&times;</span>
            </section>
            <VueTrix v-on:update="updateNote" v-model="note.content"></VueTrix>
        </div>
        <p v-else>No note selected.</p>
    </div>
</template>

<script>
import VueTrix from "vue-trix";
import { db, auth } from "../firebaseConfig";

export default {
    props: ['note'],
    components: { VueTrix },
    methods: {
        updateNote: function() {
            db.collection(auth.currentUser.uid).doc(this.note.id).update({content:this.note.content})
        },
        updateTitle: function() {
            db.collection(auth.currentUser.uid).doc(this.note.id).update({title:this.note.title})
        },
        deleteNote: function() {
            db.collection(auth.currentUser.uid).doc(this.note.id).delete().then(()=>{
                this.$store.dispatch('clearNote')
            })
        }
    },
    watch: {
        note: function() {
            if(document.querySelector('trix-editor'))document.querySelector('trix-editor').value=this.note.content
        }
    }
}
</script>