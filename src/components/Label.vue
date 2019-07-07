<template>
  <p
    @click="showedit()"
    v-if="!edit"
    class="large nomargin"
  >{{ label }}</p>
  <input class="valueinput" ref="textfield" @focusout="edit=false" v-else v-model="editvalue" @change="update()" />
</template>

<script>
export default {
  props: ['label'],
  data: function () {
    return { edit: false, editvalue: this.label }
  },
  methods: {
    update: function () {
      this.$emit('update', this.editvalue)
    },
    showedit: function () {
      this.edit = true;
      this.$nextTick(function () {
        this.$refs.textfield.focus();
      });
    }
  }
}
</script>