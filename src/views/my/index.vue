<template>
  <div class="my-container">
    <!-- 已登录页面布局 -->
    <div v-if="user" class="header yes-login">
      <div class="login-userinfo">
        <div class="left">
          <van-image class="avatar" round :src="this.userInfo.photo" />
          <span class="text">{{ this.userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" class="btn" round to="/my/userinfo"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="user-userinfo">
        <div class="data-item">
          <div class="count">{{ this.userInfo.art_count }}</div>
          <div class="text">头条</div>
        </div>
        <div class="data-item">
          <div class="count">{{ this.userInfo.fans_count }}</div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="count">{{ this.userInfo.follow_count }}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="count">{{ this.userInfo.like_count }}</div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>

    <!-- 未登录页面布局 -->
    <div v-else class="header no-login">
      <div class="login-box" @click="$router.push('./login')">
        <img class="login-img" src="~@/assets/mobile.png" />
        <span class="login-text">登录 / 注册</span>
      </div>
    </div>

    <!-- 宫格导航 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!-- 单元格 -->
    <van-cell-group class="cell">
      <van-cell
        class="text"
        title="消息通知"
        @click="$router.push('./user-info')"
        is-link
      />
      <van-cell
        class="text"
        title="小智同学"
        is-link
        @click="$router.push('./user-chat')"
      />
      <van-cell class="text" title="账号和隐私设置" is-link />
    </van-cell-group>

    <!-- 退出登录 -->
    <van-button v-if="user" class="signout-btn" @click="signout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
// 导入state数据
import { mapState } from 'vuex'
import { userInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      // 用户信息
      userInfo: {}
    }
  },
  computed: {
    // 映射为计算属性
    ...mapState(['user'])
  },
  watch: {},
  created () {
    // 只有用户登录了, 才发起请求获取用户的数据
    if (this.$store.state.user) {
      this.getUserInfo()
    }
  },
  mounted () {},
  methods: {
    // 退出登录操作
    signout () {
      this.$dialog
        .confirm({
          title: '退出登录',
          message: '你确定要退出登录吗?'
        })
        .then(() => {
          // 退出登录, 删除vuex和本地存储中的user
          return this.$store.commit('setUser', null)
        })
        .catch(() => {})
    },

    // 获取用户信息
    async getUserInfo () {
      try {
        const { data } = await userInfo()
        this.userInfo = data.data
      } catch (err) {
        console.log('获取用户信息失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 未登录页面样式
.no-login {
  height: 400px;
  background: url(~@/assets/banner.png);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .login-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .login-text {
      font-size: 28px;
      color: #fff;
    }
  }
}

// 已登录页面样式
.yes-login {
  height: 400px;
  background-color: #3396fa;
  padding: 0 32px;
  box-sizing: border-box;
  .login-userinfo {
    height: 270px;
    background: url(~@/assets/banner.png);
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        margin-right: 20px;
        border: 4px solid #fff;
      }
      .text {
        font-size: 30px;
        color: #fff;
      }
    }
    .right {
      .btn {
        font-size: 20px;
        color: #666;
        width: 114px;
        height: 32px;
        line-height: 32px;
      }
    }
  }
  .user-userinfo {
    height: 130px;
    display: flex;
    justify-content: space-between;
    .data-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
}

// 宫格导航
.grid-nav {
  .grid-item {
    height: 150px;
    .iconfont {
      font-size: 45px;
    }
    .icon-shoucang {
      color: #eb5253;
    }
    .icon-lishi {
      color: #ff9d1d;
    }
    .text {
      font-size: 28px;
      color: #333333;
    }
  }
}

// 单元格
.cell {
  .text {
    font-size: 26px;
  }
}

// 退出登录
.signout-btn {
  width: 100%;
  margin-top: 10px;
  background-clip: #fff;
  border: 0;
  color: #d86262;
  font-size: 26px;
}
</style>
