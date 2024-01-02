<template>
  <van-cell class="article-item">
    <!-- 标题 -->
    <div slot="title" class="title">{{ article.title }}</div>
    <div slot="label" class="label">
      <!-- 三图片 -->
      <div v-if="article.cover.type === 3" class="cover-img-box">
        <van-image
          v-for="(img, index) in article.cover.images"
          :key="index"
          :src="img"
          class="cover-img"
        />
      </div>
      <!-- 底部信息 -->
      <div class="label-info">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 单图片 -->
    <van-image
      v-if="article.cover.type === 1"
      :src="article.cover.images[0]"
      class="cover-right-img"
      fit="cover"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      require: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.article-item {
  // 标题
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  // 单图片
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    margin-left: 25px;
    .cover-right-img {
      width: 232px;
      height: 146px;
    }
  }

  // 底部信息
  .label {
    // 底部信息
    .label-info span {
      font-size: 23px;
      color: #b4b4b4;
      margin-right: 28px;
    }

    // 三图片
    .cover-img-box {
      display: flex;
      margin: 30px 0;
      display: flex;
      .cover-img {
        flex: 1;
        width: 232px;
        height: 146px;
        &:not(:last-child) {
          padding-right: 4px;
        }
      }
    }
  }
}
</style>
