// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/css/common.css'

import axios from 'axios'
/* eslint-disable no-new */
import moment from 'moment'
// vue-quill-editor

import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// element树形插件
var ElTreeGrid = require('element-tree-grid')
Vue.component(ElTreeGrid.name, ElTreeGrid)

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.Authorization = localStorage.getItem('token')
  return config
})

Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.filter('myDate', function (value) {
  return moment(value).format('YYYY-M-D H:m:s')
})

Vue.use(VueQuillEditor /* { default global options } */)
new Vue({
  router,
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
