<template>
  <div>
    <el-button @click="showAddcategory" plain type="success">添加分类</el-button>
    <el-table :data="categoryData" stripe style="width: 100%">
      <el-table-tree-column
        :indent-size="40"
        label="名称分类"
        level-key="cat_level"
        parent-key="cat_pid"
        prop="cat_name"
        tree-key="cat_id"
        width="180"
      ></el-table-tree-column>
      <el-table-tree-column label="是否有效" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.cat_deleted === false ? "否" : '是' }}</span>
        </template>
      </el-table-tree-column>
      <el-table-tree-column label="分类级别" prop="cat_level">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level == 0">一级</span>
          <span v-else-if="scope.row.cat_level == 1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-tree-column>
    </el-table>

    <el-dialog :visible.sync="dialogAddCategoryVisible" title="添加分类">
      <el-form :model="addCategroyData">
        <el-form-item label="分类名称">
          <el-input v-model="addCategroyData.cat_name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-cascader
            :options="categoryOptions"
            :props="defaultProps"
            filterable
            placeholder="试试搜索"
            v-model="addCategroyData.cat_pid_arr"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogAddCategoryVisible = false">取 消</el-button>
        <el-button @click="addCategory" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categoryData: [
        {
          label: '大家店',
          name: '',
          address: ''
        }
      ],
      dialogAddCategoryVisible: false,
      addCategroyData: {
        cat_name: '',
        cat_pid_arr: []
      },

      categoryOptions: [],
      defaultProps: {
        value: 'cat_id',
        label: 'cat_name'
      }
    }
  },
  created () {
    this.loadCategory()
    this.loadCategory2()
  },
  methods: {
    async loadCategory () {
      let res = await this.$axios.get('categories')
      console.log(res)
      this.categoryData = res.data.data
    },
    async loadCategory2 () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      this.categoryOptions = res.data.data
      console.log(this.categoryOptions)
    },
    showAddcategory () {
      this.dialogAddCategoryVisible = true
    },
    async addCategory () {
      this.dialogAddCategoryVisible = false
      // const { catName, catPpidArr } =
      // console.log(catName, catPpidArr)
      let tmp = this.addCategroyData.cat_pid_arr.length - 1
      let res = await this.$axios.post('categories', {
        cat_pid: this.addCategroyData.cat_pid_arr[tmp],
        cat_name: this.addCategroyData.cat_name,
        cat_level: this.addCategroyData.cat_pid_arr.length
      })
      if (res.data.meta.status === 201) {
        this.$message({
          message: '增加成功',
          type: 'success'
        })
        this.loadCategory()
      } else {
        this.$message.error({
          message: res.data.meta.msg
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
