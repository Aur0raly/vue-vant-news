<template>
  <div>
    <!-- 标题导航栏 -->
    <van-nav-bar class="app-nav-bar" left-arrow @click-left="$router.back()"/>
    <van-row type="flex" justify="center">
      <van-col><img src="~@/assets/logo.png" alt=""></van-col>
    </van-row>
    <!-- /标题导航栏 -->
    <!-- 输入框 -->
    <van-row type="flex" justify="center">
      <van-col span="20">
        <van-form
          ref="loginFormRef"
          @submit="onLogin"
          @failed="onFailed"
          :show-error="false"
          :validate-first="true"
          :show-error-message="false">
          <van-field
            center
            v-model="user.mobile"
            :rules="formRules.mobile"
            name="mobile"
            placeholder="请输入您的手机号"/>
          <van-field
            v-model="user.code"
            center
            clearable
            name="code"
            :rules="formRules.code"
            placeholder="请输入短信验证码"
          >
            <template #button>
              <van-count-down format="ss s" :time="1000 * 60" v-if="isCountDownShow"
                              @finish="countDownOver"></van-count-down>
              <van-button
                size="mini"
                type="info"
                round
                :loading="isSendCodeLoading"
                @click.prevent="sendCode"
                v-else>发送验证码</van-button>
            </template>
          </van-field>
          <!-- 登录按钮 -->
          <van-button type="info" block round class="login">登录</van-button>
          <!-- /登录按钮 -->
        </van-form>
      </van-col>
    </van-row>
    <!-- /输入框 -->
  </div>
</template>
<script>
import { login, sendCode } from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'index',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号'
          },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: '请输入正确格式的手机号'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码'
          },
          {
            pattern: /^\d{6}$/,
            message: '请输入正确格式的验证码'
          }
        ]
      },
      isCountDownShow: false,
      isSendCodeLoading: false
    }
  },
  methods: {
    // 登录请求
    async onLogin () {
      // 加载中提示
      Toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 值为 0 时，Toast不会小事
      })
      try {
        const { data } = await login(this.user)
        Toast.success({
          message: '登录成功',
          forbidClick: true
        })
        this.$store.commit('setUser', data.data)
        this.$router.back()
      } catch (err) {
        console.log(err)
        Toast.fail({
          message: '登录失败',
          forbidClick: true
        })
      }
    },
    // 错误消息提示
    onFailed (error) {
      console.log(error)
      if (error.errors[0]) {
        Toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    // 发送验证码
    async sendCode () {
      try {
        this.isSendCodeLoading = true
        // 验证
        await this.$refs.loginFormRef.validate('mobile')
        // 发送验证码
        const res = await sendCode(this.user.mobile)
        console.log(res)
        this.isCountDownShow = true
      } catch (err) {
        console.dir(err)
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '发送验证码过于频繁'
        } else if (err.name === 'mobile') {
          message = '请输入手机号码'
        } else {
          message = '发送失败，请稍后重试'
        }
        Toast({
          message,
          position: 'top'
        })
      }
      this.isSendCodeLoading = false
    },
    // 倒计时结束显示按钮
    countDownOver () {
      this.isCountDownShow = false
    }
  }
}
</script>

<style scoped lang="less">
img {
  width: 80px;
  height: 80px;
  margin-top: 50px;
  margin-bottom: 30px;
}
.login {
  width: 300px;
  margin: 30px auto;
}
</style>
