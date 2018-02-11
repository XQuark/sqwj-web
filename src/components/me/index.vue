<template>
<v-page-tab class="white-bg">
    <div class="me-head col-start">
        <router-link :to="{name: 'myInfo'}" class="avatar-box">
            <img :src="userInfo.avatar" alt="" class="avatar-img">
        </router-link>
        <router-link class="user-name" :to="{name: 'myInfo'}">{{userInfo.name}}</router-link>
    </div>

    <router-link class="me-item order-icon row row-start" :to="{name: 'myOrder'}">我的订单</router-link>

    <router-link class="me-item cart-icon row row-start" :to="{name: 'car'}">购物车</router-link>

    <router-link class="me-item profit-icon row row-start" :to="{name: 'myIntegration'}">我的优惠券</router-link>

    <router-link class="me-item collected-icon row row-start" :to="{name: 'myCollection'}">我的收藏</router-link>

    <router-link class="me-item address-icon row row-start" :to="{name: 'myAddress'}">地址管理</router-link>
    
</v-page-tab>

</template>
<script>
// import querystring from 'querystring'
import axios from 'axios'
/* eslint-disable no-new */

export default {
    name: 'car',
    data () {
        return {
            userInfo: {}
        }
    },
    methods: {
        getUserInfo () {
            const url = '/v2/user/getInfo'
            return axios.post(url)
        },
        init () {
            this.getUserInfo()
                .then((res) => {
                    if (res.data.data) {
                        this.userInfo = res.data.data.user
                        console.log(res.data.data.user)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },
    computed: {

    },
    created () {
        this.init()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .me-head {
        width: 100%;
        height: 1.15rem;
        border-bottom: solid 1px #E5E5E5;
        background: url(../../../static/img/矩形17@2x.png) center/100% no-repeat;
        background-size:100% 100%; 
        float: left;
        /* display: flex; */
        /* flex-flow: column nowrap; */
    }
    .avatar-box {
        width: .82rem;
        height: .82rem;
        margin-left: 0.27rem;
        margin-top: .17rem;
        border:1px solid #000;
        border-radius: 50%;
        overflow: hidden;
        float: left;

    }
    .avatar-img {
        display: block;
        width: 100%;
        border-radius: .3rem;
    }
    .user-name {
        margin-top: .44rem;
        margin-left: 0.17rem;
        font-size: .18rem;
         height: 0.24rem;
        color: #fff;
        width: 2rem;
        overflow: hidden;
        float: left;
        line-height: .24rem;
    }
    .shop-name{
        margin-top: .17rem;
        margin-left: 0.17rem;
        font-size: 14px;
        color: #fff;
        width: 2rem;
        height: 0.14rem;
        line-height: .14rem;
        overflow: hidden;
        float: left;
    }
    .edit-btn {
        width: .8rem;
        height: .2rem;
        margin-top: .18rem;
        border: solid 1px #515151;
        border-radius: .1rem;
        font-size: 11px;
        color: #3F3F3F;
    }
    .me-item {
        height: .5rem;
        padding-left: .5rem;
        border-bottom: solid 1px #E5E5E5;
        font-size: 16px;
        color: #000000;
    }
    .order-icon {
        background: url(../../assets/me_order.png) left .15rem center/.18rem .21rem no-repeat,
                    url(../../assets/arrow_right.png) right .15rem center/.08rem no-repeat;
    }
    .cart-icon {
        background: url(../../assets/me_cart.png) left .15rem center/.22rem .18rem no-repeat,
                    url(../../assets/arrow_right.png) right .15rem center/.08rem no-repeat;
    }
    .profit-icon {
        background: url(../../assets/me_profit.png) left .15rem center/.18rem .16rem no-repeat,
                    url(../../assets/arrow_right.png) right .15rem center/.08rem no-repeat;
    }
    .collected-icon {
        background: url(../../assets/me_collect.png) left .15rem center/.2rem .18rem no-repeat,
                    url(../../assets/arrow_right.png) right .15rem center/.08rem no-repeat;
    }
    .address-icon {
        background: url(../../assets/me_address.png) left .15rem center/.2rem no-repeat,
                    url(../../assets/arrow_right.png) right .15rem center/.08rem no-repeat;
    }
</style>
