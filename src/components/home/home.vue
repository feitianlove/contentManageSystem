<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8">
          <img alt src="../../assets/images/logo.png" />
        </el-col>
        <el-col :span="8">
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col :span="8" class="col_r">
          一个想做前端的运维工程师
          <a @click.prevent="logout" href="#">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-col :span="24">
          <el-menu
            :default-active="this.$route.path"
            :router="true"
            active-text-color="#ffd04b"
            background-color="#545c64"
            text-color="#fff"
          >
            <el-submenu :index="item.id+''" :key="item.id" v-for="(item) in meunData">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.authName}}</span>
              </template>
              <el-menu-item-group :key="item2.id" v-for="item2 in item.children">
                <el-menu-item :index="'/'+item2.path">{{ item2.authName}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      meunData: []
    }
  },
  created () {
    this.loadMenu()
  },
  methods: {
    logout () {
      this.$confirm('亲，确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          localStorage.removeItem('token')
          this.$message({
            type: 'success',
            message: '退出成功'
          })
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出',
            duration: 800
          })
        })
    },
    async loadMenu () {
      let res = await this.$axios.get('menus')
      console.log(res)
      this.meunData = res.data.data
    }
  }
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c1cd;
  padding: 0;
  h1 {
    text-align: center;
    line-height: 60px;
  }
  .col_r {
    text-align: right;
    line-height: 60px;
    color: green;
  }
}
.el-aside {
  height: 100%;
  background-color: rgb(84, 92, 100);
}
.el-main {
  background: #eaeef1;
}
</style>
