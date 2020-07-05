<template>

      <div class="dy-panel">
        <div class="content">
          <slot></slot>
        </div>
      </div>
</template>
<script>
  export default {
    name:"DyPanel"
  }
</script>
<style>
  .header-border{
    height: 2px;
    background: #54a7fc
  }
  .dy-panel{
    margin:10px;
    box-sizing: border-box;
    background: white;


  }

</style>
