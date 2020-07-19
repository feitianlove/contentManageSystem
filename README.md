# content-manage-system

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# 项目的相关总结
# 使用脚手架初始化项目

1. vue init webpack content-manage-system
2. npm run dev

# 把 没有用的删除掉

> Hello Word 这个 组件删除

# 配置 路由

1. 安装路由 `npm i vue-router`
2. 创建一个 `router/router.js`
3. 步骤

- 引入

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

// 在模块化工程中 Vue.use()
Vue.use(VueRouter)
```

- 实例化
  `const router = new VueRouter()`
- 导出
  `export default router`

4. 在 `main.js` 中引入 并且挂载

```js
import router from './router/router.js'

router 放到vue实例里即可

```

# 创建两个组件 (Login , Home) 根据路由规则显示出来

1. 创建两个组件(单文件组件) Login.vue / Home.vue
2. 按照具体的四个步骤

- 入口 手动
- 规则
- 组件 (引入组件)
- 出口

# element 的基本 使用

> 官网 :https://element.eleme.cn/#/zh-CN/component/installation
>
> 1. 安装 : `npm i element-ui -S`
> 2. 快速上手 : > 完整引入

```js
// main.js 中引入

// 引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 安装一下
Vue.use(ElementUI)
```

> 3. 使用 : 官网拷贝组件的代码复制粘贴即可

# login 页 => 登录表单组件

1. 居中

- 外面加 el-row el-col
- <el-row type='flex' justify='center' align='middle' >
    <el-col :span='8'></el-col>
  </el-row>
- 垂直没有居中,原因是 el-row 高度就这么高
- html,body,#app,.el-row { height:100% }

# 开始登录

1. 安装 axios
2. 引入 import axios from 'axios'
3. 使用
   axios.post('XXXXXX/login', this.rulesForm).then(res => {})
4. 提示

- 成功/失败
  this.\$message({
  message : '登录成功', / '登录失败'
  type : 'success', / 'error'
  duration :800
  })

5. 跳转
   this.\$router.push('/home')

# scoped

> 作用 : 当前组件内的样式 只会对当前组件(当前组件的标签或者子组件)起效果
> 问题 : login 页和 home 页都有一个 h1 标签(组件), 然后在 login 页里面设置 h1 为红色,但是 home 页里的 h1 也变红了
> 原因 : 组件内的样式进行了共享
> 解决办法 : <style scoped></style> 给每一个组件对应的 style 标签上添加 scoped
> 原理 :

1. 在 DOM 上添加了自定义属性 data-v-唯一值 : (每个组件里都有一个对应的唯一值)
   login : <h1 data-v-08b4fdc3></h1>
   home : <h1 data-v-74b1de62 ></h1>

2. 设置样式 : 通过属性选择器 来设置样式
   login : h1[data-v-08b4fdc3] { color : red }
   home : h1[data-v-74b1de62] {}

> 不良反应 :
> 作用 : 组件内设置的样式 只针对于当前组件内的标签或者子组件起效果, html,body 等不属于当前组件内的
> 可以设置为全局的

> 以后咱们使用 style 都记得加上 scoped

# 登录问题

需求 : 未登录的情况下, 如何处理访问了其他页面 (home / users 等等)

问题 1 : 如何判断登录了还是没有登录?

- 如果登录成功了, 后台会返回给我们一个 token 令牌
- 保存到本地
- 从本地获取 token 令牌,如果能获取到, 登录了, 如果获取不到,未登录

```js
// 保存
localStorage.setItem('token', res.data.data.token)

// 获取
localStorage.getItem('token')
```

问题 2 : 如果未登录, 访问了其他页面,该怎么处理???

- 判断到底登录了还是没有登录 (问题 1 localStorage.getItem('token'))

- login ? home ? users ? (手动)

- 全局前置导航守卫 (to, from , next) - 登录拦截

- 处理的具体步骤 (重要)

1.  判断是否是 login 页面 => 直接访问
2.  不是登录页面 => 再次判断
3.  判断是否登录 => 登录了 => 访问
    => 未登录 => 跳转 login

# 退出登录

1. 清除 token
2. 提示退出成功
3. 跳转到首页

# 左侧栏

> 左侧栏导航菜单的路由
> el-menu 有个属性 router 默认是'false', 开启 vue-router 路由模式 => true
> `:router='true'`
> index 的值 作为 path 进行路由跳转
> `index='/users' , '/roles', '/rights'`

# 创建三个组件 并且显示出来

1. 创建组件 users/Users.vue
2. 走流程

- 入口 - 规则 - 组件 - 出口

3. 需求 :users /roles/rights 三个对应的组件显示在 home 组件里, 而不应该直接把 home 给替换掉
4. 嵌套路由(子路由)

- home 组件里 main 位置留一个出口
- 设置子路由 children : [ 三个路由规则]

```js
 {
     path: '/home',
     name: 'home',
     component: Home,
     children: [
       { path: '/users', name: 'users', component: Users },
       { path: '/roles', name: 'roles', component: Roles },
       { path: '/rights', name: 'rights', component: Rights }
     ]
   }
```

# 用户列表

> 参考 : 表格组件

1. element-ui 官网 把 `结构 + 数据` 拷贝过来
2. 分析
3. 改造
4. 请求数据

- 要添加 token
- http 无状态的 , 上一次登录后的结果,后台是不记录的,
- 每次发送请求都要携带这个 token, 因为这个 token 是后台返回给我们的, 再携带 token 过去,后台是知道的,
- 就可以 返回 正确的数据了

```js
// 引入 axios
import axios from 'axios'

// 请求
// 格式 : axios.get(url地址, config)
// {
//   params : {  query : '', pagenum:1, pagesize:2 },
//   headers : {  Authorization: localStorage.getItem("token") }
// }
axios
  .get('..../users', {
    params: {},
    headers: {}
  })
  .then(res => {})
```

# 用户列表 -分页

- 展示分页

```html
<el-pagination
  background
  layout="prev, pager, next"
  :current-page="pagenum"
  :page-size="2"
  :total="total"
></el-pagination>
```

- 点击分页

```html
<el-pagination @current-change="clickCurrentPage">
  clickCurrentPage(curPage) { this.loadUsersData(curPage) } loadUsersData(
  pagenum = 1) {}</el-pagination
>
```

- 查询内容

```js
<el-input v-model='queryText' />

- 点击按钮查询内容
this.loaduserData(1, this.queryText)

- 点击分页
this.loadUsersData(curPage, this.queryText)

- 查询数据
loadUsersData(pagenum= 1, query='') {}



```

# 面包屑

# lang + 处理 less

- lang='css/less'
- 安装 less-loader `npm i less-loader less -D`
- webpack 配置好了, 我们只需要把需要安装的包安装一下即可

# 把 单文件组件抽离成三个部分

> template => Users.html
> script => Users.js
> style => Users.less

```html
<template src="./Users.html"></template>
<script src="./Users.js"></script>
<style src="./Users.less" lang="less" scoped></style>
```

# 表格的列分为两种

> 正常列 : 直接赋值 prop='username'
> 自定义列 : 组件/需要处理数据之后才能 赋值的
# 添加用户

> 展示 el-dialog
> rules 校验规则

1. 给 el-form 添加 rules `:rules='rules'` rules 是一个对象
2. 给每一个要校验的表单元素 添加 `prop='username'`
3. 设置 rules 校验对象

```js
 username: [
          // 判断是否需要输入
          // required : 必须
          { required: true, message: "请输入用户名", trigger: "blur" },
          // 判断输入格式是否正确
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
```
# 添加用户

1. 弹出对话框 ok
2. 绑定表单数据
3. 点击确定,发送请求,添加用户
   > 添加之后处理

- 1.  关闭 对话框
- 2.  刷新页面
- 3.  提示成功
- 4.  重置表单

# 假如有个需求, 只要关闭对话框,就要重置表单

> 监听对话框的关闭
> 事件 closed 对话框关闭了 会自动调用

```js
// 添加 closed 事件
 @closed="dialogClosed"

// 监听对话框关闭
  dialogClosed() {
    // console.log('对话框关闭了')
    this.$refs.addUserForm.resetFields()
  }
```

# 删除用户

1. 注册事件 => 弹出确认框
2. 自定义列 传递数据

- @click='delUser(scope.row.id)'
- delUser(id) { 用 id }

3. 发送请求删除用户

- 格式 : axios.delete(url,config)

# 插槽

# 修改状态

1. 绑定当前用户自己的状态 v-model='scope.row.mg_state'
2. 注册 change 事件 传递当前对象 @change='stateChanged(scope.row)'
3. stateChanged(row) {
   const {id,mg_state:mgState} = row
   }
4. 格式 : axios.put(url,data,config)

# 总结格式 (注意一下)

> 其他 => github => axios

- axios.get(url,config) config={ params , headers }
- axios.delete(url,config)

- axios.post(url,data,config)
- axios.put(url,data,config)

# axios 的三个问题

- 问题 1. 每次都要添加基准路径
  > 在 main.js 配置一下

```js
axios.defaults.baseURL = 'https://api.example.com'
```

- 问题 2. 每个组件页面都要引入 axios

  > main.js
  > 给 vue 的原型加 : Vue.prototype.$axios = axios
  > 所有的vue实例都可以使用 , 组件本质就是vue实例 this.$axios

- 问题 3. 每次请求都要携带 token
  > 使用 请求拦截器 , 每次发送请求都要经过这个拦截器, 我们就不要每次写代码的时候自己写 token 了
  > 让拦截器帮我们去添加这个 token

```js
axios.interceptors.request.use(
  function(config) {
    config.headers.Authorization = localStorage.getItem('token')

    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
```

# token 过期了怎么处理 ?? (响应拦截器)

> 7 天 1 月

- 方式 1 : 我们和后台约定好, 100010 (过期) , 过期了怎么办 ? 跳转到登录页

```js
// 方式1 :
if (response.data.meta.status === 100010) {
  //1.跳转 过登录页
  this.$router.push('/login')
}
```

- 方式 2 : 和后台约定好, 7 天过期 (6 天的时候) , 返回给我们一个 token 字段
  > 返回给我们的 token 是最新的, 把本地旧的替换掉

```js
// 方式2 :
if (response.data.data.token) {
  localStorage.setItem('token', token)
}
```

# 编辑用户

1. 弹出对话框 ok
2. 展示已知信息
   > 点击编辑小图标的时候, 获取当前行的对象 => 通过方法传递 => 赋值 给 editUserForm(表单绑定过的)
3. 发送请求
# 权限列表

1. 表格展示
2. 请求权限数据
3. 处理等级

```js
<template slot-scope="scope">
  <span v-if="scope.row.level == 0">一级</span>
  <span v-else-if="scope.row.level==1">二级</span>
  <span v-else>三级</span>
</template>
```

4. 处理索引
   > 添加 type 属性 值:index 索引号就有了 从 1 开始的,,,

- <el-table-column type='index' :index='indexMethod'></el-table-column>
- indexMethod( index ) { // index 就是从 0 开始的
  return index
  }

# 角色列表

1. 表格基本 展示
2. 发送请求获取角色数据
3. 赋值之后,有个小问题,降低版本 element
   `npm i element@2.4.11`
4. 索引

# 抽离三个部分

# 用户 - 角色 - 权限 三者之间的关系

张三 主管 商品管理/订单管理/商品 列表
李四 主管 商品管理/订单管理/商品 列表

> 接下来要做的是 给`角色分配权限`

# 角色列表 (左边) - 展示权限信息

1. 展开行功能

```js
<el-table-column type="expand">
  <template slot-scope="scope">
    <p>哈哈</p>
  </template>
</el-table-column>
```

2. 三层 代码 01

```html
<template slot-scope="scope">
  <!-- 第一层 -->
  <el-row v-for="item1 in scope.row.children" :key="item1.id">
    <el-col :span="4">{{ item1.authName }}</el-col>
    <el-col :span="20">
      <!-- 第二层  -->
      <el-row v-for="item2 in item1.children" :key="item2.id">
        <el-col :span="4">{{ item2.authName }}</el-col>
        <el-col :span="20">
          <!-- 第三层 -->
          <span v-for="item3 in item2.children" :key="item3.id"
            >{{ item3.authName }}</span
          >
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
```

# 角色列表 (右边)

1. 弹出对话框

- 参考 : Tree 树型组件 -> 默认展开和默认选中

2. 展示 所有的权限信息

```js
 defaultProps: {
    // children 负责显示结构
    children: 'children',
    // label : 负责显示标题
    label: 'authName'
  }
```

3. 展示当前拥有的权限信息
4. 发送后台

```js
> 参数1: roleId(角色id) 参数2:rids(权限信息的id)
> roleId :  点击弹窗的时候,传row ,把 row的id 保存起来了
> rids => 获取当前选中的权限(√) + 获取当前半选中的权限(-)

```

# pid

{
name :'上海市',
id : 1,
pid :0
children :[
{
id : 2
pid : 1,
name :'静安区',
children : [
{
id :4,
pid :'1,2'
name :'静安寺'
}
]
},
{
id : 3,
pid : 1
name :'浦东新区'
}
]
}

# 分配角色

1. 弹出对话框 ok

2. 展示所有的角色信息

   > el-option
   > label : 负责展示的 :label='item.roleName'
   > value : 负责收集数据 :value='item.id'

3. 展示当前的角色信息

   > 1. 传 row 过来 获取三个参数,但是只有两个参数 id 和 username, 用 id 再次获取信息得到 rid
   > 2. 把 id username rid 都赋值给 assignRoleForm
   > 3. 稍微处理 一下 rid = -1

4. 发送请求
# 左侧栏

> 动态获取权限菜单
>
> 1. 发送请求获取权限数据
> 2. 两层 v-for
> 3. 一点开,全部都开了
>    el-submenu => index => 不能唯一
>    <el-submenu  :index="item.id+''">

> 4. el-menu-item 里的 index 作为 path 参与跳转
>    <el-menu-item :index="'/'+item1.path">

> 5. 刷新可以获取 url 中哈希里的路径
>    :default-active="\$route.path" => /users

# 保留页数

> 思路 :我们可以把页面保存到 url 路径里面, 以后直接获取就知道第几页了
> 上 => 下

1. path :'/users/:page?'
2. 获取 page 发送请求
   const page = this.\$route.params.page
   this.loadUsersData(page)
3. 已经做好的
   this.pagenum = res.data.data.pagenum

> 下 => 上

1. 点击页码
   this.\$router.push('/users/'+curPage)

# 商品分类

> 1 创建组件
> 2 四个步骤

# 商品分类 => 树结构

> 参考 : https://github.com/foolishchow/element-tree-grid

- 安装 : npm install element-tree-grid --save
- 引入

```js
import ElTreeGrid from 'element-tree-grid'
Vue.component(ElTreeGrid.name, ElTreeGrid)
```

- 拷贝列 + 合并列
  el-table-tree-column

- 几个属性
- treeKey => 父节点 找子节点 tree-key='cat_id'
- parentKey => 子节点找父节点 parent-key='cat_pid'
- levelKey => 按照等级进行缩进 level-key='cat_level'
- indentSize => 缩进 :indent-size='20'

# 添加商品分类

1. 弹出对话框 ok
2. 显示父级名称列表
   > 2.1 先准备级联选择器组件 + options 数据拷贝过来
   > 2.2 获取二层的分类数据 type:2
   > 2.3 把数据赋值给 options
   > this.options = res.data.data
   > 2.4 只有结构, 没有显示标题 => 对不上号

- :props='defaultProps'
- defaultProps: {
  value :'cat_id',
  label : 'cat_name'
  }
  > 2.5 addCatForm => {cat_name, cat_pid_arr}

3. 发送请求
   > const { cat_name, cat_pid_arr } = this.addCatForm
   > 请求的三个参数
   > cat_name 直接用
   > cat_pid : 数组的最后一个元素(父 id)
   > cat_level 数组的长度

# 商品列表

> 1.  创建商品组件
> 2.  四个步骤

# 添加商品

1. 步骤条

- :index='activeIndex'
- activeIndex : ?

2. 标签页

- 每个 tab 元素 加 name
- tabs => v-model='activeName'
- 控制 activeName 就可以控制 tabs 的切换

3. 让标签页 和 步骤条 关联起来

   > 点击标签页 => 控制步骤条
   > 3.1 给 tabs 注册一个事件 <el-tabs @tab-click='clickTab'>
   > 3.2 clickTab(tab) {
   > // tab.index 0=> 开始
   > this.activeIndex = +tab.index + 1
   > }

4. 处理下一步

- 基本信息的下一步 next(2,'two')
- 商品图片的下一步 next(3,'three')
- next(index,name) {
  this.activeIndex = index
  this.activeName = name
  }

5.  四个文本输入框 + 级联选择器
    > 展示 + 获取数据 + 配置项(value,label)
    > 单选框
      <!-- label 是收集数据 -->
    <el-radio v-model="addGoodsForm.radio" :label="true">是</el-radio>
    <el-radio v-model="addGoodsForm.radio" :label="false">否</el-radio>

