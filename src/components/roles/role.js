export default {
  data () {
    return {
      rolesData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      rightsData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      dialogAssignRightVisible: false,
      roleId: ''
    }
  },
  mounted () {
    this.loadRolesData()
  },
  methods: {
    async loadRolesData () {
      let res = await this.$axios.get('roles')
      console.log(res)
      this.rolesData = res.data.data
    },
    caculateIndex (index) {
      return index
    },
    async shwoAssignRight (row) {
      this.dialogAssignRightVisible = true
      this.roleId = row.id
      let res = await this.$axios.get('rights/tree ')
      console.log(res.data.data)
      this.rightsData = res.data.data
      let key = []
      row.children.forEach((item, index) => {
        item.children.forEach((item2, index) => [
          item2.children.forEach((item3, index) => {
            key.push(item3.id)
          })
        ])
      })
      this.$nextTick(() => {
        console.log(this.$refs.tree)
        this.$refs.tree.setCheckedKeys(key)
      })
    },
    async AssignRight () {
      let key1 = this.$refs.tree.getHalfCheckedKeys()
      let key2 = this.$refs.tree.getCheckedKeys()
      let keys = key1.concat(key2)
      console.log(keys)
      // 发送
      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(',')
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.dialogAssignRightVisible = false
        this.loadRolesData()
        this.$message({
          message: '分配成功',
          type: 'success'
        })
      } else {
        this.$message.error({
          message: res.data.meta.msg
        })
      }
    }
  }
}
