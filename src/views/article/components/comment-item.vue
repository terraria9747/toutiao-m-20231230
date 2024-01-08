<template>
  <div>
    <van-cell-group class="cell-box">
      <div class="left">
        <van-image class="img" round :src="comment.aut_photo" />
      </div>
      <div class="right">
        <div class="cell-top">
          <span class="title">{{ comment.aut_name }}</span>
          <span class="icon">
            <van-icon
              :name="comment.is_liking ? 'good-job' : 'good-job-o'"
              :class="comment.is_liking ? 'iconred' : ''"
              class="icon-tu"
              @click="onCommentLike"
              :loading="commentLoading"
            />
            <span class="icon-text">{{
              comment.like_count ? comment.like_count : '赞'
            }}</span>
          </span>
        </div>
        <div class="cell-content">{{ comment.content }}</div>
        <div class="cell-bottom">
          <span class="time">
            {{ comment.pubdate | relativeTime }}
          </span>
          <span class="huifu" @click="$emit('replay-click', comment)">
            {{ comment.reply_count }} 回复
          </span>
        </div>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'

export default {
  name: 'CommentsItems',
  props: {
    comment: {
      type: [String, Number, Object],
      required: true,
    },
  },
  data() {
    return {
      commentLoading: false,
    }
  },
  methods: {
    // 处理点赞
    async onCommentLike() {
      this.commentLoading = true
      try {
        if (this.comment.is_liking) {
          // 如果点赞了 --> 取消点赞
          await deleteCommentLike(this.comment.com_id)
          this.comment.like_count--
        } else {
          // 如果没有点赞 --> 点赞
          await addCommentLike(this.comment.com_id)
          this.comment.like_count++
        }
        this.comment.is_liking = !this.comment.is_liking
      } catch (err) {
        let message = '点赞失败👍, 请重试'
        if (err.response.status === 401) {
          message = '请登陆后重试'
        }
        this.$toast(message)
      }
      this.commentLoading = false
    },
  },
}
</script>

<style lang="less" scoped>
.cell-box {
  display: flex;
  padding: 20px 0 40px 0;
  .left {
    padding-right: 20px;
    width: 72px;
    height: 72px;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    display: flex;
    flex: 1;
    flex-direction: column;
    .cell-top {
      display: flex;
      justify-content: space-between;
      font-size: 30px;

      .title {
        color: #406599;
      }
      .icon {
        display: flex;
        .icon-tu {
          display: flex;
          align-items: center;
          padding-right: 10px;
        }
        .icon-text {
          display: flex;
          align-items: center;
        }
        .iconred {
          color: #ff0000;
        }
      }
    }
    .cell-content {
      display: flex;
      font-size: 32px;
      color: #222222;
      padding: 40px 0;
    }
    .cell-bottom {
      display: flex;
      font-size: 20px;
      color: #222222;
      .time {
        padding-right: 70px;
      }
    }
  }
}
</style>
