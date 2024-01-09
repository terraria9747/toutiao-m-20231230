<template>
  <div>
    <!-- 顶部导航 -->
    <van-nav-bar
      title="修改手机号"
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
          name="用户名"
          label="手机号1"
          placeholder="13054793016"
          disabled
          :rules="FormRules.moblie"
        />
        <van-field
          v-model="username2"
          name="用户名"
          label="手机号2"
          placeholder="请填写手机号"
          maxlength="11"
          type="Number"
          :rules="FormRules.moblie"
        />
        <van-field
          v-model="username3"
          name="用户名"
          label="手机号2"
          placeholder="请填写手机号"
          maxlength="11"
          type="Number"
          :rules="FormRules.moblie"
        />
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'PhoneNumber',
  data () {
    return {
      username1: '',
      username2: '',
      username3: '',

      FormRules: {
        moblie: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|9]\d{9}$/, message: '手机号格式不对' }
        ]
      }
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
