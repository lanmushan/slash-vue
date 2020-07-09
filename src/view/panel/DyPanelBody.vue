<template>
  <div>
    <div class="dy-body" :style="{padding,border}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "DyPanelBody",
  created() {
    console.log(111);
  },
  props: {
    border: {
      type: String,
      default: "1px"
    },
    padding: {
      type: String,
      default: "10px"
    }
  }
};
</script>
<style>
.dy-body {
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
}
</style>
