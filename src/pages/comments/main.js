import Vue from 'vue'
import Me from './index'

Vue.config.productionTip = false

const app = new Vue(Me)
app.$mount();

export default {
  config: {
    navigationBarTitleText: "评论列表",
    enablePullDownRefresh: true
  }
}
