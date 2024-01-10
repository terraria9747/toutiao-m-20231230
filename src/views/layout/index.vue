<template>
  <div class="layout-container">
    <!-- 路由出口 -->
    <!-- 二级路由缓存 -->
    <keep-alive>
      <router-view />
    </keep-alive>

    <!-- TabBar标签页 -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span>{{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    // 添加LayoutIndex缓存
    this.$store.commit('addCachePage', 'LayoutIndex')
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    i.iconfont {
      font-size: 40px;
    }
    span {
      font-size: 20px;
    }
  }
}
</style>
