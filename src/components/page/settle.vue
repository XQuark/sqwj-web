<template>
<v-page class="white-bg" ref="page">
    <v-content>
        <router-link :to="{name: 'myAddress'}" class="address col col-center">
            <p v-if="addrInfo === null" class="addr-info text-warn-cap">请前往添加地址</p>
            <template v-else>
                <p class="user-info text-info row row-between">
                    <span>收货人：{{addrInfo.consignee}}</span>
                    <span>{{addrInfo.phone}}</span>
                </p>
                <p class="addr-info text-info">收货地址：{{addrInfo.details}}</p>
                <p class="shop-name text-info">店名：东方文具店</p>
            </template>
        </router-link>

        <div class="colour-line"></div>

        <v-brand v-for="item in brandList" :key="item.brand.id" :brandInfo="item.brand">
            <v-pd v-for="pd in item.pds" :key="pd.id" :info="pd" class="order_pd" slot="pds">
                <p class="pd_amount">{{pd.$amount}}</p>
            </v-pd>
        </v-brand>
        
        <div class="settle_list-item row row-start">
            <p class="list-name text-p">运费</p>
            <div class="list-value row row-start">¥{{fee.logisticsFee}}</div>
        </div>

        <div class="settle_list-item row row-start">
            <p class="list-name text-p">优惠</p>
            <div class="list-value detail-icon row row-start">¥10.00</div>
        </div>

        <div class="settle_list-item  row-start">
            <p class="list-name text-p user-remark" >买家备注</p>
            <div class="list-value remark  row-start"><input placeholder="请输入你想对卖家说的话"/></div>
        </div>


    </v-content>

    <div class="footer row row-between">
        <div class="confirm-info row row-start">
            <span class="confirm-title">总价: </span>
            <span class="confirm-num">￥{{fee.totalFee}}</span>
            <span class="confirm-des">含运费</span>
        </div>
        <div class="confirm-btn row row-center text" @click="addrInfo && pay()">去支付</div>
    </div>

</v-page>

</template>
<script>
import axios from 'axios'
import querystring from 'querystring'
import pd from '../common/pd_item.vue'
import brand from '../car/brand.vue'
import content from '../common/content.vue'
import wx from '../common/wx.js'
/* eslint-disable no-new */

export default {
    name: 'settle',
    data () {
        return {
            info: {},
            wx: {},
            isPaing: false
        }
    },
    methods: {
        init () {
            this.getOrderInfo(this.$route.query.skuIds)
                .then((res) => {
                    if (res.data.data) {
                        this.info = res.data.data
                    } else throw new Error('请求数据错误')
                })
                .catch((err) => {
                    console.log(err)
                })
        },
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
            let orderId
            if (!this.isPaing) {
                this.isPaing = true
                this.submit(this.addrInfo.id)
                    .then((res) => {
                        if (res.data.data && res.data.errorCode === 200) {
                            orderId = res.data.data
                            return this.getPay(res.data.data)
                        } else throw new Error('订单提交失败')
                    })
                    .then((res) => {
                        if (res.data.data) {
                            wx.config(res.data.data)
                            return wx.ready()
                        } else throw new Error('发起支付失败')
                    })
                    .then(() => {
                        wx.chooseWXPay()
                            .then((res) => {
                                this.$router.push({name: 'paySuccess', query: {orderId: orderId}})
                            })
                            .catch((err) => {
                                if (err.reason === 'cancel') {
                                    this.$refs.page.alert('你已取消支付')
                                } else this.$refs.page.alert('微信浏览器支付接口调用失败')
                                this.isPaing = false
                            })
                    })
                    .catch((err) => {
                        this.isPaing = false
                        console.log(err)
                    })
            }
        },
        getOrderInfo (skuIds) {
            const url = '/v2/cart/next?' + querystring.stringify({skuId: skuIds})
            return axios.post(url)
        }
    },
    computed: {
        brandList () {
            if (this.info.cartItemMap) {
                return Object.keys(this.info.cartItemMap).map((key) => {
                    return {
                        brand: this.info.cartItemMap[key][0].brand,
                        pds: this.info.cartItemMap[key].map((item) => {
                            return {
                                id: item.id,
                                $pdUrl: item.product.imgUrl,
                                $categorys: item.product.categorys,
                                $pdColor: item.product.color ? item.product.color.name : '',
                                $skuSize: item.sku.spec,
                                $originPrice: item.sku.rmbMarketPrice,
                                $price: item.sku.rmbPrice,
                                $amount: item.amount
                            }
                        })
                    }
                })
            } else return []
        },
        addrInfo () {
            return this.info.address
        },
        fee () {
            return this.info.totalPricingResult || {}
        }
    },
    components: {
        'v-pd': pd,
        'v-brand': brand,
        'v-content': content
    },
    created () {
        if (this.$route.query.skuIds && this.$route.query.skuIds.length) {
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
        padding: .1rem .34rem;
        background: url(../../assets/location.png) left .1rem center/.11rem no-repeat,
                    url(../../assets/arrow_right_b.png) right .15rem center/.11rem no-repeat;
    }   
    .user-info, .addr-info, .home-name{
        align-self: stretch;
    }
    .shop-name {
        height: 0.2rem;
        line-height: 0.2rem;
        overflow: hidden;
        text-align: left;
        width: 100%;
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
    }
    .list-name {
        flex: 1 1;
        margin-left: .12rem;
    }
    .list-value {
        height: 100%;
        margin-right: .15rem;
        font-size: 14px;
        color: #666666;
    }
    .footer {
        width: 100%;
        height: .55rem;
        border-top: solid 1px #CACACA;
        background: #FFFFFF;
    }
    .confirm-btn {
        width: 1rem;
        height: 100%;
        font-size: 17px;
        color: #FFFFFF;
        background: #e30059;
    }
    .confirm-info {
        flex: 1 1;
        height: 100%;
    }
    .text-info {
        font-size: 14px;
        color: #636363;
        font-family: PingFang-SC-Medium;
    }
    .user-remark{
        height: 100%;
        line-height: 0.45rem;
        width: 73px;
        float: left;
    }
    .remark{
        height: 100%;
        line-height: 0.45rem;
        width: 240px;
        float: left;
    }
    .remark input{
        height: 100%;
        line-height: 0.45rem;
        width: 240px;
        display: block;
        overflow: hidden;
    }
    .confirm-title {
        margin-left: .17rem;
        font-size: 15px;
        color: #666666;
    }
    .confirm-num {
        margin-left: .1rem;
        font-size: 15px;
        color: #e30059;
    }
    .confirm-des {
        margin-left: .1rem;
        font-size: 12px;
        color: #999999;
    }
    .detail-icon {
        padding-right: .22rem;
        background: url(../../assets/arrow_right.png) right center/.07rem no-repeat;
    }
    .selected-icon {
        padding-right:  .3rem;
        background: url(../../assets/check_mark.png) right center/.2rem no-repeat;
    }
</style>

