<template>
  <div class="login-container">
    <!-- 导航栏部分 -->
    <van-nav-bar class="van-nav-bar" title="登录">
      <van-icon
        class="icon"
        slot="left"
        name="arrow-left"
        @click="$router.back()"
      />
    </van-nav-bar>

    <!-- Form表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="userInfo.mobile"
        name="mobile"
        placeholder="请输入手机号..."
        :rules="userFormRules.mobile"
        maxlength="11"
        type="number"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="userInfo.code"
        name="code"
        placeholder="请输入手机号验证码..."
        :rules="userFormRules.code"
        maxlength="6"
        type="number"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <van-button class="login-btn" block type="info">登录</van-button>
    </van-form>
  </div>
</template>

<script>
// 导入API
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      // 输入框信息
      userInfo: {
        mobile: '13911111111', // 手机号 -- 黑马程序员(改不了)
        // mobile: '17090086870', // 手机号 -- Skr
        // mobile: '17342065909', // 手机号 -- 天天
        // mobile: '', // 手机号
        // code: '', // 短信验证码
        code: '246810' // 短信验证码 -- 万能验证码
      },

      // 验证信息
      userFormRules: {
        mobile: [
          { require: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { require: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },

      // 倒计时是否开启
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // =========== 登录操作 ===========
    async onSubmit () {
      // 1.获取表单数据
      const user = this.userInfo

      // 2.表单验证 ^_^
      // 3.加载提示
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0 // 加载时间 0 --> 一直加载
      })

      // 4.提交表单数据请求
      try {
        const res = await login(user)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')

        // 登录成功页面跳转
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },

    // =========== 验证码操作 ===========
    // 验证码校验
    async onSendSms () {
      // 验证手机号合法性
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return this.$toast('请输入合法的手机号, ok?')
      }

      // 开启倒计时
      this.isCountDownShow = true

      // 发送验证码
      try {
        await sendSms(this.userInfo.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败, 关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast(err.response.data.message)
        } else {
          this.$toast('发送失败, 请稍后再试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .iconfont {
    font-size: 37px;
    color: #666666;
  }
  .van-field__control {
    color: #c0c0c0;
    font-size: 26px;
  }

  .van-button {
    background-color: #ededed;
    border-radius: 23px;
    width: 152px;
    height: 45px;
    line-height: 45px;
    font-size: 22px;
    color: #666666;
  }

  .login-btn {
    width: 694px;
    height: 88px;
    background-color: #6db4fb;
    border: 0;
    font-size: 30px;
    color: #ffffff;
    margin: 53px auto;
    border-radius: 10px;
  }
}
</style>
