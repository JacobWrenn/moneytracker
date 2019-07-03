<template>
  <div class="col1">
    <div v-for="list in lists" :key="list.id">
      <p class="button" @click="showList(list)" v-bind:class="{'active':isActive(list.id)}">{{ list.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['lists', 'currentList'],
  methods: {
    showList: function (list) {
      this.$store.commit('setcurrentList', list)
    },
    isActive: function (id) {
        return id === this.currentList.id
    }
  }
}
</script>