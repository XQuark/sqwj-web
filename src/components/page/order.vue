<template>
<v-page ref="page">
    <v-content>
        <div class="address col col-center">
            <p class="user-info text-info row row-between">
                <span>收货人：{{addrInfo.consignee}}</span>
                <span>{{addrInfo.phone}}</span>
            </p>
            <p class="addr-info text-info">收货地址：{{addrInfo.details}}</p>
            <p class="shop-name text-info">店名：东方文具店</p>
        </div>

        <div class="colour-line"></div>

        <v-brand v-for="(item,index) in brandList" :key="item.brand.id" :brandInfo="item.brand">
            <p v-if="index === 0" slot="orderStatus" class="text-warn order-status">待收货</p>
            <v-pd v-for="pd in item.pds" :key="pd.id" :info="pd" class="order_pd" slot="pds">
                <p class="pd_amount" slot="">{{pd.$amount}}</p>
            </v-pd>
        </v-brand>
        
        <div class="settle_list-item row row-start">
            <p class="list-name text-p">运费</p>
            <div class="list-value row row-start">¥{{fee.logistics}}</div>
        </div>
        <div class="settle_list-item row row-start">
            <p class="list-name text-p">优惠</p>
            <div class="list-value detail-icon row row-start">¥10.00</div>
        </div>

        <div class="settle_list-item row row-start">
            <p class="list-name text-p">实付款（含运费）</p>
            <div class="text-warn-capest row row-start">¥{{fee.payAmount}}</div>
        </div>

        <div class="settle_list-item row-start">
            <p class="list-name text-p">卖家备注</p>
            <div class="list-value row row-start">周末休息，快递不要派送</div>
        </div>

        <div class="order-card">
            <p class="ctrlc">复制</p>
            <p class="text-order-card">订单编号：{{info.orderNo}}</p>
            <p class="text-order-card">下单时间：{{info.createdAtStr}}</p>
            <p class="text-order-card">付款时间：{{info.status !== 'SUBMITTED' ? info.paidAtStr : '未付款'}}</p>
            <p class="text-order-card">付款方式：{{info.status !== 'SUBMITTED' ? '微信支付' : '未付款'}}</p>
        </div>

        <div class="order-card">
            <p class="ctrlc">复制</p>
            <p class="text-order-b">物流公司：{{info.logisticsCompany}}</p>
            <p class="text-order-b">物流单号：{{info.logisticsOrderNo}}</p>
        </div>

    </v-content>

    <div v-if="info.status === 'SUBMITTED'" class="settle-btn row row-center" @click="pay">支付</div>

    <div v-if="info.status === 'SHIPPED'" class="settle-btn row row-center" @click="confirmReceived(info.id)">确认收货</div>


</v-page>

</template>
<script>
import axios from 'axios'
import querystring from 'querystring'
import pd from '../common/pd_item.vue'
import brand from '../car/brand.vue'
import content from '../common/content.vue'
import wx from '../common/wx.js'
// import bus from '../common/bus.js'
/* eslint-disable no-new */

export default {
    name: 'order',
    data () {
        return {
            info: {},
            wx: {},
            isPaing: false
        }
    },
    methods: {
        submit (addrId) {
            const url = '/order/submit?' + querystring.stringify({
                addressId: addrId,
                logistics: 'on',
                skuIds: this.$route.query.skuIds

            })
            return axios.post(url)
        },
        getPay (orderId) {
            let currentUrl = location.href.split('#')[0]
            const url = '/order/pay?' + querystring.stringify({
                orderId: orderId,
                payType: 'WEIXIN',
                currentUrl: encodeURIComponent(currentUrl)
            })
            return axios.post(url)
        },
        pay () {
            if (!this.isPaing && this.info.mainOrderId) {
                this.isPaing = true
                this.getPay(this.info.mainOrderId)
                    .then((res) => {
                        if (res.data.data) {
                            wx.config(res.data.data)
                            return wx.ready()
                        } else throw new Error('发起支付失败')
                    })
                    .then(() => {
                        wx.chooseWXPay()
                            .then((res) => {
                                this.$router.push({name: 'paySuccess', query: {orderId: this.info.mainOrderId}})
                            })
                            .catch((err) => {
                                if (err.reason === 'cancel') {
                                    this.$refs.page.alert('你已取消支付')
                                    // bus.alert('你已取消支付')
                                } else this.$refs.page.alert('微信浏览器支付接口调用失败')
                                this.isPaing = false
                            })
                    })
                    .catch((err) => {
                        this.$refs.page.alert(err)
                        this.isPaing = false
                        console.log(err)
                    })
            }
        },
        confirmReceived (id) {
            const url = '/v2/order/signed?orderId=' + id
            axios.post(url)
                .then((res) => {
                    if (res.data.data === true) {
                        this.init()
                    } else throw new Error('网络请求数据错误')
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getOrderInfo (id) {
            const url = '/v2/order/' + id
            return axios.post(url)
        },
        init () {
            this.getOrderInfo(this.orderId)
                .then((res) => {
                    if (res.data.data) {
                        this.info = res.data.data
                    } else throw new Error('请求数据错误')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },
    computed: {
        brandList () {
            if (this.info.orderItemVOs) {
                const brand = {}
                this.info.orderItemVOs.forEach((item) => {
                    if (brand[item.brand.id]) {
                        brand[item.brand.id].push(item)
                    } else brand[item.brand.id] = [item]
                })
                return Object.keys(brand).map((key) => {
                    return {
                        brand: brand[key][0].brand,
                        pds: brand[key].map((item) => {
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
                    }
                })
            } else return []
        },
        addrInfo () {
            return this.info.orderAddress || {}
        },
        fee () {
            const fee = {
                payAmount: 0,
                logistics: 0
            }
            if (this.info.orderFees) {
                const payAmount = this.info.orderFees.find((item) => {
                    return item.code === 'payAmount'
                })
                const logistics = this.info.orderFees.find((item) => {
                    return item.code === 'logistics'
                })
                fee.payAmount = payAmount.amount
                fee.logistics = logistics.amount
            }
            return fee
        }
    },
    components: {
        'v-pd': pd,
        'v-brand': brand,
        'v-content': content
    },
    created () {
        if (this.$route.params.id) {
            this.orderId = this.$route.params.id
            this.init()
        } else this.$router.go(-1)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .settle {
        width: 100%;
        background: #ffffff;
    }
    .address {
        flex: 0 0 1.4rem;
        padding: .1rem .1rem ;
        background: #FFFFFF;
    }   
    .user-info, .addr-info, .shop-name {
        align-self: stretch;
    }
    .shop-name {
        height: 0.2rem;
        line-height: 0.2rem;
        overflow: hidden;
    }
    .addr-info {
        height: .4rem;
        margin-top: .03rem;
        overflow: hidden;
    }
    .colour-line {
        width: 100%;
        height: .05rem;
        background: url(../../assets/line_colour.png) center/100% no-repeat;
    }
    .order_pd {
        padding: .1rem .15rem;
        border-top: solid 1px #000000;
        border-bottom: solid 1px #000000;
    }
    .settle_list-item {
        height: .45rem;
        border-bottom: solid 1px #E5E5E5;
        background: #FFFFFF;
    }
    .list-name {
        flex: 1 1;
        margin-left: .12rem;
        float: left;
        height: 100%;
        line-height:0.45rem;
    }
    .list-value {
        height: 100%;
        margin-left: .21rem;
        font-size: 14px;
        color: #666666;
        float: left;
    }
    .order-status {
        width: 100%;
        height: 0.3rem;
        padding-left: .15rem;
        text-align: left;
        line-height: 0.3rem;
        color: #E30059;
    }
    .settle-btn {
        width: 100%;
        height: .45rem;
        font-size: 18px;
        color: #FFFFFF;
        background: #000000;
    }
    .text-info {
        font-size: 14px;
        color: #636363;
        font-family: PingFang-SC-Medium;
    }

    .detail-icon {
        /* padding-right: .22rem; */
        /* background: url(../../assets/arrow_right.png) right center/.07rem no-repeat; */
    }
    .selected-icon {
        padding-right:  .3rem;
        background: url(../../assets/check_mark.png) right center/.2rem no-repeat;
    }
    .text-warn-capest {
        margin-right: .15rem;
        color: #E30059;
    }
    .order-card {
        margin: .1rem 0;
        padding: .08rem;
        background: #FFFFFF;
        position: relative;
    }
    .ctrlc{
        text-align: center;
        position: absolute;
        line-height: 0.18rem;
        width: 0.45rem;
        height: 0.18rem;
        right:0.13rem ;
        font-size: 11px;
        top:0.09rem ;
        z-index: 999;
        border:1px solid #636363;
        border-radius: 5px;
        color: #636363;
    }
    .text-order-card {
        font-size: 10px;
        line-height: 1.5;
        color: #636363;
    }
    .text-order-b {
        font-size: 12px;
        line-height: 1.5;
        color: #636363;
    }
</style>
