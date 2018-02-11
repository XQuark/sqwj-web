<template>
<v-page >
    <v-scroll-y ref="scroller" >
        <!-- <v-scroll-y ref="scroller" @pullingUp="OnpullingUp"> -->
        <!-- <div class="head col col-center">
            <p class="head-title-name">当前积分</p>
            <p class="head-title">{{totalSocor}}</p>
        </div> -->
        <div class="head-valid">
            <p class="valid" @click="isUseful"><a :class="{'usefula':useful}">有效</a></p>
            <p class="no-valid" @click="notUseful"><a :class="{'usefula':!useful}">已失效</a></p>
        </div>
        
        <!-- <div v-for="item in integraList" :key="item.id" class="row-list row row-start" :class="{'drop-icon': !item.direction, 'rise-icon': item.direction}"> -->
            <!-- <div class="row-list-info col col-center">
                <p class="text-p-cap">{{item.ruleName}}</p>
                <p class="text-date">{{item.createdAt | formatDate('ymdhn')}}</p>
            </div>
            <p class="text-warn-cap">{{item.amount | numSign}}</p> -->
        <!-- </div> -->
        <div v-if="length" class="valid-box">
        <div v-for="item in profitList" :key="item.id" class="row-list  row-start" :class="{'nouseful':!useful}" >
            <div class="row-list-info">
                <p class="valid-name">{{item.couponName}}</p>
                <p class="valid-money">满{{item.applyAbove}}减{{item.discount}}</p>
                <p class="valid-line"></p>
                <p class="valid-time">有效时间：{{item.strValidFrom}}-{{item.strValidTo}}</p>
                <div class="transparent-circle-left"></div>
                <div class="transparent-circle-right"></div>
            </div>
        </div>
        </div>
        <v-empty v-if="!length">
            <p slot="title">还没有任何优惠卷</p>
            <p slot="des">赶快去逛一逛吧～</p>
        </v-empty>

    </v-scroll-y>



</v-page>
</template>
<script>
import axios from 'axios'
import empty from '../common/empty.vue'
import pager from '../common/pager.vue'
/* eslint-disable no-new */
export default {
    name: 'integration',
    extends: pager,
    data () {
        return {
            // integraList: [],
            totalSocor: 0,
            useful:true,
            type:'VALID',
            length:true,
            profitList:[]
        }
    },
    methods: {
        getIntegration (page, size) {
            const url = '/v2/yundou/myDetail?size=' + size + '&page=' + page
            return axios.post(url)
        },
        getProfitList (type) {
            const url = '/v2/promotionCoupon/myCoupon?size=20&page=0&status=' + type
            return axios.post(url)
        },
        checkout (type) {
            // this.currentIndex = index
            this.getProfitList(type)
                .then((res) => {
                    console.log(res)
                    if (res.data.data) {
                        this.profitList = res.data.data;
                        if(this.profitList.length===0){
                            this.length=false
                        }else{this.length=true}
                    } else throw new Error(res.config.url + ' failed')
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        // getNextPage () {
        //     return this.updatePager((page, size) => {
        //         return this.getIntegration(page, size)
        //             .then((res) => {
        //                 if (res.data.data) {
        //                     this.totalSocor = res.data.data.yundouTotalNum
        //                     return res.data.data.list
        //                 } else throw new Error('请求结果数据错误')
        //             })
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        // },
        // OnpullingUp () {
        //     this.getNextPage()
        //         .then(() => {
        //             if (this.pager.isMore) {
        //                 this.$refs.scroller.finishPullUp()
        //             }
        //         })
        // },
        isUseful(){
            this.useful=true
            this.type='VALID'
            this.checkout(this.type)
        },
        notUseful(){
            this.useful=false
             this.type='OVERDUE'
             this.checkout(this.type)
            
        }
    },
    computed: {
        integraList () {
            return this.pager.list
        }
    },
    components: {
        'v-empty': empty
    },
    filters: {
        numSign (value) {
            let num = parseInt(value)
            return num > 0 ? '+' + num.toString() : num
        }
    },
    created () {
        this.setPagerSize(10)
        this.checkout('VALID')
        // this.getNextPage()
    }
}
</script>


<style scoped>
   .wraper[data-v-7ee9cbd6]{
       height: 100%;
   }
    .head {
        width: 100%;
        height: 1.5rem;
        background: url(../../../static/img/integration_bg.png) left/contain no-repeat;
    }
    .head-title-name {
        margin-top: .35rem;
        font-size: .14rem;
        color: #FFFFFF;
        text-align: center;
    }
    .head-title {
        margin-top: .1rem;
        font-size: .14rem;
        color: #FFFFFF;
        text-align: center;
    }
    .row-list {
        background:#FFB642 ;
        margin-left: 2%;
        box-sizing: border-box;
        width: 96%;
        height: 1.1rem;
        margin-top: .1rem;
        border-radius: 10px;
        padding-left: .24rem;
        padding-right: .24rem;
        position: relative;
        color: #ffffff;
    }
    .nouseful{
        background: #888;
    }
    .row-list-info {
        width: 100%;
        height: 100%;
        font-size: .14rem;
        position: relative;
    }
    .text-date {
        font-size: .12rem;
        color: #9B9B9B;
    }
    .rise-icon {
        background: #FFFFFF url(../../assets/rise.png) left .15rem center/.15rem no-repeat;
    }
    .drop-icon {
        background: #FFFFFF url(../../assets/drop.png) left .15rem center/.15rem no-repeat;
    }
    .head-valid{
        font-size: .14rem;
        font-family: PingFang-SC-Regular;
        height: 0.4rem;
        background: #FFFFFF;
        font-family: 600;
    }
    .valid{
       height: 100%;
       width: 50%;
       float: left;
       text-align: center;
       line-height: 0.4rem;
    }
    .valid-box{
       float: left;
        width: 100%;
        height: calc(100% - .4rem);
        background: #f4f4f4;
    }
    .valid a, .no-valid a{
        display: inline;
    }
    .usefula{
         border-bottom: 2px solid #009FE7;
    }
    .no-valid{
       height: 100%;
       width: 50%;
       float: left;
       text-align: center;
       line-height:0.4rem; 
    }
    .row-list-info p{
    float: left;
    width: 100%;
    }
    .valid-name{
       margin-top: 0.15rem;
    }
    .valid-money{
        margin-top:.18rem;
        font-size: .19rem;
    }
    .valid-line{
        margin-top:.05rem;
        border: 1px solid #fff;
    }
    .valid-time{
       margin-top: .04rem;
    }
    .transparent-circle-left{
        width:.12rem ;
        height:.12rem ;
        background: #F4F4F4;
        position: absolute;
        top:48%;
        left: -.3rem;
        border-radius: 50%;
    }
    .transparent-circle-right{
        width:.12rem ;
        height:.12rem ;
        background: #F4F4F4;
        position: absolute;
        top:48%;
        right: -.3rem;
        border-radius: 50%;
    }
</style>
