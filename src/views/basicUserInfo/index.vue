<template>
  <div>
    <!-- 顶部导航 -->
    <van-nav-bar
      :title="basiclist.name"
      left-arrow
      @click-left="$router.back()"
    >
      <van-icon slot="right" name="ellipsis" size="24" />
    </van-nav-bar>

    <!-- 个人信息部分 -->
    <div class="userinfo">
      <!-- 左侧图片 -->
      <div class="left">
        <div class="img">
          <van-image round :src="basiclist.photo" />
        </div>
      </div>

      <!-- 右侧信息 -->
      <div class="right">
        <!-- 个人信息 -->
        <div class="user_info">
          <div class="item">
            <div class="count">{{ basiclist.art_count }}</div>
            <div class="text">发布</div>
          </div>
          <div class="item">
            <div class="count">{{ basiclist.follow_count }}</div>
            <div class="text">关注</div>
          </div>
          <div class="item">
            <div class="count">{{ basiclist.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
          <div class="item">
            <div class="count">{{ basiclist.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </div>
        <!-- 关注按钮 -->
        <div class="user_btn">
          <van-button type="info">关注</van-button>
        </div>
      </div>
    </div>

    <!-- cell单元格 -->
    <van-cell-group>
      <van-cell>
        <span class="title">认证: </span>
        <span class="cont">{{ basiclist.id }}</span>
      </van-cell>
      <van-cell>
        <span class="title">简介: </span>
        <span class="cont">{{ basiclist.intro }}</span>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getUser } from '@/api/user'

export default {
  name: 'basicUserInfo',
  data () {
    return {
      basiclist: []
    }
  },
  created () {
    this.loadgetUser()
  },
  methods: {
    async loadgetUser () {
      try {
        const { data } = await getUser()
        this.basiclist = data.data
      } catch (err) {
        this.$toast.fail('获取数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 导航栏
.van-icon {
  color: #fff;
  font-size: 30px;
}

// 个人信息
.userinfo {
  display: flex;
  padding: 30px;
  justify-content: space-between;
  background-color: #ffffff;
  margin-bottom: 20px;
  .left {
    width: 130px;
    margin-right: 50px;
    .van-image {
      width: 130px;
      height: 130px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .right {
    flex: 1;
    .user_info {
      display: flex;
      justify-content: space-between;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .count {
          font-size: 30px;
          color: #0d0a10;
        }
        .text {
          font-size: 24px;
          color: #969493;
        }
      }
    }
    .user_btn {
      text-align: center;
      .van-button {
        margin-top: 20px;
        text-align: center;
        width: 290px;
        height: 50px;
        line-height: 50px;
        background-color: #6bb5ff;
        border: 0;
      }
    }
  }
}

.van-cell {
  .title {
    font-size: 28px;
    color: #686a73;
  }
  .cont {
    font-style: 28px;
    color: #0d0a10;
  }
}
</style>
