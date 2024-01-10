import Vue from 'vue'

// 导入dayjs插件
import dayjs from 'dayjs'

// 导入中文插件包
import 'dayjs/locale/zh-cn'

// 导入relativeTime插件包
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 配置使用中文插件
dayjs.locale('zh-cn') // 全局使用

// 时间格式化过滤器
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})

Vue.filter('relativeTime2', () => {
  return dayjs().format('YYYY-MM-DD')
})
