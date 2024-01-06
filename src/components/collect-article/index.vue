<template>
  <van-icon
    :name="isCollected ? 'star' : 'star-o'"
    :class="isCollected ? 'icon collect' : 'icon'"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
// 导入API
import { addCollect, deleteCollect } from '@/api/article'

export default {
  name: 'CollectArticle',
  model: {
    prop: 'isCollected',
    event: 'update-collected'
  },
  props: {
    isCollected: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        if (this.isCollected) {
          // 如果收藏了 --> 取消收藏
          await deleteCollect(this.userId)
          this.$toast.fail('取消收藏')
        } else {
          // 如果没收藏 --> 收藏
          await addCollect(this.userId)
          this.$toast.success('收藏成功')
        }
        this.$emit('update-collected', !this.isCollected)
      } catch (err) {
        let message = '收藏失败, 请稍后重试'
        if (err.response.status === 401) {
          message = '用户未认证, 请登录后重试'
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.collect {
  color: #f9c122;
}
</style>
