<template>
  <div>


  <div class="block" style="text-align: right;margin-top: 10px">
    <el-pagination
      background="background"
      @current-change="onCurrentChange"
      @size-change="onPageSizeChange"
      :current-page.sync="computedPageNumber"
      :page-sizes="[5, 10, 20, 50]"
      :page-size.sync="computedPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>
<script>
     export default {
     name: 'DyPagination',
       methods:{
         onCurrentChange(_currentPage){
           this.currentPage=_currentPage;
           this.$emit("click")
         },
         onPageSizeChange(_pageSize)
         {
           this.pageSize=_pageSize;
           this.$emit("click");
         }
       },
       created(){

       },
       computed: {
         computedPageNumber: {
           get() {
             return this.currentPage
           },
           set(val) {
             this.$emit('update:currentPage', val)
           }
         },
         computedPageSize: {
           get() {
             return this.pageSize
           },
           set(val) {
             this.$emit('update:pageSize', val)
           }
         }
       },
      props:{
        currentPage:{
            type:Number,
            default:1,
        },
        pageSize:{
          type:Number,
          default: 10
        },
        total:{
          type:Number,
          default:0
        },
      }
     }
</script>
