<template>
<v-page-tab>
    <v-scroll-y ref="scroller" @pullingUp="OnpullingUp">
            <router-link v-for="item in pds" :key="item.id" :to="{name: 'pdList', query: {groupId: item.id}}" class="pd row row-center">
                <div class="pd_img-box">
                    <img :src="item.imgUrl" alt="" class="pd_img">
                </div>
                <div class="pd_info col col-center">
                    <p class="pd_title">{{item.headline}}</p>
                    <div class="line-white"></div>
                    <p class="pd_sub-title">{{item.subhead}}</p>
                </div>
            </router-link>
        
    </v-scroll-y>
    <router-link :to="{name: 'tagList'}" class="search-btn"></router-link>
</v-page-tab>
</template>
<script>
/* eslint-disable no-new */
import axios from 'axios'
import pager from '../common/pager.vue'

export default {
    name: 'home',
    data () {
        return {
            isMsg: true,
            msgInfo: ''
        }
    },
    extends: pager,
    methods: {
        login () {
            const url = '/v2/signin_check?u=18502169101&mobilePhoneVerifyCode=1&authType=MOBILE_PHONE'
            return axios.post(url)
                .then((res) => {

                })
                .catch((err) => {
                    return err
                })
            // return Promise.resolve()
        },
        getIndexList (page, size) {
            const url = '/v2/productGroup/list?size=' + size + '&page=' + page
            return axios.post(url)
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
    created () {
        this.login()
    },
    mounted () {
        this.getNextPage()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
<style scoped>
    .wraper, .out-wraper {
        width: 100%;
    }
    .out-wraper {
        height: 100%;
    }
    .pd {
        position: relative;
        width: 100%;
        height: 3.75rem;
        margin-bottom: .02rem;
        background: #ffffff;
    }
    .pd_img-box {
        width: 3.61rem;
        height: 3.61rem;
        overflow: hidden;
    }
    .pd_img {
        display: block;
        width: 100%;
    }
    .pd_info {
        position: absolute;
        z-index: 9;
        left: 0;
        height: 100%;
        width: 100%;
    }
    .pd_title {
        font-size: 24px;
        text-align: center;
        color: #ffffff;
    }
    .pd_sub-title {
        font-size: 14px;
        text-align: center;
        color: #ffffff;
    }
    .line-white {
        width: .5rem;
        height: 0;
        margin: .15rem auto;
        border-top: solid 1px #ffffff;
    }
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
</style>
