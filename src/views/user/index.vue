<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="收藏 / 历史" left-arrow @click-left="onClickLeft" />

    <!-- 分页区域 -->
    <van-tabs v-model="active">
      <van-tab title="我的收藏">
        <collection-list />
      </van-tab>
      <van-tab title="我的历史">
        <history-list />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import collectionList from './components/collection-list'
import historyList from './components/history-list'

export default {
  name: 'CollectHistory',
  data () {
    return {
      active: 0
    }
  },
  components: {
    collectionList,
    historyList
  },
  created () {},
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.van-icon {
  color: #fff;
}

/deep/ .van-tabs__line {
  background-color: #3296fa;
}

.van-tab--active {
  color: #3296fa;
}
</style>
