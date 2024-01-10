<template>
  <div>
    <van-tabs v-model="active" class="top">
      <van-icon name="arrow-left" class="icon" @click="$router.back()" />
      <van-tab disabled></van-tab>
      <van-tab title="关注">
        <like-list />
      </van-tab>
      <van-tab title="粉丝">
        <fans-list />
      </van-tab>
      <van-tab disabled></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import FansList from './components/fans-list'
import LikeList from './components/like-list'

export default {
  name: 'LikeFans',
  data () {
    return {
      active: 1
    }
  },
  components: {
    FansList,
    LikeList
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  /deep/ .van-tabs__nav {
    background-color: #3296fa;
    .van-tab__text {
      font-size: 30px;
      color: #ffffff;
    }
    .van-tab--active {
      .van-tab__text {
        font-weight: 600;
      }
    }
    .van-tabs__line {
      width: 46px !important;
      height: 4px;
      background-color: #fff;
    }
  }
  .icon {
    position: absolute;
    font-size: 32px;
    top: 30px;
    left: 20px;
    color: #fff;
  }
}
</style>
