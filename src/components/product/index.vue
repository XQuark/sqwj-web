<template>
<v-page class="white-bg" ref="page">
        <v-carousel :imgs="imgs" class="carousel"></v-carousel>

        <div class="pd_row-up row row-start">
            <div class="line-vertical"></div>
            <p class="pd_price">
                <span class="pd_rmb">￥</span>{{pdInfo.rmbPrice}}
                <del class="pd_price-origin">￥{{pdInfo.rmbMarketPrice}}</del>
            </p>
            <div class="pd_collect" :class="{'pd_collect-active': pdInfo.collection}" @click="toggleCollect"></div>
        </div>
        <div class="pd_row-tag row-mul">
            <div v-for="item in pdInfo.categorys" :key="item.id" class="tag-item row row-center">{{item.name}}</div>
        </div>
        <div class="add_cart-btn row row-center" @click="openFooter">加入购物车</div>

        <v-footer v-if="isShowFooter" :pdInfo="pdInfo" @submit="submit" @alert="$refs.page.alert"></v-footer>

        <div v-if="isShowFooter" class="mask-mode" @click="closeFooter"></div>
</v-page>


</template>
<script>
import carousel from './swiper.vue'
import axios from 'axios'
import querystring from 'querystring'
import footer from './footer.vue'
/* eslint-disable no-new */

export default {
    name: 'pd',
    data () {
        return {
            pdId: '',
            pdInfo: {},
            isCollection: false,
            isShowFooter: false
        }
    },
    methods: {
        getPdInfo () {
            const url = '/v2/product/' + this.pdId
            return axios.post(url)
        },
        // getCollectionStatus (id) {
        //     const url = '/productCollection/delete?productId=' + id
        //     return axios.post(url)
        // },
        addCart (data) {
            const url = '/v2/cart/add?' + querystring.stringify(data)
            return axios.post(url)
        },
        submit (skuId, amount) {
            const data = {
                skuId: skuId,
                amount: amount,
                prodctId: this.pdInfo.id
            }
            this.addCart(data)
                .then((res) => {
                    if (res.data.data === true) {
                        this.$router.push({path: '/car'})
                    } else this.$refs.page.alert(res.data.moreInfo)
                })
                .catch(() => {
                    this.$refs.page.alert('加入购物车失败')
                })
        },
        collectPd (id) {
            const url = '/v2/productCollection/save?productId=' + id
            return axios.post(url)
        },
        cancelCollect (id) {
            const url = '/v2/productCollection/delete?productId=' + id
            return axios.post(url)
        },
        checkIsCollected (id) {
            const url = '/v2/productCollection/check?productId=' + id
            return axios.post(url)
        },
        toggleCollect () {
            const togglePromise = this.pdInfo.collection ? this.cancelCollect(this.pdId) : this.collectPd(this.pdId)
            togglePromise.then((res) => {
                if (res.data.data !== true) {
                    throw new Error('网络请求结果错误')
                } else return this.checkIsCollected(this.pdId)
            })
            .then((res) => {
                if (res.data.data === true) {
                    this.pdInfo.collection = true
                } else if (res.data.data === false) {
                    this.pdInfo.collection = false
                } else throw new Error('网络请求结果错误')
            })
            .catch((err) => {
                console.log(err)
            })
        },
        openFooter () {
            this.isShowFooter = true
        },
        closeFooter () {
            this.isShowFooter = false
        },
        init () {
            this.getPdInfo()
                .then((res) => {
                    if (res.data.data) {
                        this.pdInfo = res.data.data
                    } else throw new Error('网络请求结果错误')
                })
                .catch((err) => {
                    console.log(err)
                })
            // this.getCollectionStatus(this.pdId)
            //     .then((res) => {
            //         this.isCollection = res.data.data === true
            //     })
            //     .catch((err) => {
            //         console.log(err)
            //     })
        }
    },
    computed: {
        imgs () {
            if (this.pdInfo.imgs) {
                return this.pdInfo.imgs.slice(1)
            } else return []
        }
    },
    components: {
        'v-carousel': carousel,
        'v-footer': footer
    },
    created () {
        if (this.$route.params.id) {
            this.pdId = this.$route.params.id
            this.init()
        } else this.$router.go(-1)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
    .pd {
        width: 100%;
        min-height: 100%;
        background: #FFFFFF;
    }
    .carousel, .pd_row-up, .pd_row-tag, .add_cart-btn{
        flex-shrink: 0;
    }
    .carousel {
        width: 3.6rem;
        flex: 0 0 4.6rem;
        margin: 0 auto;
        margin-top: .08rem;
    }
    .pd_row-up {
        width: 100%;
        margin-top: .12rem;
    }
    .line-vertical {
        width: .02rem;
        height: .2rem;
        margin-left: .08rem;
        background: #E30059;
    }
    .pd_price {
        flex:  1 1;
        margin-left: .1rem;
        color: #E30059;
        font-size: 21px;
    }
    .pd_rmb {
        font-size: 14px;
    }
    .pd_price-origin {
        font-size: 10px;
        color: #666666;
    }
    .pd_collect {
        width: .18rem;
        height: .2rem;
        margin-right: .17rem;
        background: url(../../assets/collect.png) center/contain no-repeat;
    }
    .pd_collect-active {
        background: url(../../assets/collect_active.png) center/contain no-repeat;
    }
    .pd_row-tag {
        box-sizing: border-box;
        width: 100%;
        padding: .12rem .08rem 0 .08rem;
    }
    .tag-item {
        height: .24rem;
        margin: 0 .2rem .15rem 0;
        padding: 0 .1rem;
        border: solid 1px #a0a0a0;
        background: #FFFFFF;
        font-size: 16px;
        color: #333333;
    }
    .add_cart-btn {
        flex: 0 0 .34rem;
        align-self: flex-end;
        width: 1.24rem;
        margin-bottom: .15rem;
        margin-right: .15rem;
        border-radius: .17rem;
        background: #E30059;
        font-size: 18px;
        color: #FFFFFF;
    }
    .mask-mode {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 19;
    }
</style>
