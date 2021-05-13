<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
  },
  props: ['iconClass', 'iconDianzan']
  // 传入的iconClass写法  iconClass: { width: "20px", height: "20px", }
}
</script>

<style lang="less">

</style>
