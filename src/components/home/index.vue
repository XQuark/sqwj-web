<template >
<v-page-tab>
    <v-scroll-y ref="scroller" @pullingUp="OnpullingUp">
            <!-- <router-link v-for="item in pds" :key="item.id" :to="{name: 'pdList', query: {groupId: item.id}}" class="pd row row-center"> -->
                
                <!-- <div class="pd_img-box">
                    <img :src="item.imgUrl" alt="" class="pd_img">
                </div> -->
                <!-- <div class="pd_info col col-center">
                    <p class="pd_title">{{item.headline}}</p>
                    <div class="line-white"></div>
                    <p class="pd_sub-title">{{item.subhead}}</p>
                </div>
            </router-link> -->
        <!-- <div class="header-image"></div> -->
        <v-carousel :imgs="imgs" class="header-image"></v-carousel>
       
        <div class="shop-nav">
            <router-link :to="{name: 'pdList', query: {groupId:0,istop:false}}" class=" shop-nav-box">
                <div class="shop-nav-img"><img src="../../assets/allshop.png"/></div>
                <p class="shop-nav-names">全部商品</p>
            </router-link>
            <router-link v-for="item in genre" :key="item.id" :to="{name: 'pdList', query: {groupId: item.id,istop:false}}" class=" shop-nav-box">
                <div class="shop-nav-img"><img :src="item.imgUrl"/></div>
                <p class="shop-nav-name">{{item.name}}</p>
            </router-link>
        </div>  
            
        <div class="valid-images">
            <div class="valid" :key="indx" v-for="(item,indx) in validlist">
                <div class="valid-left">
                    <p>{{item.discount}}</p>
                    <div class="valid-money-right">
                    <p>元优惠卷</p>
                    <p>满{{item.applyAbove}}即可使用</p>
                    </div>
                </div>
                <div @click="clickget(item.id)" class="clickget">立即领取</div>
            </div>
        </div>
        <div class="a-box">
        <router-link :class="(index%2)==0 ?'shop-tran':'shop-tran-right'" :key="index" v-for="(item,index) in brandlist" :to="{name: 'pdList', query: {groupId: item.id , istop:true,inx:index}}">
            <p class="shop-tran-top">{{item.name}}</p>
            <p class="shop-tran-title">{{item.details}}</p>
            <div :class="index%2==0 ?'shop-tran-img':'shop-tran-img-right'"><img :src="item.img"/></div>
        </router-link>
        </div>
    </v-scroll-y>
    <router-link :to="{name: 'tagList'}" class="search-btn"></router-link>
</v-page-tab>
</template>
<script>
/* eslint-disable no-new */

import axios from 'axios'
import pager from '../common/pager.vue'
import carousel from '../product/swiper.vue'
export default {
    name: 'home',
    data () {
        return {
            isMsg: true,
            msgInfo: '',
            imgs:[],
            genre:[],
            validlist:[],
            brandlist:[]
        }
    },
    extends: pager,
    methods: {
        login () {
            const url = '/v2/signin_check?u=13163388059&mobilePhoneVerifyCode=111111&authType=MOBILE_PHONE'
            return axios.post(url)
                .then((res) => {
                })
                .catch((err) => {
                    return err
                })
            // return Promise.resolve()
        },
        getindeximglsit(){
            var that=this
           const url = '/v2/openapi/home/getCarousel'
           return axios.post(url)
                .then((res) => {
                    console.log(res.data.data)
                    that.imgs=res.data.data.images
                })
                .catch((err) => {
                    return err
                })
        },
        getgenrelsit(){
            var that=this
           const url = '/v2/openapi/home/getCategory'
           return axios.post(url)
                .then((res) => {
                   that.genre=res.data.data;
                })
                .catch((err) => {
                    return err
                })
        },
         getvolidlsit(){
            var that=this
           const url = '/v2/promotionCoupon/listForApp '
           return axios.post(url)
                .then((res) => {
                    that.validlist=res.data.data;
                    console.log(that.validlist)
                })
                .catch((err) => {
                    return err
                })
        },
        clickget(couponId){
            var that=this
            var time=new Date();
           const url = '/coupon/userPromotionCoupon/acquire?promotionCouponId='+couponId+'&t='+time
           return axios.get(url)
                .then((res) => {
                    alert(res.data.msg)
                })
                .catch((err) => {
                    return err
                })
        },
        getbrand(){
            var that=this
           const url = '/v2/openapi/home/getTweet'
           return axios.post(url)
                .then((res) => {
                    that.brandlist=res.data.data
                    console.log(that.brandlist)
                })
                .catch((err) => {
                    return err
                })
        },
        getIndexList (page, size) {
            const url = '/v2/productGroup/list?size=' + size + '&page=' + page
            // return axios.post(url)
            return

        },
        getNextPage () {
            return this.updatePager((page, size) => {
                return this.getIndexList(page, size)
                    .then((res) => {
                        if (res.data.data) {
                            return res.data.data.list
                        } else throw new Error('请求结果数据错误')
                    })
            }).catch((err) => {
                console.log(err)
            })
        },
        OnpullingUp () {
            this.getNextPage()
                .then(() => {
                    this.$refs.scroller.finishPullUp()
                })
        }
    },
    computed: {
        pds () {
            return this.pager.list
        }
    },
    components: {
        'v-carousel': carousel
    },
    created () {
        this.login()
        this.getindeximglsit()
        this.getgenrelsit()
        this.getvolidlsit()
        this.getbrand()
    },
    mounted () {
        this.getNextPage()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* .wraper, .out-wraper {
        width: 100%;
    }
    .out-wraper {
        height: 100%;
    } */
    .search-btn {
        position: fixed;
        right: .125rem;
        top: .14rem;
        z-index: 11;
        width: .38rem;
        height: .38rem;
        border-radius: .19rem;
        background: url(../../assets/search_nav.png) center/contain no-repeat;
    }
    .header-image {
        width: 100%;
        height: 2.5rem;
    }
    .shop-nav{
        width: 100%;
        background: #fff;
        border-top: 4px solid #f4f4f4;
        float: left;
    }
    .a-box{
        width: 100%;
        float: left;
    }
    .valid-images{
        width: 100%;
        float: left;
        border-top: 4px solid #f4f4f4;
    }
    .valid{
        width: 1.74rem;
        height: .5rem;
        margin-top:0.03rem ;
        margin-left: .09rem;
        border:1px solid #e30059;
        float: left;
    }
    .valid-images .clickget{
        height: .4rem;
        width:.3rem ;
        padding: .05rem 0;
        text-align: center;
        background: #e30059;
        color: #fff;
        font-size: .12rem;
        line-height:.2rem;
        font-family: PingFang-SC-Regular;
        float: right;
    }
    .shop-tran{
        width: 3.5rem;
        height: 1.8rem;
        padding:.1rem .09rem .1rem .15rem;
        position: relative;
        float: left;
        background: #fff;
        border-top: 4px solid #f4f4f4;
    }
    .shop-tran-right{
        width: 3.5rem;
        height: 1.8rem;
        padding:.1rem .09rem .1rem .15rem;
        position: relative;
        float: left;
        background: #fff;
        border-top: 4px solid #f4f4f4;
    }
    .shop-tran .shop-tran-top{
        width: 1.75rem;
        height: .39rem;
        background: #FF9A00;
        font-size:.17rem ;
        line-height: .39rem;
        color: #fff;
        border-radius: 5px;
        padding-left:.09rem ;
        margin-top: 0.17rem;
        z-index: 99;
        position:absolute;
        box-shadow:0px 2px 10px #FF9A00; 
    }
    .shop-tran-right .shop-tran-top{
        text-align: left;
        width: 1.75rem;
        height: .39rem;
        background: #e30059;
        font-size:.17rem ;
        line-height: .39rem;
        color: #fff;
        border-radius: 5px;
        padding-left:.09rem ;
        margin-top: 0.17rem;
        z-index: 99;
        position:absolute;
        right: 0;
        box-shadow:0px 2px 10px #e30059;
        margin-right: .1rem;
    }
    .shop-tran-title{
       width: 1.08rem;
       max-height: .6rem;
       line-height: .2rem;
       font-size: .14rem;
       margin-left: 0.09rem;
       margin-top: .66rem;
       color: #333;
    }
    .shop-tran-img{
        width: 1.8rem;
        height: 1.8rem;
        background: #abcdef;
        position: absolute;
        top: .1rem;
        right: .1rem;
        display: flex;
    }
    .shop-tran-right p{
        float: right;
        text-align: right;
        padding-right: 0.09rem;
    }
 .shop-tran-img-right{
        left: .15rem;
         width: 1.8rem;
        height: 1.8rem;
        background: #abcdef;
        position: absolute;
        top: .1rem;
        display: flex;
    }
 .shop-tran-img-right img, .shop-tran-img img{
     width: 100%;
 }
.shop-tran-right .shop-tran-top-right{
        width: 1.75rem;
        padding-left:.09rem ;
        margin-top: 0.17rem;
        z-index: 99;
        position:absolute;
        right:.1rem;
        height: .39rem;
        background: #e30059;
        font-size:.17rem ;
        line-height: .39rem;
        color: #fff;
        border-radius: 5px;
        box-shadow:0px 5px 15px #e30059;
        text-align: left;
    }
    .shop-nav-box{
        width:.55rem;
        height:.95rem;
        float: left;
        margin-left:.166rem;
        overflow: hidden;
    }
    .shop-nav-img{
        width: .55rem;
        height: .55rem;
        border-radius:50%;
        margin-top:.125rem ;
        overflow: hidden;
    }
    .shop-nav-img img{
        display: block;
        height: 100%;
    }
    .shop-nav-name{
        width: .55rem;
        height: .275rem;
        line-height: .275rem;
        text-align: center;
        font-size: 12px;
        color: #333;
    }
    .shop-nav-names{
        width: .75rem;
        height: .275rem;
        line-height: .275rem;
        text-align: center;
        font-size: 12px;
        color: #333;
        margin-left: -.1rem;
    }
    .valid-left{
        width: 1.42rem;
        height: 100%;
        float: left;
        color: #FF9A00;
    }
    .valid-left :nth-child(1){
    height: .5rem;
    width: .47rem;
    line-height: .5rem;
    font-size:.28rem;
    text-align: center;
    float: left;
    }
    .valid-money-right{
        width: .95rem;
        height: 100%;
        float: left;
    }
    .valid-money-right :nth-child(1){
        display: block;
        width: 100%;
        height: .16rem;
        line-height: .16rem;
        font-size:.16rem;
        text-align: left;
        float: left;
        margin-top:.1rem ;
    }
    .valid-money-right :nth-child(2){
        display: block;
        width: 100%;
        height: .14rem;
        font-size: .12rem;
        line-height: .14rem;
        text-align: left;
        float: left;
        margin-top: .02rem
    }
       
</style>
