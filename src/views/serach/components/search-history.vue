<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('update-histories', [])">全部删除 </span>
        <span @click="isDeleteShow = false"> 完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
    </van-cell>
    <van-cell
      v-for="(history, index) in SerchHistorys"
      :title="history"
      :key="index"
      @click="onDelete(history, index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
import { setItem } from '@/utls/storage'

export default {
  name: 'SearchHistory',
  data() {
    return {
      isDeleteShow: false, // 是否删除图标
    }
  },
  props: {
    SerchHistorys: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onDelete(history, index) {
      // 删除状态
      if (this.isDeleteShow) {
        this.SerchHistorys.splice(index, 1)
        // 数据持久化删除
        // return setItem('TOUTIAO_HISTORY', this.SerchHistorys)
        return
      }
      // 非删除状态
      this.$emit('search', history)
    },
  },
}
</script>

<style lang="less" scoped></style>
