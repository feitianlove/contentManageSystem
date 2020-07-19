<template>
  <div>
    <el-steps :active="2">
      <el-step description="基本信息" title="第一步"></el-step>
      <el-step description="商品图片" title="第二步"></el-step>
      <el-step description="商品内容" title="第三步"></el-step>
    </el-steps>
    <el-tabs @tab-click="handleClick" tab-position="left" v-model="activeName">
      <el-tab-pane label="基本信息" name="first">基本信息</el-tab-pane>
      <el-tab-pane label="商品图片" name="second">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容" name="third">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'second'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
