<template>
<v-page ref="page" :class="{'white-bg': !menus[currentIndex].data.length}">
<v-scroll-y ref="scroller" @pullingUp="OnpullingUp">
        <div class="menu row row-around">
            <div v-for="(item,index) in menus" class="menu-item row" :class="{'menu-item-active': currentIndex===index}" @click="checkout(index)">{{item.name}}</div>
        </div>
        <router-link v-for="order in menus[currentIndex].data" :to="{name: 'order', params: {id: order.id}}" :key="order.id" class="order-item">
            <div class="order-head row row-between">
                <p class="text-warn text-status">待收货</p>
                <p class="text-p-low">订单号：{{order.orderNo}}</p>
            </div>
            <v-pd v-for="item in order.pds" :info="item" :key="item.id">
                <p class="pd_amount">{{item.$amount}}</p>
            </v-pd>
            <div class="order-footer row row-between">
                <p class="text-p">共{{order.orderItemVOs.length}}件商品</p>
                <p class="row row-between">
                    <span class="text-fee">合计：</span>
                    <span class="text-warn">¥{{order.totalFee}}</span>
                    <span class="text-fee-lowest">（含运费¥{{order.logisticsFee}}）</span>
                </p>
            </div>

            <div v-if="order.status === 'SUBMITTED'" class="row-list row row-end">
                <router-link class="done-btn row row-center text-p">付款</router-link>
            </div>

            <div v-if="order.status === 'SHIPPED'" class="row-list row row-end">
                <div class="done-btn row row-center text-p">确认收货</div>
            </div>

        </router-link>

        <v-empty v-if="!menus[currentIndex].data.length">
            <p slot="title">还没有任何订单</p>
            <p slot="des">赶快去逛一逛吧～</p>
        </v-empty>

        
    </div>
</v-scroll-y>
</v-page>
</template>

<script>
import pd from '../common/pd_item.vue'
import empty from '../common/empty.vue'
import axios from 'axios'
/* eslint-disable no-new */
// import pd from '../common/pd_collected.vue'
export default {
    name: 'myOrders',
    data () {
        return {
            menus: [
                this.createTab(0, 'all', '全部'),
                this.createTab(1, 'SUBMITTED', '待付款'),
                this.createTab(2, 'PAID', '待发货'),
                this.createTab(3, 'SHIPPED', '待收货'),
                this.createTab(4, 'SUCCESS', '已完成')
            ],
            currentIndex: 0,
            originData: []
        }
    },
    methods: {
        getOrderList (page, size, type) {
            const url = '/v2/order/list/' + type + '?size=' + size + '&page=' + page
            return axios.post(url)
        },
        checkout (index) {
            this.currentIndex = index
            if (!this.menus[index].data.length) {
                this.OnpullingUp()
            }
        },
        createTab (index, type, name) {
            return {
                index: index,
                name: name,
                type: type,
                data: [],
                page: 0,
                size: 3,
                isMore: true
            }
        },
        translatedPdInfo (originData) {
            originData.forEach((order) => {
                order.pds = order.orderItemVOs.map((item) => {
                    return {
                        id: item.id,
                        $pdUrl: item.productImgUrl,
                        $categorys: item.categorys,
                        $pdColor: item.colorStr,
                        $skuSize: item.skuStr,
                        $originPrice: item.marketPrice,
                        $price: item.price,
                        $amount: item.amount
                    }
                })
            })
            return originData
        },
        getNextPage () {
            const tab = this.menus[this.currentIndex]
            if (tab.isMore) {
                return this.getOrderList(tab.page, tab.size, tab.type)
                    .then((res) => {
                        const data = res.data.data
                        if (data) {
                            if (data.length < tab.size) {
                                tab.isMore = false
                            }
                            tab.page ++
                            tab.data = tab.data.concat(this.translatedPdInfo(data))
                        } else throw new Error('网络请求数据错误')
                    })
            } else return Promise.reject('所有数据以加载完毕')
        },
        OnpullingUp () {
            this.getNextPage()
                .then(() => {
                    this.$refs.scroller.finishPullUp()
                })
                .catch(() => {
                    this.$refs.scroller.finishPullUp()
                })
        }
    },
    components: {
        'v-pd': pd,
        'v-empty': empty
    },
    computed: {

    },
    watch: {

    },
    created () {
        this.checkout(0)
    },
    mounted () {

    }
}
</script>
<style scoped>
    .wraper {
        width: 100%;
    }
    .page-team {
        width: 100%;
        background: #f4f4f4;
    }
    .menu {
        /*flex: 0 0 .4rem;*/
        height: .4rem;
        width: 100%;
        background: #ffffff;
    }
    .menu-item {
        box-sizing: border-box;
        height: 100%;
        padding: 0 .08rem;
        font-size: 14px;
        color: #666666;
    }
    .menu-item-active {
        border-bottom: solid 2px #000000;
        /*font-size: 14px;*/
        /*color: #2EB779;*/
    }
    .order-item {
        display: block;
        width: 100%;
        margin-top: .1rem;
        background: #ffffff;
    }
    .order-head {
        height: .35rem;
        padding: 0 .1rem;
        border-bottom: solid 1px #F0F0F0;
    }
    .order-footer {
        height: .45rem;
        padding: 0 .1rem;
        border-top: solid 1px #F0F0F0;
    }
    .text-fee {
        font-size: 14px;
        color: #636363;
    }
    .text-fee-lowest {
        font-size: 10px;
        color: #636363;
    }
    .group-item {
        margin-bottom: .1rem;
        background: #ffffff;
    }
    .group-head {
        width: 100%;
        height: .44rem;
        border-bottom: solid 1px #F0F0F0;
        border-top: solid 1px #F0F0F0;
    }
    .group-status {
        margin-left: .1rem;
    }
    .group-invite-btn {
        width: 1rem;
        height: .2rem;
        margin-right: .1rem;
        border: solid 1px #FF5400;
        border-radius: .05rem;
    }
    .group-content {
        width: 100%;
        height: 1rem;
    }
    .row-list {
        width: 100%;
        height: .45rem;
        border-top: solid 1px #F0F0F0;
        background: #FFFFFF;
    }
    .done-btn {
        width: .7rem;
        height: .2rem;
        margin-right: .1rem;
        border: solid 1px #000000;
    }
    .text-status{
        color:#E30059;
    }
</style>
