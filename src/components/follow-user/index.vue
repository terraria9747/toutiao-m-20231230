<template>
  <!-- 已经关注 -->
  <van-button
    v-if="Followed"
    class="attentionBtn"
    border="0"
    type="default"
    size="small"
    round
    @click="onFollow"
    :loading="this.loading"
    >已关注</van-button
  >
  <!-- 没有关注 -->
  <van-button
    v-else
    class="attentionBtn"
    border="0"
    type="info"
    size="small"
    round
    @click="onFollow"
    :loading="this.loading"
    >+ 关注</van-button
  >
</template>

<script>
import { getfollow, deletefollow } from '@/api/user'

export default {
  name: 'FollowUser',
  model: {
    prop: 'Followed',
    event: 'update-followed'
  },
  props: {
    Followed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [String, Object, Number],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    // 关注用户/取消关注
    async onFollow () {
      this.loading = true
      try {
        if (this.Followed) {
          // 如果关注
          await deletefollow(this.userId)
        } else {
          // 如果没有关注
          await getfollow(this.userId)
        }
        // this.Followed = !this.Followed
        this.$emit('update-followed', !this.Followed)
      } catch (err) {
        let message = '未登录, 请登录一下'
        if (err.response.status === 400) {
          message = '用户不能关注自己哦'
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }
}
</script>
