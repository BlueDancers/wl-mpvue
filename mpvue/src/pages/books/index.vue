<template>
  <div>
    <cart v-for="item in book" :key="item" :book="item"></cart>
  </div>
</template>

<script>
import { get } from '../../utils/util'
import config from '../../config'
import cart from '../../components/Card'
export default {
  components: {
    cart
  },
  mounted () {  //页面初始化的时候执行加载函数
    this.getList()
  },
  data () {
    return {
      book:[]
    }
  },
  methods: {
    async getList() {
     wx.request({
      url: 'http://localhost:5757/weapp/booklist',
      method: 'GET',
      success: (res) => {
        this.book = res.data.data.list
        console.log(this.book);
      }
    })
    }
  }


}
</script>

<style scoped>
</style>