<template>
  <div class="item">{{value}}</div>
</template>

<script>
export default {
  name: 'Item',
  props: ["value"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item {
  min-width: 50px;
  min-height: 50px;
  border: 1px solid white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
