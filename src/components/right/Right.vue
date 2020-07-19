<template>
  <!-- 权限列表 -->
  <el-table :data="rightsData" highlight-current-row ref="singleTable" style="width: 100%">
    <el-table-column :index="caculateIndex" label="#" type="index"></el-table-column>
    <el-table-column label="权限名称" property="authName"></el-table-column>
    <el-table-column label="路径" property="path"></el-table-column>
    <el-table-column label="等级" property="level">
      <template slot-scope="scope">
        <div v-if="scope.row.level == 0">一级</div>
        <div v-else-if="scope.row.level == 1">二级</div>
        <div v-else>三级</div>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分配权限-->
</template>
<script>
export default {
  data () {
    return {
      rightsData: [
        {
          authName: '商品管理',
          path: 'goods',
          level: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  mounted () {
    this.loadRightsData()
  },
  methods: {
    async loadRightsData () {
      let res = await this.$axios.get('rights/list')
      this.rightsData = res.data.data
    },
    caculateIndex (index) {
      return index
    }
  }
}
</script>
<style scoped>
</style>
