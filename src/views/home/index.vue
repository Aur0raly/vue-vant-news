<template>
  <div class="home-container">
    <van-nav-bar>
      <van-button slot="title" type="info" icon-prefix="iconfont icon" icon="dingwei" round style="width: 200px"
                  size="small">搜索
      </van-button>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable sticky>
      <van-tab
        v-for="item in channels"
        :title="item.name"
        :key="item.id">
        <article-list :channel="item" class="article-list" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/article'
import ArticleList from './components/article-list'

export default {
  name: 'index',
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  components: {
    ArticleList
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      // console.log(data)
      this.channels = data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}

.van-nav-bar {
  background-color: #1989fa;
  .van-button {
    background-color: #fff;
    color: #1989fa;
  }
}
</style>
