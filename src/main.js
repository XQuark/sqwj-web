// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/flex.css'
import '../static/css/text.css'
import 'onsenui/css/onsen-css-components.css'
import page from './components/common/page.vue'
import tabPage from './components/common/page_tab.vue'
import content from './components/common/content.vue'
import scrollY from './components/common/scroll_y.vue'
Vue.config.productionTip = false

Vue.filter('cutText', (value, max) => {
    let len = 0
    let s = ''
    for (let i in value) {
        let v = value[i]
        if (v.charCodeAt() < 127) {
            len += 1
        } else len += 2
        if (len <= max) {
            s += v
        } else {
            s += '...'
            break
        }
    }
    return s
})

Vue.filter('formatDate', (value, type) => {
    // 'ymd', ''
    if (typeof value === 'string' || typeof value === 'number') {
        let date = new Date(parseInt(value))
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minutes = date.getMinutes()
        if (type === 'ymdhn') {
            return `${year}-${month > 9 ? '' : '0'}${month}-${day > 9 ? '' : '0'}${day} ${hour > 9 ? '' : '0'}${hour} : ${minutes > 9 ? '' : '0'}${minutes}`
        } else return `${year}-${month > 9 ? '' : '0'}${month}-${day > 9 ? '' : '0'}${day}`
    } else return ''
})

Vue.component('v-page', page)
Vue.component('v-page-tab', tabPage)
Vue.component('v-content', content)
Vue.component('v-scroll-y', scrollY)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
