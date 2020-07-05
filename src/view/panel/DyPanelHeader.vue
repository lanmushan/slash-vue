<template>
  <div>
    <div class="dy-header">
        {{title}}
    </div>
  </div>
</template>
<script>
  export default {
    name:"DyPanelHeader",
    created(){
      console.log(111);
    },
    props:{
      title:String
    }
  }
</script>
<style>
  .dy-header{
    padding: 10px;
    border-bottom: 1px solid #ebeef5;

  }
</style>
