<template>
<div class="layout-container">
  <!-- 子路由出口 -->
  <router-view/>
  <!-- /子路由出口 -->
  <!-- 底部导航栏 -->
  <van-tabbar v-model="active" route>
    <van-tabbar-item icon-prefix="iconfont icon" icon="pingtai" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon-prefix="iconfont icon" icon="xiaoxi" to="/qa">问答</van-tabbar-item>
    <van-tabbar-item icon-prefix="iconfont icon" icon="luxiang" to="/video">视频</van-tabbar-item>
    <van-tabbar-item icon-prefix="iconfont icon" icon="gerenshezhi" to="/my">我的</van-tabbar-item>
  </van-tabbar>
  <!-- /底部导航栏 -->
</div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped>

</style>
