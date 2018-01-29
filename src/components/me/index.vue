<template>
<v-page-tab class="white-bg">
    <div class="me-head col-start">
        <div class="avatar-box">
            <img :src="userInfo.avatar" alt="" class="avatar-img">
        </div>
        <router-link class="user-name" :to="{name: 'myInfo'}">{{userInfo.name}}</router-link>
        <p class="shop-name">东方红玩具店</p>
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
        height: 1.53rem;
        border-bottom: solid 1px #E5E5E5;
        background: url(../../../static/img/me_bg.png) center/100% no-repeat;
        float: left;
        /* display: flex; */
        /* flex-flow: column nowrap; */
    }
    .avatar-box {
        width: 1.09rem;
        height: 1.09rem;
        margin-left: 0.36rem;
        margin-top: .226rem;
        border: solid 2px #060606;
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
        margin-top: .45rem;
        margin-left: 0.226rem;
        font-size: 18px;
         height: 0.24rem;
        color: #000000;
        width: 2rem;
        overflow: hidden;
        float: left;
    }
    .shop-name{
        margin-top: .226rem;
        margin-left: 0.226rem;
         font-size: 18px;
        color: #000000;
        width: 2rem;
        height: 0.24rem;
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
