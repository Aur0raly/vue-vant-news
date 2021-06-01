<template>
  <van-cell class="article-item">
    <!--  标题项  -->
    <div slot="title" class="title">{{ article.title }}</div>
    <!--  文章底部详情  -->
    <div slot="label">
      <!--  三图  -->
      <div v-if="article.cover.type === 3"
           class="cover-warp">
        <div class="cover-warp-item"
             v-for="(img, index) in article.cover.images"
             :key="index">
          <van-image
            fit="cover"
            :src="img"
            height="80"
            class="cover-image"></van-image>
        </div>
      </div>
      <div class="label-warp">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!--  一图  -->
    <van-image
      v-if="article.cover.type === 1"
      fit="cover"
      width="130"
      height="80"
      :src="article.cover.images[0]"></van-image>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  data () {
    return {}
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.title {
  font-size: 16px;
  font-weight: bold;
}

.cover-warp {
  display: flex;
  padding: 10px 0;
  .cover-warp-item{
    flex: 1;
    height: 70px;
    margin: 3px;
    .cover-image{
      width: 100%;
      height: 70px;
    }
  }
}

.label-warp {
  span {
    color: #b4b4b4;
    margin-right: 5px;
  }
}
</style>
