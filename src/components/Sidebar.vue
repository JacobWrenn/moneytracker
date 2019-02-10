<template>
  <div class="col1">
    <div v-for="note in notes" :key="note.id">
      <p class="button" @click="showNote(note)" v-bind:class="{'active':isActive(note.id)}">{{ note.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['notes', 'currentNote'],
  methods: {
    showNote: function (note) {
      this.$store.commit('setCurrentNote', note)
    },
    isActive: function (id) {
        return id === this.currentNote.id
    }
  }
}
</script>