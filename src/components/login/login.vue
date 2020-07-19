<template>
  <el-row align="middle" justify="center" type="flex">
    <el-col :span="8">
      <el-form :model="ruleForm" :rules="rules" class="demo-ruleForm" ref="ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login()" type="primary">登陆</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    login () {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          this.$message.error('格式不正确')
        } else {
          axios
            .post('http://localhost:8888/api/private/v1/login/', this.ruleForm)
            .then(data => {
              console.log(data)
              if (data.data.meta.status === 200) {
                localStorage.setItem('token', data.data.data.token)
                this.$router.push('/users')
              } else {
                this.$message.error(data.data.meta.msg)
              }
            })
        }
      })
    }
  }
}
</script>
<style scoped>
.el-row {
  height: 100%;
  background-color: #2d434c;
}
.el-col {
  padding: 60px;
  background-color: #fff;
  border-radius: 10px;
}
</style>
