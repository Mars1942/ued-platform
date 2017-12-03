// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style.less'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'


Vue.config.productionTip = false;
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.http.interceptors.push(function (request, next) {
  const loading = this.$loading({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  next(function (response) {
    loading.close();
    if (response.body){
      return response.body;
    }else{
      return response.bodyText;
    }
  })
})
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  template: '<App/>',
  components: {App}
})
