<template>
    <div id="home">
        <section>
            <Sidebar v-bind:lists="lists" v-bind:currentList="currentList"></Sidebar>
            <List></List>
        </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Sidebar from '@/components/Sidebar'
import List from '@/components/List'

export default {
  components: { Sidebar, List },
  computed: mapState(['lists', 'currentList'])
}
</script>