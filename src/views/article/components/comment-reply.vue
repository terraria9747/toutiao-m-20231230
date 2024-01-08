<template>
  <div class="reply-container">
    <van-nav-bar :title="commentReply.reply_count + ' 条回复'">
      <van-icon slot="left" name="cross" @click="$emit('goback')" />
    </van-nav-bar>
    <comment-item :comment="this.commentReply" />

    <comments-list
      :list="commentsList"
      :source="commentReply.com_id"
      type="c"
    />

    <!-- 底部 点赞|评论|收藏|转发 -->
    <div class="article-button">
      <van-button
        class="review"
        size="mini"
        round
        type="default"
        @click="popShow = true"
        >写评论...</van-button
      >
    </div>

    <!-- 写评论弹出层 -->
    <van-popup v-model="popShow" position="bottom" :style="{ height: '30%' }">
      <comment-preview
        :target="commentReply.com_id"
        :articleId="articleId"
        @success-post="onPostSuccess"
      ></comment-preview>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentsList from './comments-list.vue'
import CommentPreview from './comment-preview.vue'

export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentsList,
    CommentPreview,
  },
  props: {
    commentReply: {
      type: [Object],
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      popShow: false, // 弹出层默认关闭
      commentsList: [], // 文章评论的评论
    }
  },
  methods: {
    onPostSuccess(data) {
      // 关闭弹出层
      this.popShow = false
      // 更新回复数量
      this.commentReply.reply_count++
      // 数据显示到列表上方
      this.commentsList.unshift(data.new_obj)
    },
  },
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #ffffff !important;
  .van-nav-bar__title {
    color: #3a3a3a !important;
  }
  .van-icon {
    color: #3a3a3a !important;
  }
}
// <!-- 底部 点赞|评论|收藏|转发 -->
.article-button {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 88px;
  background: #fff;
  border-top: 1px solid #d8d8d8;
  display: flex;
  align-items: center;

  // 评论
  .review {
    width: 281px;
    height: 45px;
    line-height: 45px;
    font-size: 30px;
    color: #a7a7a7;
    margin: 0 auto;
  }
}
</style>
