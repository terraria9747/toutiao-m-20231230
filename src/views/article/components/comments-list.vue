<template>
  <div class="comments-container">
    <van-cell title="全部回复" style="font-size: 16px" />

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comments-items
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        @replay-click="$emit('replay-click', $event)"
      />
    </van-list>
  </div>
</template>

<script>
// 导入API
import { getcomments } from '@/api/comment'

// 导入文章评论项组件
import CommentsItems from './comment-item.vue'

export default {
  name: 'list',
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
    }
  },
  components: {
    CommentsItems,
  },
  props: {
    source: {
      type: [String, Object, Number],
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'a',
    },
  },
  created() {
    // this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        // 1.请求获取数据
        const { data } = await getcomments({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit, // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        // 2.数据添加到列表
        const results = data.data.results
        this.list.push(...results)

        // 向父组件传值 -- 评论数量
        this.$emit('update-count', data.data)

        // 3.loading关闭
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          // 有数据 -- 获取下一页
          this.offset = data.data.last_id
        } else {
          // 没有数据 -- finished结束
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.comments-container {
  padding: 100px 0;
}
</style>
