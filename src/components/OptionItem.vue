<template>
  <label>
    <input type="radio" :value="item.value" :id="item.value" :name="item.name" @change="onChange">
    {{item.value}}
  </label>
</template>

<script>
export default {
  name: 'OptionItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    onClick: {
      type: Function,
      required: true
    }
  },
  methods: {
    onChange(e) {
      const value = e.target.value;
      const key = e.target.name;
      this.onClick({ [key]: value });
    }
  }
}
</script>

<style>
</style>
