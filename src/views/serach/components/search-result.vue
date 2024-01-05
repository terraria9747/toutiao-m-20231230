<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad()"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
// 导入API
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10,
      error: false,
    }
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      try {
        // 1.发请请求
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText,
        })

        // 随机数模拟失败
        if (Math.random() > 0.9) {
          JSON.parse('error hahaha~~')
        }

        // 2. 存储数据
        const result = data.data.results
        this.list.push(...result)

        // 3.数据更新完毕后, 加载终止
        this.loading = false
        if (result.length) {
          this.page++
        } else {
          // 4.若数据已全部加载完毕, 完成操作
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
