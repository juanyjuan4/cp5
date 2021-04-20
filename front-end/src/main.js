import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let data = {
  user: null,
  pictures: [
    String(require('@/images/avatar1.png')),
    String(require('@/images/avatar2.png')),
    String(require('@/images/avatar3.png')),
    String(require('@/images/avatar4.png')),
    String(require('@/images/avatar5.png')),
    String(require('@/images/avatar6.png')),
    String(require('@/images/avatar7.png')),
    String(require('@/images/avatar8.png')),
    String(require('@/images/avatar9.png')),
    String(require('@/images/avatar10.png'))
  ]
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
