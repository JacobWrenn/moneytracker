<template>
    <div class="col1">
        <div v-for="note in notes" :key="note.id">
            <p class="button" @click="showNote(note)">{{ note.title }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['notes'],
    methods: {
        showNote: function(note) {
            this.$store.commit('setCurrentNote', note)
        }
    }
}
</script>