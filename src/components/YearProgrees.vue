<template>
  <div class="year">
    <progress class="progress" :percent="percent" color="#EA5149" show-info="true" active />
    <p>{{ year }}已经过去{{ days }} 天 {{ percent }}% </p>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    isLeapYear() {
      let year = new Date().getFullYear() //返回年份
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    getDayOfYear() {
      return this.isLeapYear()?366:365
    }
  },
  computed: {
    year() {
      return new Date().getFullYear()
    },
    days() {
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      //这里定义start是第一天
      let news = new Date().getTime() - start.getTime() //获取1970年到现在的毫秒数
      return parseInt(news / 1000 / 60 / 60 / 24) + 1
    },
    percent(){
      return (this.days*100/this.getDayOfYear()).toFixed(1)
      //return Math.round(this.days*100/this.getDayOfYear())
    }
  }
}
</script>

<style scoped>
.year {
  margin: 20rpx 0;
}
p {
  margin-bottom: 80rpx;
}
.progress {
  margin-bottom: 10rpx;
}
</style>