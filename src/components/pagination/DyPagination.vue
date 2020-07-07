<template>
  <div class="block" style="text-align: right;margin-top: 10px">
    <el-pagination
      background="background"
      :current-page.sync="queryParam.currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size.sync="queryParam.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableTotal">
    </el-pagination>
  </div>
</template>
<script>
     export default {
     name: 'DyPagination',

     }
</script>
