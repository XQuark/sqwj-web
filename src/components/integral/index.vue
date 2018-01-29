<template>
<div class="integral">
    <v-carousel :info="carouselImages" :parent="'integral'"></v-carousel>

    <v-menu @toggleTab="toggleTab" :tab="tab"></v-menu>

    <v-horn></v-horn>

    <v-socre :info="socre"></v-socre>

    <template>
        <v-mall v-if="tab==='mall'" :homeList="homeList" :allPd="allList" :canBuyPd="canBuyList"></v-mall>
        <v-all-pd v-if="tab==='allPd'" :allPd="allList"></v-all-pd>
        <v-new-pd v-if="tab==='newPd'" :newPd="allList"></v-new-pd>
    </template>
    <!-- <router-view :homeList="homeList" :allPd="allList" :canBuyPd="canBuyList"></router-view> -->

</div>

</template>
<script>

/* eslint-disable no-new */
import axios from 'axios'
import querystring from 'querystring'
import carousel from '../home/carousel.vue'
import menu from './menu.vue'
import horn from './horn.vue'
import socre from './socre_bar.vue'

import mall from './mall.vue'
import allPd from './all_pd.vue'
import newPd from './new_pd.vue'

export default {
    name: 'integral',
    data () {
        return {
            carouselImages: [],
            socre: {},
            originHomeList: [],
            tab: 'mall' // 'allPd', 'newPd'
        }
    },
    methods: {
        getSortedList (type) {
            const url = '/v2/yundou/listProduct?' + querystring.stringify({
                order: type
            })
            return axios.post(url)
        },
        getHomeList () {
            const url = '/v2/yundou/homeList'
            return axios.post(url)
        },
        initCarousel () {
            const url = '/v2/openapi/home/getCarousel'
            return axios.post(url)
                .then((res) => {
                    if (res.data.data) {
                        const data = res.data.data
                        this.carouselImages = data.images.map((img, index) => {
                            return {
                                index: index,
                                src: img.imgUrl,
                                link: img.targetUrl,
                                animation: '',
                                active: false
                            }
                        })
                    }
                })
                .catch((err) => {
                    console.error(err)
                })
        },
        init () {
            this.initCarousel()
            this.getHomeList()
                .then((res) => {
                    if (res.data.data) {
                        this.originHomeList = res.data.data
                    }
                })
                .catch((err) => {
                    console.error(err)
                })
        },
        toggleTab (name) {
            this.tab = name
        }
    },
    computed: {
        homeList () {
            return this.originHomeList
                .filter((item) => {
                    return item.category !== 'capableList' && item.category !== 'all'
                })
                .map((item) => {
                    return {
                        flow: item.category === 'NO_LIMIT' ? 'flow' : 'grid',
                        title: item.title,
                        products: item.list
                    }
                })
        },
        allList () {
            const all = this.originHomeList.find((item) => {
                return item.category === 'all'
            })
            if (all) {
                return all.list
            } else return []
        },
        canBuyList () {
            const capable = this.originHomeList.find((item) => {
                return item.category === 'capableList'
            })
            if (capable) {
                return capable.list
            } else return []
        }
    },
    components: {
        'v-carousel': carousel,
        'v-menu': menu,
        'v-horn': horn,
        'v-socre': socre,
        'v-mall': mall,
        'v-all-pd': allPd,
        'v-new-pd': newPd
    },
    created () {
        this.init()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .integral {
        width: 100%;
        background: #f4f4f4;
    }
</style>
