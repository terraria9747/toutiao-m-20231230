<template>
  <div>
    <div
      v-for="(article, index) in collectList"
      :key="index"
      class="article-box"
    >
      <!-- 单元格 -->
      <van-cell class="article-item">
        <!-- 标题 -->
        <div slot="title" class="title">{{ article.title }}</div>
        <div slot="label" class="label">
          <!-- 三图片 -->
          <div v-if="article.cover.type === 3" class="cover-img-box">
            <van-image
              v-for="(img, index) in article.cover.Images"
              :key="index"
              :src="img"
              class="cover-img"
            />
          </div>

          <!-- 底部信息 -->
          <div class="label-info">
            <span>{{ article.aut_name }}</span>
            <span>{{ article.pubdate | relativeTime2 }}</span>
          </div>
        </div>

        <!-- 单图片 -->
        <van-image
          v-if="article.cover.type === 1"
          :src="article.cover.Images[0]"
          class="cover-right-img"
          fit="cover"
        />
      </van-cell>
      <!-- 宫格 -->
      <van-grid
        direction="horizontal"
        :column-num="3"
        icon-size="14px"
        clickable
      >
        <van-grid-item icon="comment-o" />
        <van-grid-item
          :icon="likeshow ? 'like' : 'like-o'"
          :class="likeshow ? 'like' : ''"
          @click="$toast('仅供演示')"
        />
        <van-grid-item
          :icon="starshow ? 'star' : 'star-o'"
          :class="starshow ? 'star' : ''"
          @click="$toast('仅供演示')"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getCollect } from '@/api/article'

export default {
  name: 'CollectList',
  data () {
    return {
      collectList: [],
      likeshow: true,
      starshow: true
    }
  },
  created () {
    this.loadCollect()
  },
  methods: {
    async loadCollect () {
      try {
        const { data } = await getCollect()
        const results = data.data.results
        this.collectList.push(...results)
        this.$toast.success('收藏列表获取成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取收藏列表失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-box {
  margin-bottom: 10px;
}

.like {
  color: #e43f31;
}

.star {
  color: #fbc21d;
}
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
