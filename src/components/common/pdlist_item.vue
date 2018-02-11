<template>
    <router-link  :to="{name: 'product', params: {id: info.productId}}" class="pd">
        <!-- <div class="pd_img-box">
            <img :src="info.imgUrl" alt="" class="pd_img">
        </div>
        <div class="logo">
            <img :src="info.brandImgUrl" alt="" class="logo_img">
        </div>
        <div class="collected text-p-cap">{{info.collectionNum}}</div> -->
        <div class="shop-image1"><img :src="info.productImg"/></div>
        <div class="shop-right">
            <div class="collected"></div>
            <p class="shop-name">{{info.productName}}</p>
            <p class="shop-money"><a>¥</a>{{info.productPrice}}</p>
            <p class="shop-rest">{{info.productAmount}}库存</p>
            <p class="shop-over">{{info.productSale}}人已付款</p>
        </div>
    </router-link>
</template>
<script>

// import axios from 'axios'
// import querystring from 'querystring'
/* eslint-disable no-new */

export default {
    name: 'pdListItem',
    props: ['info'],
    data () {
        return {

        }
    },
    created(){
     console.log(this.info)
    }

    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .pd {
        display: block;
        position: relative;
        width: 100%;
        height: 1.4rem;
        border-bottom: 4px solid #f4f4f4;
        overflow: hidden;
    }
    .pd_img-box {
        width: 100%;
        height: 2.5rem;
        overflow-y: hidden;
    }
    .pd_img {
        display: block;
        width: 100%;
    }
    .logo {
        position: absolute;
        left: .12rem;
        bottom: .12rem;
        width: .45rem;
        height: .45rem;
        overflow: hidden;
        border-radius: .225rem;
    }
    .logo_img {
        display: block;
        width: 100%;
        border-radius: .225rem;
    }
    .collected {
        position: absolute;
        right: .12rem;
        bottom: .32rem;
        width: 21px;
        height: 20px;
        background: url(../../assets/收藏（已选）拷贝@2x.png) no-repeat;
        background-size:100% 100%; 
    }

    .shop-image1{
        background: #fff;
        width: 1.4rem;
        height: 1.4rem;
        margin-left:.04rem;
        margin-top: .05rem;
        display: block;
        float: left;
        overflow: hidden;
    }
    .shop-image1 img{
        width: 100%;
        height: 100%;
    }
    .shop-right{
        background: #fff;
        width:2.14rem ;
        height: 1.25rem;
        padding-left:.07rem;
        padding-bottom:.07rem;
        float: left;
        padding-top: .08rem;
        margin-top: .04rem;
        font-size: .16rem;
        margin-bottom:.01rem ;
        padding-right: .09rem;
        position: relative;
    }
    .shop-right p{
        color: #666666;
    }
    .shop-right .shop-name{
        width: 100%;
        height: .4rem;
        line-height: .2rem;
        color: #666666;
        overflow: hidden;
    }
    .shop-right .shop-money{
        color: #e30059;
        font-size: .21rem;
        float: left;
        width: 100%;
        margin-top: .3rem;
    }
    .shop-right .shop-money a{
        font-size: .12rem;
        float: left;
        margin-top: .04rem;
    }
    .shop-rest{
        font-size: .12rem;
        margin-top: .08rem;
        float: left;
    }
    .shop-over{
        font-size: .12rem;
        margin-top: .08rem;
        float: right;
    }
</style>
