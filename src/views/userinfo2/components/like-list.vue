<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in likelist" :key="index">
        <van-cell-group>
          <van-cell class="cell-box">
            <div class="left">
              <div class="avatar">
                <van-image :src="item.photo" round />
              </div>
              <div class="info">
                <div class="title">{{ item.name }}</div>
                <div class="like">关注数: {{ item.fans_count }}</div>
              </div>
            </div>
            <div class="right">
              <!-- true是false不是 -->
              <van-button
                :type="item.mutual_follow ? 'default' : 'danger'"
                size="small"
                disabled
                >{{ item.mutual_follow ? '相互关注' : '关注' }}</van-button
              >
            </div>
          </van-cell>
        </van-cell-group></van-cell
      >
    </van-list>
  </div>
</template>

<script>
import { getLike } from '@/api/user'

export default {
  name: 'LikeList',
  data () {
    return {
      likelist: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async onLoad () {
      try {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        const { data } = await getLike()
        const results = data.data.results
        this.likelist.push(...results)
        console.log(this.likelist)
        // 加载状态结束
        if (results.length > 0) {
          this.loading = false
        }

        this.finished = true
        this.$toast.success('获取数据成功')
      } catch (err) {
        this.$toast.fail('获取数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell {
  .avatar {
    .van-image {
      width: 80px;
      height: 80px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.cell-box {
  display: flex;
  .van-cell__value {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      .avatar {
        padding-right: 20px;
      }
      .info {
        .title {
          font-size: 28px;
          color: #222;
        }
        .like {
          font-size: 22px;
          color: #999;
        }
      }
    }
  }
}
</style>
