import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'
//这一行代码是做什么啊??????不加就使劲报错


const app = new Vue(App)
app.$mount()

export default {
  config: {
    pages: ['^pages/books/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#EA5149',
      navigationBarTitleText: '豆瓣读书',
      navigationBarTextStyle: 'light'
    },
    tabBar: {
      selectedColor: '#EA5149',
      list: [
        {
          pagePath: 'pages/books/main',
          text: '图书',
          iconPath: 'static/img/book.png',
          selectedIconPath: 'static/img/book-active.png'
        },
        {
          pagePath: 'pages/comments/main',
          text: '评论',
          iconPath: 'static/img/todo.png',
          selectedIconPath: 'static/img/todo-active.png'
        },
        {
          pagePath: 'pages/Me/main',
          text: '我',
          iconPath: 'static/img/me.png',
          selectedIconPath: 'static/img/me-active.png'
        }
      ]
    }
  }
}
