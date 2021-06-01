import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 相对时间
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')

dayjs.extend(relativeTime)

Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
