<template>
  <div class="col2 text-center">
    <div v-if="currentList.date">
      <div id="toolbar">
        <section>
          <input @keyup="updateTitle" v-model="currentList.title" />
          <span class="button" @click="deleteList">&times;</span>
        </section>
        <section>
          <input placeholder="Label" v-model="label" />
          <input placeholder="Value" v-model="value" />
          <span class="button" @click="addValue(value, label)">Add</span>
        </section>
      </div>
      <section class="item" v-for="item in this.currentList.content.items" :key="item.id">
        <Label v-bind:label="item.label" @update="updateLabel($event, item)"></Label>
        <Value v-bind:value="item.value" @update="updateValue($event, item)"></Value>
        <span class="button" @click="deleteItem(item.id)">&times;</span>
      </section>
      <p class="large">
        The total is:
        <strong
          v-bind:class="{success:currentList.content.total.substring(0,1)=='+',error:currentList.content.total.substring(0,1)=='-'}"
        >{{ currentList.content.total.substring(0,1) }}£{{ currentList.content.total.substring(1) }}</strong>
      </p>
    </div>
    <p v-else>No list selected.</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { db, auth } from "../firebaseConfig";
import Value from "@/components/Value"
import Label from "@/components/Label"

export default {
  components: { Value, Label },
  computed: mapState(['currentList', 'toDelete']),
  data: function () { return { label: undefined, value: undefined } },
  methods: {
    updateTitle: function () {
      db.collection(auth.currentUser.uid).doc(this.currentList.id).update({ title: this.currentList.title })
    },
    updateValue: function (value, item) {
        value = value.replace('+', '')
        let stringvalue;
        if (value.substring(0, 1) != "-") {
          stringvalue = "+" + value
        } else {
          stringvalue = "" + value
        }
        item.value = stringvalue
        let total = 0;
        for (let item of this.currentList.content.items) {
          total += Number(item.value) * 100
        }
        total = total / 100
        let sign;
        if (String(total).substring(0, 1) != "-") {
          sign = "+"
        } else {
          sign = ""
        }
        this.currentList.content.total = sign + total
        db.collection(auth.currentUser.uid).doc(this.currentList.id).update({ content: this.currentList.content })
    },
    updateLabel: function (label, item) {
        item.label = label
        db.collection(auth.currentUser.uid).doc(this.currentList.id).update({ content: this.currentList.content })
    },
    deleteList: function () {
      db.collection(auth.currentUser.uid).doc(this.currentList.id).delete().then(() => {
        this.currentList.content = { items: [], total: "" }
        this.$store.dispatch('clearList')
      })
    },
    addValue: function (value, label) {
      if (value && label) {
        value = value.replace('+', '')
        let stringvalue;
        if (value.substring(0, 1) != "-") {
          stringvalue = "+" + value
        } else {
          stringvalue = "" + value
        }
        if (!this.currentList.content.id) { this.currentList.content.id = 0 }
        this.currentList.content.items.push({ value: stringvalue, label, id: this.currentList.content.id += 1 });
        let total = 0;
        for (let item of this.currentList.content.items) {
          total += Number(item.value) * 100
        }
        total = total / 100
        let sign;
        if (String(total).substring(0, 1) != "-") {
          sign = "+"
        } else {
          sign = ""
        }
        this.currentList.content.total = sign + total
        db.collection(auth.currentUser.uid).doc(this.currentList.id).update({ content: this.currentList.content })
        this.value = undefined;
        this.label = undefined;
      }
    },
    deleteItem: function (id) {
      this.currentList.content.items = this.currentList.content.items.filter((value) => value.id != id)
      let total = 0;
      for (let item of this.currentList.content.items) {
        total += Number(item.value) * 100
      }
      total = total / 100
      let sign;
      if (String(total).substring(0, 1) != "-") {
        sign = "+"
      } else {
        sign = ""
      }
      this.currentList.content.total = sign + total
      db.collection(auth.currentUser.uid).doc(this.currentList.id).update({ content: this.currentList.content })
    }
  }
}
</script>
