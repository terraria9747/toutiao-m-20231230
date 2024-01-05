<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in SearchSuggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="heightLight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
// 导入API
import { getSearchSuggestions } from '@/api/search'
// 导入防抖 lodash
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      SearchSuggestions: [], // 联想建议的信息
    }
  },
  watch: {
    // 监听输入的内容的变化
    searchText: {
      // 这里使用防抖 -- 控制请求过快的请求
      handler: debounce(function (value) {
        // 请求联想建议
        this.loadSearchSuggestions(value)
      }, 200),

      // 该回调将会在侦听开始之后被立即调用
      immediate: true,
    },
  },
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.SearchSuggestions = data.data.options
      } catch (err) {
        this.$toast('获取联想建议失败, 请稍后重试')
      }
    },
    // 字符串高亮显示
    heightLight(text) {
      // 高亮字符串
      const heightText = `<span class="active">${this.searchText}</span>`
      // 构造正则函数
      const reg = new RegExp(this.searchText, 'ig')
      // 字符串替换
      return text.replace(reg, heightText)
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .active {
  color: #3296fa;
}
</style>
