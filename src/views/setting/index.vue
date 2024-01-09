<template>
  <div class="setting-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="账号和隐私设置"
      left-arrow
      @click-left="onClickLeft"
      class="nav-box"
    />

    <!-- 单元格 -->
    <van-cell-group>
      <van-cell title="手机号" is-link @click="OnPhone" />
      <van-cell title="修改密码" is-link @click="OnPwd" />
      <van-cell title="开启后, 可以让你的好友找到你" class="van-cell_2" />
      <van-cell title="允许将我推荐给好友">
        <van-switch v-model="checkedone" size="16px" inactive-color="#ee0a24" />
      </van-cell>
      <van-cell title="开启后, 可以向你推荐好友" class="van-cell_2" />
      <van-cell title="允许给我推荐可能认识的人">
        <van-switch v-model="checkedtow" size="16px" inactive-color="#ee0a24" />
      </van-cell>
      <van-cell
        title="开启后, 分享到微信QQ平台的页面会展示你的头像"
        class="van-cell_2"
      />
      <van-cell title="分享页显示我的头像">
        <van-switch
          v-model="checkedthree"
          size="16px"
          inactive-color="#ee0a24"
        />
      </van-cell>
    </van-cell-group>

    <!-- 手机号弹出层 -->
    <van-popup v-model="phoneshow" position="bottom" :style="{ height: '80%' }">
      <phone-item @close="phoneshow = false" />
    </van-popup>

    <!-- 密码弹出层 -->
    <van-popup v-model="pwdshow" position="bottom" :style="{ height: '80%' }">
      <pwd-item />
    </van-popup>
  </div>
</template>

<script>
import phoneItem from './components/phone-item'
import pwdItem from './components/pwd-item'

export default {
  name: 'SettingItem',
  data () {
    return {
      phoneshow: false,
      pwdshow: false,
      checkedone: true,
      checkedtow: false,
      checkedthree: false
    }
  },
  components: {
    phoneItem,
    pwdItem
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    OnPhone () {
      this.phoneshow = true
    },
    OnPwd () {
      this.pwdshow = true
    }
  },
  created () {
    this.$toast.success('此页面\n仅作展示')
  }
}
</script>

<style lang="less" scoped>
.setting-container {
  // 导航栏
  .nav-box {
    .van-icon {
      color: #fff;
    }
  }
  .van-icon {
    color: #e1e1e1;
  }
  .van-cell {
    background-color: #fff;
    height: 90px;
  }
  .van-cell_2 {
    background-color: #f5f7f9;
    padding: 0 32px;
    height: 66px;
    line-height: 66px;
    font-size: 24px;
    color: #999999;
  }
}
</style>
