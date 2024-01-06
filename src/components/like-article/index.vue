<template>
  <van-icon
    :class="isLiked === 1 ? 'icon iconred' : 'icon'"
    :name="isLiked === 1 ? 'good-job' : 'good-job-o'"
    @click="onLike"
    :loading="this.loading"
  />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'

export default {
  name: 'LikeArticle',
  model: {
    prop: 'isLiked',
    event: 'upadte-liked'
  },
  props: {
    isLiked: {
      type: [Number],
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
    async onLike () {
      try {
        let status = -1
        if (this.isLiked === 1) {
          // 已经点赞 --> 取消点赞
          await deleteLike(this.userId)
        } else {
          // 没有点赞 --> 点赞
          await addLike(this.userId)
          status = 1
        }
        this.$emit('upadte-liked', status)
        this.$toast.success(this.isLiked === 1 ? '取消点赞' : '点赞完成')
      } catch (err) {
        let message = '点赞失败, 请稍后重试'
        if (err.response.status === 401) {
          message = '用户未认证, 请登录后重试'
        }
        this.$toast(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.iconred {
  color: red;
}
</style>
