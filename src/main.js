// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import PostContent from '@/components/postContent'
import getlist from '@/components/getlist'


Vue.component('PostContent',PostContent)
Vue.component('getlist',getlist)

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)

// import VuePreview from 'vue2-preview'
// Vue.use(VuePreview)
// Vue.use(preview,{
//   mainClass: 'pswp--minimal--dark',
//   barsSize: {top: 0, bottom: 0},
//   captionEl: false,
//   fullscreenEl: false,
//   shareEl: false,
//   bgOpacity: 0.85,
//   tapToClose: true,
//   tapToToggleControls: false
// })


import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.withCredentials = true 
Vue.use(VueAxios,axios);
Vue.config.productionTip = false

Vue.filter('getTime', function (value) {
  if (!value) return ''
  var d = new Date(value);
  var now = new Date();
  var day = d.getDate();
  var month = d.getMonth() + 1;
  var year = d.getFullYear();
  var hour = d.getHours();
  var min = d.getMinutes();
  var second = d.getSeconds();
  if (hour < 10) hour = '0' + hour;
  if (min < 10) min = '0' + min;
  if (second < 10) second = '0' + second;
  var date;
 
      date = year + "-" + month + "-" + day ;
  return (date );
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
