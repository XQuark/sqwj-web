<template>
<v-page ref="page">
<v-scroll-y ref="scroller" @pullingUp="OnpullingUp">

    <div class="head row row-center">
        <p class="title">{{title}}</p>
        <!-- <div class="cart-nav"></div> -->
        <router-link class="cart-nav" :to="{name: 'car'}"></router-link>
    </div>
    

    <router-link v-for="item in pds" :key="item.id" :to="{path: 'product/' + item.id}" class="pd">
        <div class="pd_img-box">
            <img :src="item.imgUrl" alt="" class="pd_img">
        </div>
        <div class="logo">
            <img :src="item.brandImgUrl" alt="" class="logo_img">
        </div>
        <div class="collected text-p-cap">{{item.collectionNum}}</div>
    </router-link>
</v-scroll-y>
</v-page>
</template>
<script>

import axios from 'axios'
import querystring from 'querystring'
import pager from '../common/pager.vue'
/* eslint-disable no-new */

export default {
    name: 'productList',
    extends: pager,
    data () {
        return {
            title: ''
        }
    },
    methods: {
        getPdList (page, size, id) {
            const url = '/v2/product/group?' + querystring.stringify({
                size: size,
                page: page,
                groupId: id
            })
            return axios.post(url)
        },
        getNextPage () {
            return this.updatePager((page, size) => {
                return this.getPdList(page, size, this.groupId)
                    .then((res) => {
                        if (res.data.data) {
                            this.title = res.data.data.headline
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
                    if (this.pager.isMore) {
                        this.$refs.scroller.finishPullUp()
                    }
                })
        }
    },
    computed: {
        pds () {
            return this.pager.list
        }
    },
    created () {
        if (this.$route.query && this.$route.query.groupId) {
            this.groupId = this.$route.query.groupId
            this.getNextPage()
        } else this.$router.go(-1)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .head {
        position: relative;
        width: 100%;
        height: .45rem;
        background: #FFFFFF;
    }
    .title {
        font-size: 19px;
        color: #010101;
    }
    .cart-nav {
        position: absolute;
        right: .18rem;
        width: .22rem;
        height: 100%;
        background: url(../../assets/nav_cart.png) center/contain no-repeat;
    }
    .pd {
        display: block;
        position: relative;
        width: 100%;
        height: 2.5rem;
        margin-bottom: .05rem;
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
        border: solid 1px #000000;
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
        bottom: .12rem;
        padding-left: .3rem;
        background: url(../../assets/collect_active.png) left/.18rem no-repeat;
    }
</style>
