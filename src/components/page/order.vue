<template>
<v-page ref="page">
    <v-content>
        <div class="address col col-center">
            <p class="user-info text-info row row-between">
                <span>收货人：{{addrInfo.consignee}}</span>
                <span>{{addrInfo.phone}}</span>
            </p>
            <p class="addr-info text-info">收货地址：{{addrInfo.details}}</p>
            <p class="store-name text-info">店名：{{addrInfo.storeName}}</p>
        </div>

        <div class="colour-line"></div>

        <v-brand v-for="(item,index) in brandList" :key="index" :brandInfo="item.brand">
            <p v-if="index === 0" slot="orderStatus" class="text-warn order-status">{{status}}</p>
            <v-pd v-for="(pd,inx) in item.pds" :key="inx" :info="pd" class="order_pd" slot="pds">
                <p class="pd_amount" slot="">{{pd.$amount}}</p>
            </v-pd>
        </v-brand>
        
        <div class="settle_list-item row row-start">
            <p class="list-name text-p">运费</p>
            <div class="list-value row row-start">¥{{fee.logistics}}</div>
        </div>
        <div class="settle_list-item row row-start">
            <p class="list-name text-p">优惠</p>
            <div class="list-value detail-icon row row-start">¥{{productfee}}</div>
        </div>

        <div class="settle_list-item row row-start">
            <p class="list-name text-p">实付款（含运费）</p>
            <div class="text-warn-capest row row-start">¥{{fee.payAmount}}</div>
        </div>
         <div class="settle_list-items row-start">
            <p class="list-names text-p">卖家备注</p>
            <div class="list-values ">{{info.remarkAdmin}}</div>
        </div>

        <div class="order-card">
            <button :data-clipboard-text = "contain1" type="text" class="ctrlc1">复制</button>
            <p class="text-order-card">订单编号：{{info.orderNo}}</p>
            <p class="text-order-card">下单时间：{{info.createdAtStr}}</p>
            <p class="text-order-card">付款时间：{{info.status !== 'SUBMITTED' ? info.paidAtStr : '未付款'}}</p>
            <p class="text-order-card">付款方式：{{info.status !== 'SUBMITTED' ? '微信支付' : '未付款'}}</p>
        </div>

        <div class="order-card">
            <button :data-clipboard-text = "contain2" type="text" class="ctrlc">复制</button>
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
import Clipboard from 'clipboard'
let clipboard = new Clipboard('.ctrlc');
let clipboard1 = new Clipboard('.ctrlc1');
// import bus from '../common/bus.js'
/* eslint-disable no-new */

export default {
    name: 'order',
    data () {
        return {
            info: {},
            wx: {},
            isPaing: false,
            addrInfo:[],
            status:'',
            productfee:0,
            contain1:'',
            contain2:''
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
                    console.log(res)
                    if (res.data.data) {
                        this.info = res.data.data
                        this.status=res.data.data.statusStr;
                        this.productfee=res.data.data.discountFee;
                        this.addrInfo=this.info.orderAddress;
                        this.contain1='订单编号：'+this.info.orderNo+',下单时间：'+this.info.createdAtStr+',付款时间：'+(this.info.status !== 'SUBMITTED' ? this.info.paidAtStr : '未付款')+',付款方式：'+(this.info.status !== 'SUBMITTED' ? '微信支付' : '未付款')
                        this.contain2='物流公司：'+this.info.logisticsCompany+',物流单号：'+this.info.logisticsOrderNo
                        console.log(this.addrInfo)
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
                    console.log(item)
                    if (brand[item.id]) {
                        brand[item.id].push(item)
                    } else brand[item.id] = [item]
                })
                return Object.keys(brand).map((key) => {
                    return {
                        brand: brand[key][0].brand,
                        pds: brand[key].map((item) => {
                            console.log(item)
                            return {
                                id: item.id,
                                $pdUrl: item.productImgUrl,
                                $categorys: item.categorys,
                                $pdColor: item.colorStr,
                                $skuSize: item.skuStr,
                                $originPrice: item.marketPrice,
                                $price: item.price,
                                $amount: item.amount,
                                $title:item.productName
                            }
                        })
                    }
                })
            } else return []
        },
        fee () {
            const fee = {
                payAmount: 0,
                logistics: 0,
            }
            if (this.info.orderFees) {
                const payAmount = this.info.orderFees.find((item) => {
                    return item.code === 'payAmount'
                })
                const logistics = this.info.orderFees.find((item) => {
                    return item.code === 'logistics'
                })
                // const discount = this.info.orderFees.find((item) => {
                //     return item.code === 'discount'
                // })
                fee.payAmount = payAmount.amount
                fee.logistics = logistics.amount
            //     fee.discount = discount.amount
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
        padding: .1rem .1rem ;
        background: #FFFFFF;
    }   
    .user-info, .addr-info, .shop-name {
        align-self: stretch;
    }
    .store-name{
        float: left;
        font-size: 14px;
        align-self: stretch;
    }
    .shop-name {
        height: 0.2rem;
        line-height: 0.2rem;
        overflow: hidden;
    }
    .addr-info {
        max-height: .4rem;
        line-height:.2rem; 
        margin-top: .03rem;
        overflow: hidden;
    }
    .colour-line {
        width: 100%;
        height: .05rem;
        background: url(../../assets/矩形1293@2x.png) center/100% no-repeat;
    }
    .order_pd {
        padding: .1rem .15rem;
        border-top: solid 1px #000000;
        border-bottom: solid 1px #e5e5e5;
    }
    .settle_list-item {
        height: .45rem;
        border-bottom: solid 1px #E5E5E5;
        background: #FFFFFF;
    }
    .settle_list-items {
        height: .9rem;
        border-bottom: solid 1px #E5E5E5;
        background: #FFFFFF;
        padding-right: .08rem;
        overflow: hidden;
        /* margin-top: -.45rem; */
    }
    .list-name {
        flex: 1 1;
        margin-left: .12rem;
        float: left;
        height: 100%;
        line-height:0.45rem;
    }
    .list-names {
        width: .68rem;
        margin-left: .12rem;
        float: left;
        height: 100%;
        line-height:0.45rem;
    }
    .list-value {
        height: 100%;
        margin-right: .15rem;
        font-size: 14px;
        color: #666666;
        float: left;
        overflow: hidden;
    }
    .list-values {
        width: 2.66rem;
        height: .45rem;
        line-height: .225rem;
        margin-left: .21rem;
        font-size: .14rem;
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
        position: relative;
        width: calc(100% - .2rem);
        padding: .08rem;
        background: #FFFFFF;
        float: left;
        padding-left: .12rem;
        border-top:4px solid #f4f4f4;
    }
    .ctrlc, .ctrlc1{
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
