<template>
    <div id="home">
        <section>
            <Sidebar v-bind:notes="notes" v-bind:currentNote="currentNote"></Sidebar>
            <Note></Note>
        </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Sidebar from '@/components/Sidebar'
import Note from '@/components/Note'

export default {
  components: { Sidebar, Note },
  computed: mapState(['notes', 'currentNote'])
}
</script>