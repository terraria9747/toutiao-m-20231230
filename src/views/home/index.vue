<template>
  <div class="home-container">
    <!-- 导航栏部分 -->
    <van-nav-bar class="van-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        icon="search"
        round
        class="search-btn"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable class="page-list">
      <van-tab :title="item.name" v-for="item in channelInfo" :key="item.id">
        <!-- 使用组件 -->
        <article-list :channel="item"></article-list>
      </van-tab>
      <!-- 占位符 -->
      <div slot="nav-right" class="placeholder"></div>
      <!-- 汉堡按钮 -->
      <div
        slot="nav-right"
        class="hamburg-btn"
        @click="isChannelInfoShow = true"
      >
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelInfoShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '80%' }"
    >
      <channel-edit
        :myChannel="channelInfo"
        :active="active"
        @change_active="changeActive"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
// 导入API
import { channelInfo } from '@/api/user'

// 导入组件
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utls/storage'

export default {
  name: 'HomeIndex',
  components: {
    // 注册组件
    ArticleList,
    ChannelEdit,
  },
  props: {},
  data() {
    return {
      active: 0,
      channelInfo: {},
      isChannelInfoShow: false, // 弹出框是否显示
    }
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {
    this.getChannelInfo()
  },
  mounted() {},
  methods: {
    async getChannelInfo() {
      try {
        // 正确显示数据
        let channel = []
        if (this.user) {
          const { data } = await channelInfo()
          channel = data.data.channels
        } else {
          // 本地存储的数据
          const localChannel = getItem('TOUTIAO_CHANNEL')
          if (localChannel) {
            // 本地存储有数据
            channel = localChannel
          } else {
            // 本地存储无数据
            const { data } = await channelInfo()
            channel = data.data.channels
          }
        }
        this.channelInfo = channel
      } catch (err) {
        this.$toast('获取用户频道失败')
      }
    },
    // 接收当前点击的按钮的索引--我的频道
    changeActive(index, isChannelInfoShow = true) {
      this.active = index
      this.isChannelInfoShow = isChannelInfoShow
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 100px;
  padding-top: 180px;
}

// 导航栏部分
.van-nav-bar {
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 60px;
    background-color: #5babfb;
    font-size: 28px;
    color: #fff;
    border: 0;
    .van-icon {
      font-size: 32px;
      color: #fff;
    }
  }
}

// 频道列表
/deep/ .page-list {
  .van-tabs__wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    z-index: 1;
  }
  .van-tabs__nav--line {
    padding: 0;

    .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
      min-width: 200px;
      .van-tab__text {
        font-size: 28px;
        color: #777;
      }
    }
    .van-tab--active {
      .van-tab__text {
        font-size: 30px;
        color: #333;
      }
    }
    .van-tabs__line {
      width: 30px !important;
      height: 6px;
      background-color: #3296fa;
      bottom: 15px;
    }

    // 占位盒子
    .placeholder {
      // 不占位
      flex-shrink: 0;
      width: 60px;
      height: 88px;
    }
    // 汉堡按钮
    .hamburg-btn {
      position: fixed;
      right: 0;
      width: 60px;
      height: 88px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      opacity: 0.9;
      i.iconfont {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 2px;
        height: 80px;
        background: url(~@/assets/gradient-gray-line.png);
      }
    }
  }
}
</style>
