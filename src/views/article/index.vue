<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <div class="nav-box">
      <van-nav-bar title="头条项目练习">
        <van-icon
          class="nav-icon"
          slot="left"
          name="arrow-left"
          @click="$router.back()"
        />
        <van-icon class="nav-icon" slot="right" name="ellipsis" />
      </van-nav-bar>
    </div>

    <div class="article-box">
      <!-- 加载框 -->
      <div v-if="loading" class="loading-box">
        <van-loading class="loading" size="24px" vertical>加载中</van-loading>
      </div>

      <div v-else class="article-message markdown-body" ref="articleDetailRef">
        <!-- 正确信息 -->
        <div v-if="articleDetail.title" class="success">
          <!-- 标题 -->
          <div class="title-box">
            {{ articleDetail.title }}
          </div>

          <!-- 用户信息 -->
          <div class="userinfo-box">
            <div class="left">
              <div class="avatar">
                <van-image
                  round
                  class="avatar-img"
                  :src="articleDetail.aut_photo"
                />
              </div>
              <div class="message">
                <span class="usertitle">{{ articleDetail.aut_name }}</span>
                <span class="time">{{
                  articleDetail.pubdate | relativeTime
                }}</span>
              </div>
            </div>
            <div class="right">
              <!--
                :is-followed="articleDetail.is_followed"
                @change-follow="articleDetail.is_followed = $event"

                当父组件传递给子组件的数据既要使用又要修改, 可以使用v-model
                v-model
               -->
              <!-- 按钮组件 -->
              <follow-user
                :user-id="articleDetail.aut_id"
                v-model="articleDetail.is_followed"
              />
            </div>
          </div>

          <!-- 正常内容 -->
          <div class="atricle-detail">
            <p v-html="articleDetail.content"></p>
          </div>

          <!-- 正文结束分割线 -->
          <van-divider
            class="atricle-divider"
            :style="{ color: '#b4b4b4', borderColor: '#b4b4b4' }"
          >
            正文结束
          </van-divider>

          <!-- 评论列表组件 -->
          <comments-list
            :source="articleId"
            @update-count="commentcount = $event.total_count"
            :list="commentsList"
            @replay-click="onReplyClick"
          />
        </div>

        <!-- 404, 你似乎来到了没有知识的荒原 -->
        <div v-else-if="this.statusCode === 404" class="error-warp">
          <div class="error-icon-text">/404/</div>
          <p class="error-text">你似乎来到了没有知识的荒原</p>
        </div>

        <!-- 网络错误, 重新加载 -->
        <div v-else class="error-warp">
          <van-icon class="error-icon" name="failure" />
          <p class="error-text">您的网络好像有点问题😶😶</p>
          <van-button
            class="error-btn"
            size="small"
            type="default"
            @click="loadArticle"
            >点击重试</van-button
          >
        </div>

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
          <van-icon class="icon" name="chat-o" :info="this.commentcount" />
          <!-- 收藏组件 -->
          <collect-article
            :userId="articleDetail.art_id"
            v-model="articleDetail.is_collected"
          />
          <!-- 点赞组件 -->
          <like-article
            :userId="articleDetail.art_id"
            v-model="articleDetail.attitude"
          />
          <van-icon class="icon" name="friends-o" />
        </div>

        <!-- 写评论弹出层 -->
        <van-popup
          v-model="popShow"
          position="bottom"
          :style="{ height: '30%' }"
        >
          <comment-preview
            :target="articleDetail.art_id"
            @success-post="SuccessPost"
          ></comment-preview>
        </van-popup>

        <!-- 回复评论弹出层 -->
        <van-popup
          v-model="replyShow"
          position="bottom"
          :style="{ height: '80%' }"
          class="reply"
        >
          <!-- 关闭页面销毁组件 -->
          <comment-reply
            v-if="replyShow"
            :commentReply="commentReply"
            :articleId="articleId"
            @goback="replyShow = false"
          />
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
// 导入API
import { getArticleById } from '@/api/article'

// 导入 ImagePreview 图片预览组件
import { ImagePreview } from 'vant'

// 导入公共组件
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
// 导入评论列表组件
import CommentsList from './components/comments-list.vue'
import CommentPreview from './components/comment-preview.vue'
import CommentReply from './components/comment-reply.vue'

export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentsList,
    CommentPreview,
    CommentReply
  },
  data () {
    return {
      articleDetail: {}, // 文章详细数据
      loading: true, // 是否有加载效果
      statusCode: 0, // 响应状态码
      followloding: false, // loading加载
      commentcount: 0, // 评论数量
      popShow: false, // 写评论弹出框
      replyShow: false, // 回复评论弹出框
      commentsList: [],
      commentReply: [] // 回复评论
    }
  },
  created () {
    this.loadArticle()
    console.log('组件缓存')
  },
  methods: {
    // 根据id获取文章详细信息
    async loadArticle () {
      try {
        this.loading = true
        const { data } = await getArticleById(this.articleId)

        // 随机数模拟网络问题
        if (Math.random() > 0.9) {
          JSON.parse('error hahaha~~')
        }

        // 数据驱动视图 不是立即的
        // 获取img的DOM节点
        setTimeout(() => {
          this.imagePreview()
        }, 0)

        this.articleDetail = data.data
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.statusCode = 404
        }
      }
      // 无论加载成功还是失败 都需要关闭加载效果
      this.loading = false
    },
    // 图片预览效果
    imagePreview () {
      const articleImg = this.$refs.articleDetailRef
      // 获取图片地址
      const articleAllImg = articleImg.querySelectorAll('img')
      const images = []
      // 遍历img, 注册点击事件
      articleAllImg.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          // 图片预览
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    // 成功评论之后
    SuccessPost (data) {
      // 2.关闭弹出层
      this.popShow = false
      // 3.文本内容显示到顶层
      this.commentsList.unshift(data.new_obj)
    },
    // 点击回复按钮
    onReplyClick (data) {
      this.commentReply = data
      this.replyShow = true
    }
  }
}
</script>

<style lang="less" scoped>
// 导入github-markdown-css样式文件
@import './github-markdown.css';
.article-container {
  background-color: #fff;
  padding-top: 92px;
  // 导航栏部分
  .nav-box {
    height: 92px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
    // icon图标
    .nav-icon {
      font-size: 36px;
      color: #fff;
    }
  }
  // 底部 点赞|评论|收藏|转发
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
      padding-right: 110px;
      margin: 0 45px;
    }

    // icon图标
    .icon {
      flex: 1;
      font-size: 45px;
      .van-info {
        top: 5px;
        right: 45px;
        border: 0;
      }
    }
    .icon:last-child {
      margin-right: 25px;
    }
  }
  .article-box {
    padding: 0 50px;

    // 加载框
    .loading-box {
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      .loading {
        color: #3296fa;
        justify-content: center;
        align-items: center;
      }
    }
    // 标题
    .title-box {
      padding: 50px 0;
      font-size: 40px;
      font-weight: 700;
      color: #3a3a3a;
    }
    // 用户信息
    .userinfo-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        // 头像
        .avatar {
          width: 70px;
          height: 70px;
          .avatar-img {
            width: 100%;
            height: 100%;
          }
        }
        // 用户信息
        .message {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 18px;
          .usertitle {
            font-size: 24px;
            color: #333333;
            padding-bottom: 9px;
          }
          .time {
            font-size: 22px;
            color: #b4b4b4;
          }
        }
      }
      .right {
        display: flex;
        justify-content: center;

        .attentionBtn {
          width: 170px;
          height: 58px;
          font-size: 22px;
        }
      }
    }
    // 正常内容
    .atricle-detail {
      padding-top: 20px;
      font-size: 34px;
    }
    // 错误提示
    .error-warp {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #b4b2b4;
      height: 400px;
      .error-icon {
        font-size: 100px;
      }
      .error-icon-text {
        font-size: 100px;
        font-weight: 700;
      }
      .error-text {
        font-size: 26px;
      }
      .error-btn {
        background-color: #f5f7f9;
        color: #b4b2b4;
        width: 200px;
      }
    }
    // 分割线
    .atricle-divider {
      padding-bottom: 100px;
    }
  }
  .reply-container {
    padding: 0 40px;
  }
}
</style>
