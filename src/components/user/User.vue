<template src="./user.html"></template>
<script src="./user.js">
import axios from 'axios'
export default {
  data () {
    return {
      userData: [
        {
          email: '2016-05-02',
          username: '王小虎',
          mobile: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      pageTotle: 0,
      pagenum: 1,
      searchText: '',
      state: true
    }
  },
  created () {
    this.loadUsersData()
  },
  methods: {
    loadUsersData (pagenum = 1, query = '') {
      axios
        .get('http://localhost:8888/api/private/v1/users/', {
          params: {
            query,
            pagenum,
            pagesize: 2
          },
          headers: { Authorization: localStorage.getItem('token') }
        })
        .then(data => {
          console.log(data)
          this.userData = data.data.data.users
          this.pageTotle = data.data.data.total
          this.pagenum = data.data.data.pagenum
        })
    },
    currentPageChange (pagenum) {
      this.loadUsersData(pagenum, this.searchText)
    },
    startSearch () {
      this.loadUsersData(1, this.searchText)
    }
  }
}
</script>
<style scoped lang='less' src="./user.css">
</style>
