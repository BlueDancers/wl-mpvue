<template>
  <div>
    图书id{{ bookid }}
  </div>
</template>

<script>
import { get } from '../../utils/util.js'
export default {
  mounted() {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
  },
  data() {
    return {
      bookid: ''
    }
  },
  methods: {
    getDetail() {
      get('/weapp/bookdetail', { id: this.bookid })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
