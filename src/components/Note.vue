<template>
  <div class="col2 text-center">
    <div v-if="currentNote.date">
      <section>
        <input @keyup="updateTitle" v-model="currentNote.title">
        <span class="button" @click="deleteNote">&times;</span>
      </section>
      <section>
        <input placeholder="Label" v-model="label">
        <input placeholder="Value" v-model="value">
        <span class="button" @click="addValue(value, label)">Add</span>
      </section>
      <section class="item" v-for="item in this.currentNote.content.items" :key="item.id">
        <p class="large">{{item.label}}</p>
        <strong v-bind:class="{success:item.value.substring(0,1)=='+',error:item.value.substring(0,1)=='-',flexfill:true}">{{ item.value.substring(0,1) }}£{{ item.value.substring(1) }}</strong>
        <span class="button" @click="deleteItem(item.id)">&times;</span>
      </section>
      <p class="large">The total is: <strong v-bind:class="{success:currentNote.content.total.substring(0,1)=='+',error:currentNote.content.total.substring(0,1)=='-'}">{{ currentNote.content.total.substring(0,1) }}£{{ currentNote.content.total.substring(1) }}</strong></p>
    </div>
    <p v-else>No list selected.</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { db, auth } from "../firebaseConfig";

export default {
  computed: mapState(['currentNote', 'toDelete']),
  data: function () {return {label: undefined, value: undefined}},
  methods: {
    updateTitle: function () {
      db.collection(auth.currentUser.uid).doc(this.currentNote.id).update({ title: this.currentNote.title })
    },
    deleteNote: function () {
      db.collection(auth.currentUser.uid).doc(this.currentNote.id).delete().then(() => {
        this.currentNote.content={ items: [], total: "" }
        this.$store.dispatch('clearNote')
      })
    },
    addValue: function (value, label) {
      if (value && label) {
        let stringvalue;
        if (String(value).substring(0,1) != "-") {
          stringvalue = "+"+value
        } else {
          stringvalue = ""+value
        }
        if(!this.currentNote.content.id){this.currentNote.content.id=0}
        this.currentNote.content.items.push({value: stringvalue, label, id: this.currentNote.content.id+=1});
        let total = 0;
        for (let item of this.currentNote.content.items) {
          total += Number(item.value)
        }
        let sign;
        if (String(total).substring(0,1) != "-") {
          sign = "+"
        } else {
          sign = ""
        }
        this.currentNote.content.total = sign+total
        db.collection(auth.currentUser.uid).doc(this.currentNote.id).update({ content: this.currentNote.content })
        this.value = undefined;
        this.label = undefined;
      }
    },
    deleteItem: function (id) {
      this.currentNote.content.items = this.currentNote.content.items.filter((value)=>value.id!=id)
      let total = 0;
      for (let item of this.currentNote.content.items) {
        total += Number(item.value)
      }
      let sign;
      if (String(total).substring(0,1) != "-") {
        sign = "+"
      } else {
        sign = ""
      }
      this.currentNote.content.total = sign+total
      db.collection(auth.currentUser.uid).doc(this.currentNote.id).update({ content: this.currentNote.content })
    }
  }
}
</script>
