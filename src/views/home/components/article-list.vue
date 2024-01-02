<template>
  <div class="article-list">
    <!-- 下拉刷新 pull-refres -->
    <van-pull-refresh
      v-model="isreFreshLoading"
      @refresh="onRefresh"
      :success-text="onRefreshText"
      success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="你似乎来到了没有知识的荒原~~"
        :error.sync="error"
        error-text="网不太好~, 点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></article-item>

        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 导入API
import { ArticleList } from '@/api/article'

// 导入文章列表项组件
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      // List组件相关数据
      list: [],
      loading: false,
      finished: false,
      timestamp: null, // 刷新用的时间戳
      error: false, // 控制失败
      isreFreshLoading: false, // 控制下拉刷新
      onRefreshText: '刷新成功, gogogo~~' // 刷新成功的文本
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 获取数据
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await ArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })

        // 随机数模拟失败
        if (Math.random() > 0.9) {
          JSON.parse('error hahaha~~')
        }

        // 2.把本次请求的数据存放到list数组中
        const { results } = data.data
        this.list.push(...results)

        // 3.本次数据加载结束后把加载状态设置为结束
        this.loading = false

        // 4.判断数据是否全部加载完成
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        // 失败 取消加载
        this.error = true
        this.loading = false
      }
    },

    // 下拉更新数据
    async onRefresh () {
      try {
        // 1.请求数据
        const { data } = await ArticleList({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })

        // 随机数模拟失败
        if (Math.random() > 0.9) {
          JSON.parse('error hahaha~~')
        }

        // 2.追加数据 -- 最前端
        const results = data.data.results
        this.list.unshift(...results)

        // 3.关闭下来刷新的状态和文本
        this.isreFreshLoading = false
        this.onRefreshText = `刷新成功, 更新了${results.length}条数据`
      } catch (err) {
        this.isreFreshLoading = false
        this.onRefreshText = '刷新失败, 再试试来'
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 保存列表的滚动位置
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
