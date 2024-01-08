<template>
  <div class="comment-container">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言..."
      show-word-limit
    ></van-field>

    <van-button :disabled="!message.length" type="info" @click="onPostComment">
      发 布</van-button
    >
  </div>
</template>

<script>
import { postComment } from '@/api/comment'

export default {
  name: 'CommentPreview',
  data() {
    return {
      message: '',
    }
  },
  props: {
    target: {
      type: [Object, String, Number],
      required: true,
    },
    articleId: {
      type: [Object, String, Number],
      default: () => {},
    },
  },
  methods: {
    async onPostComment() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
        duration: 0, // 加载时间 0 --> 一直加载
      })

      try {
        const { data } = await postComment({
          target: this.target, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, // 评论内容
          art_id: this.articleId, // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })

        // 1.清空文本框
        this.message = ''

        // 2.关闭弹出层
        // 3.文本内容显示到顶层
        this.$emit('success-post', data.data)
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast('请登录后重试')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.comment-container {
  display: flex;
  align-items: center;
  /deep/ .van-cell {
    flex: 1;
    .van-field__control {
      height: 200px !important;
      padding: 20px;
      background-color: #f6f7fa;
    }
    .van-field__word-limit {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
  /deep/ .van-button {
    width: 160px;
    margin-right: 20px;
  }
}
</style>
