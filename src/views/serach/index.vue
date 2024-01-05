<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="focusSearch"
        class="searchbox"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-suggestion>

    <!-- 历史记录 -->
    <search-history
      v-else
      :serch-historys="SerchHistorys"
      @search="onSearch"
      @update-histories="SerchHistorys = $event"
    ></search-history>
  </div>
</template>

<script>
// 导入组件
import searchResult from './components/search-result.vue'
import searchHistory from './components/search-history.vue'
import searchSuggestion from './components/search-suggestion.vue'
import { setItem, getItem } from '../../utls/storage'
import { mapState } from 'vuex'

export default {
  name: 'SearchMessage',
  data() {
    return {
      searchText: '',
      isResultShow: false,
      SerchHistorys: [], // 历史记录数据
    }
  },
  components: {
    // 注册组件
    searchResult,
    searchHistory,
    searchSuggestion,
  },
  created() {
    this.loadSearchHistory()
  },
  watch: {
    SerchHistorys() {
      // watch监听 searchHistory数据的变化
      setItem('TOUTIAO_HISTORY', this.SerchHistorys)
    },
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    onSearch(val) {
      // 重新赋值
      this.searchText = val

      // 搜索的时候记录历史记录
      // 去重历史记录的数据
      const index = this.SerchHistorys.indexOf(val)
      if (index !== -1) {
        this.SerchHistorys.splice(index, 1)
      }
      // 存储历史记录数据
      this.SerchHistorys.unshift(val)
      // watch监听
      // setItem('TOUTIAO_HISTORY', this.SerchHistorys)

      // 显示搜索结果页面
      this.isResultShow = true
    },
    // 加载历史记录
    loadSearchHistory() {
      let serchhistorys = getItem('TOUTIAO_HISTORY') || []
      if (this.user) {
        // 如果登录 -- 线上存储获取数据
        // 虚假数据 -- 模拟接口获取的数据
        const texthistorys = ['前端', '后端', '虚假数据']
        // 数组去重
        serchhistorys = [...new Set([...serchhistorys, ...texthistorys])]
      }

      // 登录和未登录的状态 -- 本地数据和后台数据合并显示
      this.SerchHistorys = serchhistorys
    },

    onCancel() {
      this.$router.back()
    },
    focusSearch() {
      this.isResultShow = false
    },
  },
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  // 取消按钮
  .van-search__action {
    color: #fff;
  }
  .searchbox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
