<template>
<v-page ref="page">
<v-scroll-y ref="scroller" @pullingUp="OnpullingUp">
    <div class="head row row-center">
        <div class="scroll_x row row-start">
            <div v-for="item in checkedTags" :key="item.id" class="search-item row row-center">
                <p>{{item.name}}</p>
            </div>
        </div>
        <div class="search-p" @click="cancle">取消</div>
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
            checkedTags: []
        }
    },
    methods: {
        getPdList (page, size, ids) {
            const url = '/v2/product/list?' + querystring.stringify({
                size: size,
                page: page,
                category: ids
            })
            return axios.post(url)
        },
        cancle () {
            this.$router.go(-1)
        },
        getNextPage () {
            return this.updatePager((page, size) => {
                return this.getPdList(page, size, this.ids)
                    .then((res) => {
                        if (res.data.data) {
                            this.checkedTags = res.data.data.categoryList
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
        if (this.$route.query && this.$route.query.category) {
            this.ids = this.$route.query.category
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
        border-bottom: solid 1px #D6D6DB;
        font-size: 12px;
        background: #FFFFFF;
    }
    .scroll_x {
        flex: 1;
        height: 100%;
        overflow-x: scroll;
    }
    .scroll_x::-webkit-scrollbar {
        display: none;
    }
    .search-item {
        position: relative;
        flex: 0 0 .75rem;
        height: .25rem;
        margin: 0 .1rem;
        font-size: 12px;
        color: #666666;
        background: #F0F0F0;
    }
    .search-p {
        font-size: 16px;
        color: #010101;
        margin: 0 .16rem;
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
