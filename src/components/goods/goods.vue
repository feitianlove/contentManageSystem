<template>
  <div>
    <el-button @click="goAddGoods" plain type="success">添加商品</el-button>
    <el-table :data="goodsTableData" style="width: 100%">
      <el-table-column :index="indexMethod" type="index"></el-table-column>
      <el-table-column label="商品ID" prop="goods_id" width="180"></el-table-column>
      <el-table-column label="商品名称" prop="goods_name" width="180"></el-table-column>
      <el-table-column label="商品价值" prop="goods_price" width="180"></el-table-column>
      <el-table-column label="商品数量" prop="goods_number"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.add_time | myDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodsTableData: []
    }
  },
  created () {
    this.loadGoods()
  },
  methods: {
    indexMethod (index) {
      return index + 1
    },
    async loadGoods () {
      let res = await this.$axios.get('goods', {
        params: {
          pagenum: 1,
          pagesize: 20
        }
      })
      console.log(res)
      this.goodsTableData = res.data.data.goods
    },
    goAddGoods () {
      this.$router.push('/addgoods')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
