<template>
<v-page class="white-bg" ref="page">
        <!-- <v-carousel :imgs="imgs" class="carousel"></v-carousel> -->
        <v-scroll-y ref="scroller" @pullingUp="OnpullingUp">
            <v-carousel :imgs="pdInfo.imgs" class="shop-image"></v-carousel>
        <!-- <div class="shop-image"><img :src="pdInfo.imgUrl"/></div> -->
        <div class="spec-box">
        <div class="pd_row-up row-start">
            <div class="line-vertical">{{pdInfo.name}}</div>
            <div class="pd-collect-box">
            <div class="pd_collect" :class="{'pd_collect-active': pdInfo.collection}" @click="toggleCollect"></div>
            <p v-if="!pdInfo.collection">收藏</p>
            <p v-if="pdInfo.collection">已收藏</p>
            </div>
            <p class="pd_price">
                <!-- <span class="pd_rmb">￥</span>{{pdInfo.rmbPrice}} -->
                ￥{{pdInfo.price}}
            </p>
            <p class="shop-last">库存：{{pdInfo.amount}}</p>
            <p class="shop-ok">销量：{{pdInfo.sales}}</p>
        </div>
        <!-- <div class="pd_row-tag row-mul">
            <div v-for="item in pdInfo.categorys" :key="item.id" class="tag-item row row-center">{{item.name}}</div>
        </div> -->
        <div class="insurance">
            <p class="insurance-p1">服务保障：</p>
            <p class="insurance-p2"><img src="../../assets/玩具拷贝2@2x.png"/>安全无毒</p>
            <p class="insurance-p3"><img src="../../assets/玩具拷贝2@2x.png"/>全网爆款</p>
            <p class="insurance-p4"><img src="../../assets/玩具拷贝2@2x.png"/>匠心制作</p>
        </div>
       <div class="spec" @click="openFooter"><a>规格</a><img src="../../assets/arrow_right.png"/></div>
       <div class="shop-detail">商品详情</div>
       <div class="recommend" v-for="item in pdInfo.fragments[0].imgs"><img :src="item.imgUrl"/>
       </div>
       </div>
       <div class="add_cart-btn row row-center" @click="openFooter">加入购物车</div>
       <transition>
        <div class="pdbox" v-if="isShowFooter" @touchmove.prevent>
            <div v-if="isShowFooter" class="mask-mode" @click="closeFooter"></div>
            <v-footer :pdInfo="pdInfo" @submit="submit" @alert="$refs.page.alert"></v-footer>
        </div>
       </transition>
        </v-scroll-y>
</v-page>

</template>
<script>
import axios from 'axios'
import querystring from 'querystring'
import footer from './footer.vue'
import carousel from './swiper1.vue'
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
            console.log(data)
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
                    } else {
                        console.log(res)
                        this.$refs.page.alert(res.data.moreInfo)}
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
            return axios.post(url).then((res)=>{
                
                return res
            })
        },
        toggleCollect () {
            const togglePromise = this.pdInfo.collection ? this.cancelCollect(this.pdId) : this.collectPd(this.pdId)
            togglePromise.then((res) => {
                if (res.data.data !== true) {
                    throw new Error('网络请求结果错误')
                } else return this.checkIsCollected(this.pdId)
            })
            .then((res) => {
                console.log(res)
                if (res.data.data === true) {
                    this.pdInfo.collection = true
                } else if (res.data.data === false) {
                    this.pdInfo.collection = false
                } else throw new Error('网络请求结果错误')
            })
            .catch((err) => {
                console.log(err)
            })
            console.log(this.pdInfo.collection)
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
                    //  debugger;
                    if (res.data.data) {
                        this.pdInfo = res.data.data
                         console.log(this.pdInfo.collection)
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
                return this.pdInfo.imgs[0]
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
        // this.cancelCollect(this.pdId)
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
        background: #fff;
        width: 100%;
        padding-top: .12rem;
        float: left;
    }
    .line-vertical {
        width: 2.97rem;
        height: .42rem;
        margin-left: .1rem;
        font-size: 16px;
        color: #333333;
        overflow: hidden;
        float: left;
    }
    .pd_price {
        width: 100%;
        height: .2rem;
        color: #E30059;
        font-size: 19px;
        font-family: PingFang-SC-Medium;
        float: left;
    }
    .pd_rmb {
        font-size: 14px;
    }
    .pd_price-origin {
        font-size: 10px;
        color: #666666;
    }
    .pd-collect-box{
     margin-right: .11rem;
     margin-top: .03rem;
     float: right;
     width: .5rem;
     height: .4rem;
     font-size: 14px;
    }
    .pd_collect {
        width: .32rem;
        height: .22rem;
        float: right;
        margin-right: .1rem;
        background: url(../../assets/收藏（已选）拷贝.png) center/contain no-repeat;
    }
    .pd_collect-active {
        background: url(../../assets/收藏（已选）拷贝@2x.png) center/contain no-repeat;
    }
    .pd-collect-box p{
        margin-left: .06rem;
        width: 100%;
        float: left;
        font-size: 12px;
        margin-top: .12rem;
        color: #888888;
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
        width: 1.96rem;
        height: .33rem;
        margin-bottom: .15rem;
        margin-right: .15rem;
        margin-left: .9rem;
        border-radius: .17rem;
        background: #E30059;
        font-size: 18px;
        color: #FFFFFF;
        position: fixed;
        bottom: 0;
        opacity: 0.75;
        z-index: 90;
    }
    .mask-mode {
       width: 100%;
       height:100% ;
    }
    .shop-image{
        width: 100%;
        height: 3.75rem;
        background: #abcdef;
        float: left;
        overflow: hidden;
    }
    .shop-image img{
       width: 100%;
       height: 100%;
    }
     .shop-last, .shop-ok{
        color: #888888;
        font-size: 12px;
        width: 40%;
        float: left;
        margin-top: .08rem;
        margin-bottom: .11rem;
    }
    .shop-last{
        text-align:end;
        float: right;
        margin-right: .15rem;
    }
    .shop-ok{
        margin-left: .11rem;
    }
    .insurance{
      background: #fff;
      width: 100%;
      height: .34rem;
      font-size: 12px;
      margin-top: 0.03rem;
      float: left;
    }
    .insurance p{
     float: left;
     color: #333333;
    line-height: .34rem;
    }
    .insurance p img{
     width: 15px;
    height: 15px;
    margin-top: .1rem;
    float: left;
    margin-right: .05rem;
    }
    .insurance-p1{
   margin-left: .1rem;
    }
     .insurance-p2{
    width: 20%;
    height: 100%;
    margin-left: .03rem;
    }
    .insurance-p3{
    width: 20%;
    height: 100%;
    margin-left: .33rem;
    }
    .insurance-p4{
    width: 20%;
    height: 100%;
    margin-left: .33rem;
    }
    .spec, .shop-detail{
        background: #fff;
        width: 100%;
        height: .44rem;
        line-height: .44rem;
        font-size: 14px;
        margin-top: .08rem;
        float: left;
    }
    .spec a{
        display: block;
        width: 50%;
        height: .44rem;
        line-height: .44rem;
        font-size: 14px;
        margin-left: .1rem;
        color: #636363;
        float: left;
    }
    .spec img{
     width: .08rem;
     height:.14rem;
     float: right;
     margin-top:.15rem ;
     margin-right: .15rem;
    }
    .shop-detail{
        text-align: center;
        color: #636363;
    }
    .recommend{
        width: 100%;
        background: #fff;
        float: left;
        position: relative;
        overflow: hidden;
    }
    .recommend img{
       width: 100%;
       height: 100%;
    }
    .spec-box{
        width: 100%;
        height: 5.27rem;
        float: left;
        position: absolute;
        top:3.75rem;
    }
    .pdbox{
        width: 100%;
        height: 100%;
        background:rgba(0, 0, 0, 0.4);
        position: absolute;
        z-index: 99;
       transition-duration: 0.1s;
       transition-timing-function:ease-out;
       transition-property:height;
    }
</style>
