<template>
  <div>
    <!-- 顶部导航 -->
    <van-nav-bar
      title="修改密码"
      left-text="返回"
      right-text="确认"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-form ref="loginForm">
      <div class="tel">
        <van-field
          v-model="username1"
          label="密码1"
          placeholder="13054793016"
          type="password"
          disabled
        />
        <van-field
          v-model="username2"
          label="密码2"
          placeholder="请填写密码"
          maxlength="11"
          type="password"
        />
        <van-field
          v-model="username3"
          label="密码2"
          placeholder="请填写密码"
          maxlength="11"
          type="password"
        />
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'PwdNumber',
  data () {
    return {
      username1: '',
      username2: '',
      username3: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$emit('close')
    },
    onClickRight () {
      this.$toast.success('没有效果')
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #fff !important;
  .van-nav-bar__title {
    color: #111;
  }
}

.tel {
  padding: 10px 150px;
}
</style>
