import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/index.vue'
import car from '@/components/car/index.vue'
// import pd from '@/components/product/index.vue'
// import integral from '@/components/integral/index.vue'

import me from '@/components/me/index.vue'
import myOrder from '@/components/me/my_order.vue'
import myAddress from '@/components/me/my_address.vue'
import address from '@/components/me/address.vue'
import myInfo from '@/components/me/my_info.vue'
import infoPhone from '@/components/me/info_phone.vue'
import infoDate from '@/components/me/info_date.vue'
import myCollection from '@/components/me/my_collection.vue'
import myIntegration from '@/components/me/my_integration.vue'

import pd from '@/components/product/index.vue'

import pdList from '@/components/page/productList.vue'
import resultPds from '@/components/page/searched_pdlist.vue'
import tagList from '@/components/page/taglist.vue'
import settle from '@/components/page/settle.vue'
import payed from '@/components/page/payed.vue'
import order from '@/components/page/order.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            alias: '/home',
            component: home
        },
        {
            path: '/car',
            name: 'car',
            component: car
        },
        {
            path: '/me',
            name: 'me',
            component: me
        },
        {
            path: '/me/info',
            name: 'myInfo',
            component: myInfo
        },
        {
            path: '/me/info/phone',
            name: 'infoPhone',
            component: infoPhone
        },
        {
            path: '/me/info/date',
            name: 'infoDate',
            component: infoDate
        },
        {
            path: '/me/order',
            name: 'myOrder',
            component: myOrder
        },
        {
            path: '/me/address',
            name: 'myAddress',
            component: myAddress
        },
        {
            path: '/address/edit/:id',
            name: 'addressEdit',
            component: address
        },
        {
            path: '/address/create',
            name: 'addressCreate',
            component: address
        },
        {
            path: '/me/collection',
            name: 'myCollection',
            component: myCollection
        },
        {
            path: '/me/integration',
            name: 'myIntegration',
            component: myIntegration
        },
        {
            path: '/product/:id',
            name: 'product',
            component: pd
        },
        {
            path: '/pdlist',
            name: 'pdList',
            component: pdList,
            meta: {
                keepAlive: true
              }
        },
        {
            path: '/taglist',
            name: 'tagList',
            component: tagList
        },
        {
            path: '/resultpds',
            name: 'resultPds',
            component: resultPds
        },
        {
            path: '/settle',
            name: 'settle',
            component: settle
        },
        {
            path: '/payed',
            name: 'paySuccess',
            component: payed
        },
        {
            path: '/order/:id',
            name: 'order',
            component: order
        }
    ]
})
