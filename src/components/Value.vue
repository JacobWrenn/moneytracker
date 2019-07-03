<template>
  <strong
    @click="showedit()"
    v-if="!edit"
    v-bind:class="{success:value.substring(0,1)=='+',error:value.substring(0,1)=='-',flexfill:true}"
  >{{ value.substring(0,1) }}£{{ value.substring(1) }}</strong>
  <input class="valueinput" ref="textfield" @focusout="edit=false" v-else v-model="editvalue" @change="update()" />
</template>

<script>
export default {
  props: ['value'],
  data: function () {
    return { edit: false, editvalue: this.value }
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