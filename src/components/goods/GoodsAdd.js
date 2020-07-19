export default {
  data () {
    return {
      // 控制步骤条
      activeIndex: 1,
      // 控制标签页
      activeName: 'one',
      // 添加商品对象
      addGoodsForm: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        radio: true
      },
      // 级联选择器的假数据
      options: [{
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        },
        {
          value: 'sketch',
          label: 'Sketch Templates'
        },
        {
          value: 'jiaohu',
          label: '组件交互文档'
        }
        ]
      }],
      // 级联选择器的配置对象
      defaultProps: {
        value: 'cat_id',
        label: 'cat_name'
      },
      dialogVisible: false,
      dialogImageUrl: '',
      deafultHeader: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  created () {
    this.loadCatName()
  },
  methods: {
    // 点击 tabs
    clickTabs (tab) {
      console.log('点击了:', tab.index)
      // 控制步骤条
      this.activeIndex = +tab.index + 1
    },
    // next 下一步
    // 2. two
    // 3. three
    next (index, name) {
      this.activeIndex = index
      this.activeName = name
    },
    // 加载分类数据
    async loadCatName () {
      let res = await this.$axios.get('categories')
      console.log(res)
      this.options = res.data.data
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadSuccess (res) {
      this.addGoodsForm.pics.push({
        pic: res.data.tmp_path
      })
    },
    async addGoods () {
      console.log(this.addGoodsForm)
      // 1. 获取数据
      const {
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics
      } = this.addGoodsForm

      let res = await this.$axios.post('goods', {
        goods_name,
        goods_cat: goods_cat.join(','),
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics
      })
      console.log(res)
      if (res.data.meta.status === 201) {
        this.$message({
          message: '添加商品成功',
          type: 'success',
          duration: 800
        })

        this.$router.push('/goods')
      }
    }
  }
}
