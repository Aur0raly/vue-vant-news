<template>
<div class="my-container">
  <!-- 导航栏 -->
  <van-nav-bar title="个人资料"/>
  <!-- 个人信息 -->
  <van-cell-group :border="false" v-if="user">
    <van-cell center class="my-info">
      <van-image
        class="avater"
        slot="icon"
        width="70"
        height="70"
        round
        fit="cover"
        :src="userInfo.photo"
      />
      <div slot="title" class="name">{{ userInfo.intro }}</div>
      <van-button type="info" size="small" round>编辑资料</van-button>
    </van-cell>
    <!-- 基本信息 -->
    <van-grid :border="false" class="base-info">
      <van-grid-item text="文章"><div slot="icon">{{ userInfo.art_count }}</div></van-grid-item>
      <van-grid-item text="关注"><div slot="icon">{{ userInfo.follow_count }}</div></van-grid-item>
      <van-grid-item text="粉丝"><div slot="icon">{{ userInfo.fans_count }}</div></van-grid-item>
      <van-grid-item text="获赞"><div slot="icon">{{ userInfo.like_count }}</div></van-grid-item>
    </van-grid>
  </van-cell-group>
  <!-- 未登录状态 -->
  <div class="not-login" v-else @click="$router.push('/login')">
    <div>
      <img src="~@/assets/logo.png" alt="" class="unLoginImg">
    </div>
    <div class="text">登录 / 注册</div>
  </div>
  <!-- 收藏/历史 -->
  <van-grid :column-num="2" :border="false">
    <van-grid-item icon="star" text="收藏" class="shoucang" />
    <van-grid-item icon="underway" text="历史" class="lishi" />
  </van-grid>
  <!-- 其他选项 -->
  <van-cell-group>
    <van-cell title="消息通知" is-link to="" icon-prefix="iconfont icon" icon="tonggao" />
    <van-cell title="人工客服" is-link to="" icon-prefix="iconfont icon" icon="xiaoxi" />
    <van-cell title="意见反馈" is-link to="" icon-prefix="iconfont icon" icon="shenhechenggong" />
  </van-cell-group>
  <van-button
    type="danger"
    block
    v-if="user"
    round
    icon-prefix="iconfont icon"
    icon="back2x"
    @click="logout"
    style="width: 80%; margin: 20px auto">退出登录</van-button>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'index',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      console.log(data)
      this.userInfo = data.data
    },
    logout () {
      this.$dialog.confirm({
        title: '退出登录',
        message: '确认退出吗？'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
        })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.my-container {
  .not-login{
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    .unLoginImg {
      width: 80px;
      height: 80px;
    }
    .text {
      font-size: 15px;
    }
  }
  .my-info {
    padding-top: 30px;
    padding-bottom: 11px;
    box-sizing: border-box;
    .name {
      font-size: 15px;
      font-weight: bold;
      margin: 0 20px;
    }
  }
  .base-info {
    font-size: 20px;
  }
  .shoucang {
    color: red;
  }
  .lishi {
    color: darkorange;
  }
}
</style>
