export default {
  data () {
    return {
      userData: [{
        email: '2016-05-02',
        username: '王小虎',
        mobile: '上海市普陀区金沙江路 1518 弄'
      }],
      pageTotle: 0,
      pagenum: 1,
      searchText: '',
      dialogAddUserFormVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        phone: ''
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 5,
          message: '长度在 3 到 5 个字符',
          trigger: 'blur'
        }
        ],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 5,
          max: 10,
          message: '长度在 5 到 10 个字符',
          trigger: 'blur'
        }
        ],
        email: [{
          pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
          message: '格式不正确',
          trigger: 'blur'
        }],
        // 手机
        phone: [{
          pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
          message: '格式不正确',
          trigger: 'blur'
        }]
      },
      dialogEditUserFormVisible: false,
      editUserForm: {},
      dialogAssignRolesVisible: false,
      AssignRolesForm: {
        rolesId: ''
      },
      rolesList: []
    }
  },
  created () {
    this.pagenum = this.$route.params.id
    console.log(this.$route)
    this.loadUsersData(this.pagenum)
  },
  methods: {
    loadUsersData (pagenum = 1, query = '') {
      this.$axios
        .get('users/', {
          params: {
            query,
            pagenum,
            pagesize: 2
          },
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(data => {
          console.log(data)
          this.userData = data.data.data.users
          this.pageTotle = data.data.data.total
          this.pagenum = data.data.data.pagenum
        })
    },
    currentPageChange (pagenum) {
      this.pagenum = pagenum
      this.loadUsersData(pagenum, this.searchText)
      this.$router.push('/users/' + pagenum)
    },
    startSearch () {
      this.loadUsersData(1, this.searchText)
    },
    async addUser () {
      let res = await this.$axios.post('users/', this.addUserForm, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      if (res.data.meta.status === 201) {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.dialogAddUserFormVisible = false
        this.loadUsersData()
        this.$refs.addUserForm.resetFields(this.pagenum)
      } else {
        this.$message.error({
          message: res.data.meta.msg
        })
      }
    },
    async delUser (row) {
      try {
        await this.$confirm('此用户将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        console.log(row)
        let res = await this.$axios.delete(`users/${row.id}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        if (res.data.meta.status === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.loadUsersData(this.pagenum)
        } else {
          this.$message.error({
            message: res.data.meta.msg
          })
        }
      } catch (err) {
        console.log(err)
        this.$message({
          message: '取消删除用户',
          type: 'info'
        })
      }
    },
    async changeUserStatus (id, status) {
      let res = await this.$axios.put(`users/${id}/state/${status}/`, null, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '修改状态成功',
          type: 'info'
        })
      } else {
        this.$message.error({
          message: res.data.meta.msg
        })
      }
    },
    showEditUserDialog (row) {
      this.dialogEditUserFormVisible = true
      let {
        username,
        email,
        phone,
        id
      } = row
      this.editUserForm.username = username
      this.editUserForm.email = email
      this.editUserForm.phone = phone
      this.editUserForm.id = id
    },
    async editUser () {
      let {
        username,
        email,
        mobile,
        id
      } = this.editUserForm
      let res = await this.$axios.put(`users/${id}`, {
        username,
        email,
        mobile
      })
      if (res.data.meta.status === 200) {
        this.$message({
          message: '修改用户成功',
          type: 'info'
        })
        this.loadUsersData(this.pagenum)
        this.dialogEditUserFormVisible = false
      } else {
        this.$message.error({
          message: res.data.meta.msg
        })
      }
    },
    async showDialogAssignRolesVisible (row) {
      this.dialogAssignRolesVisible = true
      let res = await this.$axios.get('roles')
      this.rolesList = res.data.data
      const {
        id,
        username
      } = row
      this.AssignRolesForm.id = id
      this.AssignRolesForm.username = username
      console.log(id)
      this.$nextTick(async () => {
        let res1 = await this.$axios.get(`users/${id}`)
        // // 2. 把三个参数 赋值 给 assignRoleForm对象
        console.log(res1)
        this.AssignRolesForm.rid = res1.data.data.rid === -1 ? '' : res1.data.data.rid
      })
    },
    async AssignRoles () {
      console.log(this.AssignRolesForm)
      let {
        rid,
        id
      } = this.AssignRolesForm
      console.log(`users/${id}/role`)
      console.log(rid)
      let res = await this.$axios.put(`users/${id}/role`, {
        rid
      })
      if (res.data.meta.status === 200) {
        // 1. 关闭对话框
        this.dialogAssignRoleVisible = false
        // 2. 提示
        this.message({
          message: '分配角色成功',
          type: 'success',
          duration: 800
        })
        // 3.刷新
        this.loadUsersData(this.pagenum)
      }
    }
  }
}
