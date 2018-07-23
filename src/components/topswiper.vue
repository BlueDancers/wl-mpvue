<template>
  <div class="swiper">
    <swiper indicator-dots="true"
            indicator-color="#EA5A49"
            autoplay="true"
            interval="5000"
            duration="1000"
            circular="true">
      <div v-for="(top,imgindex) in imgUrls" :key="imgindex" @click="data">
        <swiper-item>
          <img 
            v-for="img in top" 
            :key="img.id"
            @click='bookDetail(img)'
            mode="aspectFit" 
            :src="img.image"
            class="slide-image"/>
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: ['tops'],
  computed: {
    imgUrls() {
      let res = this.tops
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6, 9)]
    }
  },
  methods:{
    bookDetail(item){
      wx.navigateTo({
        url:'/pages/detail/main?id='+item.id
      })
    }
  }
}
</script>

<style scoped>
.swiper {
  margin-top: 5px;
}
.slide-image {
  width: 33%;
  height: 100%;
}
</style>