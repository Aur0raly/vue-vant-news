<template>
  <div>
    <van-pull-refresh v-model="refreshing" :success-text="successText" @refresh="onRefresh" success-duration="1000">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item v-for="(item, index) in articles" :key="index" :article="item" />
<!--        <van-cell v-for="(item, index) in articles" :key="index" :title="item.title"/>-->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleLists } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  data () {
    return {
      articles: [],
      loading: false,
      refreshing: false,
      finished: false,
      timestamp: null,
      successText: ''
    }
  },
  methods: {
    async onLoad () {
      // 获取列表数据
      const { data } = await getArticleLists({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      console.log(data)
      // 加载到 data
      const { results } = data.data
      this.articles.push(...results)
      // console.log(this.articles)
      // 结束加载
      console.log(results)
      this.loading = false
      // 数据全部加载完毕
      if (results.length) {
        this.timestamp = results.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      const { data } = await getArticleLists({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      // 加载到 data
      const { results } = data.data
      this.articles.unshift(...results)
      this.refreshing = false
      this.successText = `更新了${results.length}条数据`
    }
  },
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
</style>
