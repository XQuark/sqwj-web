<template>
<v-page :class="{'white-bg': !pdList.length}" ref="page">
<template v-if="pdList.length || invalidPds.length">
    <div class="car-head row row-between">
        <div class="car-all_btn" :class="{'selected_none': !isAllSelected, 'selected': isAllSelected}" @click="checkoutAll">全选</div>
        <div class="car-edit_btn" @click="toggleHead">{{isEdit ? '完成' : '编辑'}}</div>
    </div>

    <div class="cart-content">
        <v-brand v-for="item in brandList" :key="item.id" :brandInfo="item">
            <div slot="select" class="select-icon" :class="{'selected-icon': item.chosed}" @click="checkoutBrand(item.id)"></div>
            <div slot="pds" v-for="pd in item.pds" :key="pd.id" class="brand-order row row-start" >
                <div class="select-icon" :class="{'selected-icon': pd.chosed}" @click="checkoutItems([pd.id])"></div>
                <v-pd :info="pdsInfo[pd.id]">
                    <p v-if="!isEdit" class="pd_amount">{{pd.amount}}</p>
                    <v-amount v-else :pd="pd" :max="pdsInfo[pd.id].sku.amount" :min="1" @updateAmount="updateAmount(pd.skuId, $event)" @alert="$refs.page.alert"></v-amount>
                </v-pd>
            </div>
        </v-brand>

        <template v-if="invalidPds.length">
                <div  class="invalid-split row row-center">
                    <div class="invalid-split-line"></div>
                    <p class="invalid-split-title">失效宝贝</p>
                    <div class="invalid-split-line"></div>
                </div>

                <div v-for="pd in invalidPds" :key="pd.id" class="brand-order row row-start" >
                    <div class="invalid-tag">失效</div>
                    <v-pd :info="pdsInfo[pd.id]"></v-pd>
                </div>
                
                <div class="row-list row row-center">
                    <div class="clear-invalid row row-center" @click="clearInvalid">清空失效宝贝</div>
                </div>
        </template>
    </div>

    <div class="car-footer car-settle row">
        <template v-if="isEdit">
            <div class="row-item total_select-text">{{'当前选择了' + allAmount + '件商品'}}</div>
            <div class="settle-btn row row-center" @click="removeCart(chosed)">删除</div>
            
        </template>
        <template v-else>
            <div class="row-item total_fee-text">
                <p class="text-gray">总价：<span class="text-warn">¥{{totalFee}}</span></p>
                <p class="text-gray-light-low">不含运费</p>
            </div>
            <div class="settle-btn row row-center" @click="settle">结算({{chosed.length}})</div>
        </template>

    </div>
    
</template>

<template v-else>
    <v-empty>
        <p slot="title">购物车是空的</p>
        <p slot="des">赶快去逛一逛吧～</p>
    </v-empty>
</template>
</v-page>

</template>
<script>
import pd from '../common/pd_item.vue'
import brand from './brand.vue'
import amount from '../common/amount.vue'
import empty from '../common/empty.vue'
import axios from 'axios'
import querystring from 'querystring'
/* eslint-disable no-new */

export default {
    name: 'car',
    data () {
        return {
            originInfo: undefined,
            originFee: undefined,
            pdList: [],
            pdsInfo: {},
            invalidPds: [],
            isEdit: false,
            status: 'settle' // 'empty', 'edit', 'settle'
        }
    },
    methods: {

        getCarInfo () {
            const url = '/v2/getCart'
            return axios.post(url)
        },
        deleteCart (id) {
            const url = '/cart/delete?' + querystring.stringify({itemId: id})
            return axios.post(url)
                .then((res) => {
                    if (res.data.data === true) {
                        return id
                    } else throw new Error(url + '::failed data is invalid')
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        },
        switchStatus () {
            this.isEdit = !this.isEdit
        },
        getRemoteFee (skus) {
            const url = '/cart/pricing?' + querystring.stringify({'skuIds': skus})
            return axios.post(url)
                .then((res) => {
                    if (res.data.data) {
                        return res.data.data
                    } else throw new Error(url + ':: data failed')
                })
        },
        updateFee () {
            const choseds = this.pdList.filter((item) => {
                return item.chosed
            })
            const skus = choseds.map((item) => {
                return item.skuId
            })
            const updateFeePromise = skus.length ? this.getRemoteFee(skus) : Promise.resolve(0)
            return updateFeePromise.then((data) => {
                this.originFee = data
            })
        },
        findPd (id) {
            return this.pdList.find((item) => {
                return item.id === id
            })
        },
        updateAmount (skuId, amount) {
            console.log(skuId)
            console.log(amount)
            const url = '/cart/update?' + querystring.stringify({
                skuId: skuId,
                amount: amount
            })
            axios.post(url)
                .then((res) => {
                    if (res.data.data === true) {
                        const pd = this.pdList.find((item) => {
                            return item.skuId === skuId
                        })
                        pd.amount = amount
                    } else throw new Error('cart update failed:: data is valid')
                })
                .catch((err) => {
                    const pdIndex = this.pdList.findIndex((item) => {
                        return item.skuId === skuId
                    })
                    this.$set(this.pdList, pdIndex, this.pdList[pdIndex])
                    console.log(err)
                })
        },
        checkoutItems (pdIds) {
            const pds = this.pdList
                .filter((item) => {
                    return pdIds.indexOf(item.id) !== -1
                })
            const isAllSelected = !pds.find((item) => {
                return !item.chosed
            })
            const temporary = {}
            pds.forEach((item, index) => {
                temporary[index] = item.chosed
                item.chosed = !isAllSelected
            })
            this.updateFee()
                .catch((err) => {
                    pds.forEach((item, index) => {
                        item.chosed = temporary[index]
                    })
                    console.log(err)
                })
        },
        checkoutBrand (brandId) {
            const brand = this.brandList.find((item) => {
                return item.id === brandId
            })
            const pdIds = brand.pds.map((item) => {
                return item.id
            })
            this.checkoutItems(pdIds)
        },
        checkoutAll () {
            const pdIds = this.pdList.map((item) => {
                return item.id
            })
            this.checkoutItems(pdIds)
        },
        removeCart (pds) {
            const deletePromises = []
            pds.forEach((item) => {
                deletePromises.push(this.deleteCart(item.id))
            })
            Promise.all(deletePromises)
                .then((data) => {
                    this.init()
                })
                .catch(() => {
                    this.init()
                })
        },
        settle () {
            const skuIds = this.pdList
                .filter((item) => {
                    return item.chosed
                }).map((item) => {
                    return item.skuId
                })
            if (skuIds.length) {
                this.$router.push({name: 'settle', query: {skuIds: skuIds}})
            }
        },
        clearInvalid () {
            this.removeCart(this.invalidPds)
        },
        toggleHead () {
            this.isEdit = !this.isEdit
        },
        init () {
            this.getCarInfo()
                .then((res) => {
                    console.log(res.data.data)
                    if (res.data.data && res.data.data.cartItemMap) {
                        const cartItem = res.data.data.cartItemMap
                        let carts = []
                        Object.keys(cartItem).forEach((key) => {
                            carts = carts.concat(cartItem[key])
                        })
                        const pdList = []
                        const pdsInfo = {}
                        const invalidPds = []
                        carts.forEach((item) => {
                            const pd = {
                                id: item.id,
                                amount: item.amount,
                                skuId: item.sku.id,
                                chosed: false
                            }
                            if (item.product.status === 'ONSALE') {
                                pdList.push(pd)
                            } else invalidPds.push(pd)
                            pdsInfo[item.id] = Object.assign(item, {
                                $pdUrl: item.product.imgUrl,
                                $categorys: item.product.categorys,
                                $pdColor: item.product.color ? item.product.color.name : '',
                                $skuSize: item.sku.spec,
                                $originPrice: item.sku.rmbMarketPrice,
                                $price: item.sku.price,
                                $title:item.product.description,
                                $disabled: !(item.product.status === 'ONSALE')
                            })
                        })
                        this.invalidPds = invalidPds
                        this.pdList = pdList
                        this.pdsInfo = pdsInfo
                    } else throw new Error('网络请求数据错误')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },
    computed: {
        chosed () {
            return this.pdList.filter((item) => {
                return item.chosed
            })
        },
        fee () {
            const fee = {
                goodsFee: 0,
                logisticsFee: 0,
                discountFee: 0,
                totalFee: 0
            }
            if (this.originFee && this.originFee.totalPricingResult) {
                Object.assign(fee, this.originFee.totalPricingResult)
            }
            return fee
        },
        allAmount () {
            let amount = 0
            this.chosed.forEach((item) => {
                amount += item.amount
            })
            return amount
        },
        totalFee () {
            if (this.fee && this.fee.totalFee) {
                return this.fee.totalFee
            } else return 0
        },
        brandList () {
            const brand = {}
            this.pdList.forEach((item) => {
                if (brand[item.brandId]) {
                    brand[item.brandId].pds.push(item)
                } else {
                    brand[item.brandId] = {
                        id: item.brandId,
                        imgUrl: item.brandAvatar,
                        name: item.brandName,
                        pds: [item]
                    }
                }
            })
            Object.keys(brand).forEach((key) => {
                brand[key].chosed = !brand[key].pds
                    .find((item) => {
                        return !item.chosed
                    })
            })
            return Object.keys(brand).map((key) => {
                return brand[key]
            })
        },
        isAllSelected () {
            return !this.pdList
            .find((item) => {
                return !item.chosed
            })
        }
    },
    watch: {

    },
    components: {
        'v-pd': pd,
        'v-brand': brand,
        'v-amount': amount,
        'v-empty': empty
    },
    created () {
        this.init()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .car-head {
        width: 100%;
        height: .4rem;
        border-bottom: solid .01rem #eee;
        background: #fff;
    }
    .cart-content {
        flex: 1 1 ;
        width: 100%;
        overflow-y: scroll;
    }
    .car-footer {
        width: 100%;
        height: .5rem;
        font-size: .14rem;
        background: #fff;
    }
    .car-all_btn {
        height: .2rem;
        margin-left: .1rem;
        padding-left: .27rem;
        font-size: .13rem;
    }
    .car-edit_btn {
        margin-right: .14rem;
        font-size: .13rem;
    }
    .selected {
        background: url('../../assets/check_mark.png') left center/.2rem no-repeat;
    }
    .selected_none {
        background: url('../../assets/circle_black.png') left center/.2rem no-repeat;
    }
    .car-settle {

    }
    .total_fee-text {
        display: flex;
    }
    .total_select-text {
        margin-left: .14rem;
    }
    .total_fee-value {
        color: #ff5400;
    }
    .settle-btn {
        width: .95rem;
        height: .5rem;
        margin-left: .15rem;
        font-size: 17px;
        color: #FEFFFF;
        background:  #e30059;
    }
    .text-warn {
        font-size: 15px;
        color: #e30059
    }
    .text-gray {
        font-size: 15px;
        color: #666666;
        height: 100%;
        margin-left: 0.26rem;
        float: left;
    }
    .text-gray-light-low {
        font-size: 11px;
        color: #999999;
        margin-left: .12rem;
        margin-top: 2px;
        height: 100%;
        float: left;
    }
    .invalid-tag {
        width: .3rem;
        height: .15rem;
        font-size: 12px;
        text-align: center;
        color: #FFFFFF;
        background: #000000;
    }
    .invalid-split {
        width: 100%;
        height: .3rem;
    }
    .invalid-split-line {
        width: 1rem;
        height: 1px;
        background: #888888;
    }
    .invalid-split-title {
        margin: 0 .4rem;
        font-size: 12px;
        color: #666666;
    }
    .brand-order {
        background: #FFFFFF;
    }
    .row-list {
        width: 100%;
        height: .5rem;
        background: #FFFFFF;
    }
    .clear-invalid {
        width: 1rem;
        height: .2rem;
        border: solid 1px #000000;
        font-size: 14px;
        color: #484848;
    }
</style>

