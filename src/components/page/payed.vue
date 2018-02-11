<template>
<v-page>
    <div class="head-bg">
        <p class="head_title  row-center">已付款成功</p>
        <p class="head_p  row-center">您的包裹已整装待发</p>
    </div>

    <div class="address col col-center">
        <p class="user-info row row-between">
            <span>收货人：{{addrInfo.consignee}}</span>
            <span>{{addrInfo.phone}}</span>
        </p>
        <p class="addr-info">收货地址：{{addrInfo.details}}</p>
    </div>

    <p class="order-price row-list">总价：
        <span class="text-warn-cap">¥</span>
        <span class="text-warn">{{fee}}.</span>
        <span class="text-warn-low">00</span>
    </p>

    <div class="row-list row row-around">
        <router-link class="simple-btn" :to="{name: 'order' , params: {id: orderInfo.id}}">查看订单</router-link>
        <router-link class="simple-btn" :to="{name: 'home'}">返回首页</router-link>
    </div>
</v-page>

</template>
<script>
import axios from 'axios'
// import querystring from 'querystring'

/* eslint-disable no-new */

export default {
    name: 'payed',
    data () {
        return {
            orderInfo: {}
        }
    },
    methods: {
        getOrderInfo (orderId) {
            const url = '/v2/mainOrder/' + orderId
            return axios.post(url)
        },
        init (orderId) {
            this.getOrderInfo(orderId)
                .then((res) => {
                    if (res.data.data) {
                        this.orderInfo = res.data.data
                    } else throw new Error('请求数据错误')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },
    computed: {
        addrInfo () {
            if (this.orderInfo.orderAddress) {
                return this.orderInfo.orderAddress
            } else return {}
        },
        fee () {
            if (this.orderInfo.orderFees) {
                return this.orderInfo.orderFees.find((item) => {
                    return item.code === 'payAmount'
                }).amount
            } else return 0
        }
    },
    components: {

    },
    created () {
        if (this.$route.query.orderId) {
            this.init(this.$route.query.orderId)
        } else this.$route.go(-1)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .head-bg {
        width: 100%;
        height: 1rem;
        background: url(../../assets/over.png) left top/contain no-repeat;
        background-size: 100% 100%;
    }
    .head_title {
        margin-top: .3rem;
        margin-left: 1.51rem;
        font-size: 16px;
        color: #FFFFFF;
    }
    .head_p {
        margin-top: .09rem;
        margin-left: 1.51rem;
        font-size: 14px;
        color: #FFFFFF;
    }
    .address {
        box-sizing: border-box;
        width: 100%;
        height: .8rem;
        padding: .1rem;
        border-bottom: solid 1px #F5F5F5;
        background: #FFFFFF;
    }   
    .user-info, .addr-info {
        align-self: stretch;
        font-size: 14px;
        color: #636363;
    }
    .addr-info {
        height: .4rem;
        margin-top: .03rem;
        overflow: hidden;
    }
    .order-price {
        padding: .08rem;
        font-size: 14px;
        color: #000000;
        background: #FFFFFF;
    }
    .row-list {
        align-self: stretch;
        padding-left: .08rem;
        padding-right: .08rem;
        background: #FFFFFF;
    }
    .row-list span{
        color: #e30059;
    }

    .simple-btn {
        height: .2rem;
        margin-top: .25rem;
        margin-bottom: .1rem;
        padding: 0 .06rem;
        border: solid 1px #666666;
        font-size: 14px;
        color: #010101;
    }
    .order-notice {
        margin-top: .1rem;
        padding-top: .1rem;
        padding-bottom: .1rem;
        line-height: 1.5;
    }
</style>
