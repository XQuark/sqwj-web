<template>
<v-page :class="{'white-bg': !colList.length}">
    <v-scroll-y ref="scroller" @pullingUp="OnpullingUp">
        <template v-if="colList.length">
            <v-item v-for="item in colList" :key="item.id" :info="item" ></v-item>
        </template>
        <v-empty v-else>
            <p slot="title">还没有收藏任何商品</p>
            <p slot="des">赶快去逛一逛吧～</p>
        </v-empty>
    </v-scroll-y>



</v-page>

</template>
<script>
import axios from 'axios'
import empty from '../common/empty.vue'
import pdListItem from '../common/pdlist_item.vue'
import pager from '../common/pager.vue'
// import querystring from 'querystring'

/* eslint-disable no-new */

export default {
    name: 'myCollection',
    extends: pager,
    data () {
        return {

        }
    },
    methods: {
        getCollections (page, size) {
            const url = '/v2/productCollection/list?size=' + size + '&page=' + page
            return axios.post(url)
        },
        getNextPage () {
            return this.updatePager((page, size) => {
                return this.getCollections(page, size)
                    .then((res) => {
                        console.log(res)
                        if (res.data.data) {
                            console.log(res.data.data.list)
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
        colList () {
            return this.pager.list
        }
    },
    components: {
        'v-item': pdListItem,
        'v-empty': empty
    },
    created () {
        this.getNextPage()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
