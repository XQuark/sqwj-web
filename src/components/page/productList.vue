<template>
<keep-alive>
<v-page ref="page">
<v-scroll-y ref="scroller" @pullingUp="OnpullingUp">
<!-- <v-scroll-y ref="scroller"> -->
    <!-- <div class="head row row-center">
        <p class="title">{{title}}</p>
        <div class="cart-nav"></div>
        <router-link class="cart-nav" :to="{name: 'car'}"></router-link>
    </div> -->
    

    <!-- <router-link v-for="item in pds" :key="item.id" :to="{path: 'product/' + item.id}" class="pd">
        <div class="pd_img-box">
            <img :src="item.imgUrl" alt="" class="pd_img">
        </div>
        <div class="logo">
            <img :src="item.brandImgUrl" alt="" class="logo_img">
        </div>
        <div class="collected text-p-cap">{{item.collectionNum}}</div>
    </router-link> -->
    <div v-if="top" :class="(index%2)==0 ?'shop-tran':'shop-tran-right'" v-for="(item,indx) in topvalue " :key="indx">
            <p class="shop-tran-top">{{item.name}}</p>
            <p class="shop-tran-title">{{item.details}}</p>
            <div :class="(index%2)==0 ?'shop-tran-img':'shop-tran-img-right'"><img :src="item.img"/></div>
        </div>
        <template v-if="iscontain">
        <router-link v-if="!top" class="shop-nav-list" v-for="(item,index) in podList " :key="index" :to="{path: 'product/' + item.id}">
        <div class="shop-image1"><img :src="item.imgUrl"/></div>
        <div class="shop-right">
            <p class="shop-valid">{{item.description}}</p>
            <p class="shop-money"><a>¥</a>{{item.price}}</p>
            <p class="shop-rest">{{item.amount}}库存</p>
            <p class="shop-over">{{item.sales}}人已付款</p>
        </div>
        </router-link>
        <router-link v-if="top" class="shop-nav-list" v-for="(item,index) in podList " :key="index" :to="{path: 'product/' + item.productId}">
        <div class="shop-image1"><img :src="item.productImg"/></div>
        <div class="shop-right">
            <p class="shop-valid">{{item.productName}}</p>
            <p class="shop-money"><a>¥</a>{{item.productPrice}}</p>
            <p class="shop-rest">{{item.productAmount}}库存</p>
            <p class="shop-over">{{item.discount}}人已付款</p>
        </div>
        </router-link>
        </template>
        <template v-if="!iscontain">
          <v-empty class="no-titles">
        <p slot="title" class="titles">没有您要的商品</p>
           </v-empty>
        </template>
</v-scroll-y>
</v-page>
</keep-alive>
</template>
<script>

import axios from 'axios'
import querystring from 'querystring'
import pager from '../common/pager.vue'
import empty from '../common/empty.vue'
/* eslint-disable no-new */
export default {
    name: 'productList',
    data () {
        return {
            title:'',
            topvalue:[],
            top:'',
            index:'',
            podList:[],
            groupId:'',
            page:0,
            value:'',
            iscontain:false,
            isget:true

        }
    },
    methods: {
        getbrand(id){
            var that=this
            var a=0;
            var t=new Date();
           const url = '/v2/promotion/'+id+"?t="+t
           return axios.post(url)
                .then((res) => {
                  that.topvalue=[]
                  that.topvalue[0]=res.data.data;
                })
                .catch((err) => {
                    return err
                })
        },
        init(){
             this.$router.go(0);
        },
        getPdList (page) {
            var that=this;
            var t=new Date()
            var data={
                page:page,
                size:10,
                categoryId:that.groupId,
            }
            const url = '/v2/catalog/allProducts?direction=desc&pageable=true'+querystring.stringify(data)+'&t='+t
           return axios.post(url)
            .then((res) => {
                
                if(res.data.data.length>0){
                    that.iscontain=true
                }
                 if(res.data.data.length<10){
                     that.isget=false
                }
                    that.podList=that.podList.concat(res.data.data)
                    return that.podList
                })
                .catch((err) => {
                    console.log(err)
                    return err
                })     
        },
         getvalidList (page) {
            var that=this;
            var t=new Date()
            var data={
                page:page,
                size:10
            }
            console.log(data)
            const url = '/v2/promotion/listTweet/'+that.groupId+'?'+querystring.stringify(data)+'&t='+t
            return axios.post(url)
            .then((res) => {
                if(res.data.data.length>0){
                    that.iscontain=true
                }
                 if(res.data.data.length<10){
                     that.isget=false
                }
                    that.podList=that.podList.concat(res.data.data)
                    return that.podList
                })
                .catch((err) => {
                    console.log(err)
                    return err
                })
        },
        getsearch(){
            var t=new Date()
            const url = '/v2/product/searchbyApp?order=default&key='+this.value+'&t='+t
            var that=this
            return axios.post(url)
            .then((res) => {
                //  if(page>0){
                //  if(res.data.data.length<10){
                //      return
                //     }
                // }
                if(res.data.data.list.length>0){
                    that.iscontain=true
                }
                 if(res.data.data.list.length<10){
                     that.isget=false
                }
                    that.podList=that.podList.concat(res.data.data.list)
                    return that.podList
                })
                .catch((err) => {
                    console.log(err)
                    return err
                })
        },
        // getNextPage () {
        //     var that=this
        //     return this.updatePager((page, size) => {
        //         return this.getPdList(page, size, that.groupId)
        //             .then((res) => {
        //                 if (res.data.data) {
        //                     this.title = res.data.data.headline
        //                     return res.data.data.list
        //                 } else throw new Error('请求结果数据错误')
        //             })
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        // },
        OnpullingUp () {
            // this.getNextPage()
            //     .then(() => {
            //         if (this.pager.isMore) {
            //             this.$refs.scroller.finishPullUp()
            //         }
            //     })
            if(this.isget==false){
                return
            }
            this.page++;
            if(this.top==true){
                this.getvalidList(this.page)
            }else if(this.top===false){
             this.getPdList(this.page)
            } else if(this.top===undefined){
                return
                // this.getsearch(this.page)
            }
            
        }
    },
    computed: {
        // pds () {
        //     return this.pager.list
        // }
    },
    components: {
        'v-empty': empty
    },
    created () {
        this.$forceUpdate()
        if (this.$route.query && this.$route.query.groupId) {
            this.groupId = this.$route.query.groupId
            this.top=this.$route.query.istop;
            this.index=this.$route.query.inx
            if(this.top==true){
                this.getbrand(this.groupId)
                this.getvalidList(this.page)
                console.log(this.podList)
            }else{
                var that=this;
             this.getPdList(this.page).then(function(res) {
                 that.podList=res
                // that.$destroy();
                // that.$forceUpdate()
                // this.$router.go({
                //   path: '/pdlist',
                //   force: true
                // })
                // console.log(111111)
             })

            }
           
            // this.getNextPage()
        } else if(this.$route.query && this.$route.query.value){
            this.top=this.$route.query.istop;
            this.value=this.$route.query.value+'';
            this.getsearch(this.page);
            console.log(this.podList)
        }else this.$router.go(-1)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
      .shop-tran{
        width: 3.5rem;
        height: 1.8rem;
        padding:.1rem .09rem .1rem .15rem;
        position: relative;
        float: left;
        background: #fff;
        border: 2px solid #f4f4f4;
    }
    .shop-tran-right{
        width: 3.5rem;
        height: 1.8rem;
        padding:.1rem .09rem .1rem .15rem;
        position: relative;
        float: left;
        background: #fff;
        border: 2px solid #f4f4f4;
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
        box-shadow:0px 5px 15px #FF9A00; 
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
        box-shadow:0px 5px 15px #e30059;
        margin-right: .1rem;
    }
    .shop-nav-list{
        display: block;
        width: 100%;
        height:1.45rem ;
        border-bottom: 4px solid #f4f4f4;
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
    .shop-image1{
        background: #fff;
        width: 1.4rem;
        height: 1.4rem;
        margin-left:.04rem ;
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
    }
    .shop-valid{
        width: 2.11rem;
        height: .38rem;
        line-height: .19rem;
        overflow: hidden;
    }
    .shop-right p{
        color: #666666;
    }
    .shop-right .shop-money{
        color: #e30059;
        font-size: .21rem;
        float: left;
        width: 100%;
        margin-top: .36rem;
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
    .titles{
        font-size: 16px;
    }
    .no-titles{
    background: #f4f4f4;
    }
</style>
