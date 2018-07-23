<template>
  <div>
    这里是App
  </div>
</template>

<script>
export default {
  created() {
    console.log('小程序启动')
  }
}
</script>

<style>
.text-primary {
  color: #EA5149;
}
.btn {
  background-color: #ea5a49;
  color: white;
  margin-bottom: 10px;
  padding-left: 15px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  width: 100%;
}
.btn:active {
  background-color: #fa5a49;
}
</style>