<template>
<v-page :class="{'white-bg': !integraList.length}">
    <v-scroll-y ref="scroller" @pullingUp="OnpullingUp">
        <div class="head col col-center">
            <p class="head-title-name">当前积分</p>
            <p class="head-title">{{totalSocor}}</p>
        </div>

        <div v-for="item in integraList" :key="item.id" class="row-list row row-start" :class="{'drop-icon': !item.direction, 'rise-icon': item.direction}">
            <div class="row-list-info col col-center">
                <p class="text-p-cap">{{item.ruleName}}</p>
                <p class="text-date">{{item.createdAt | formatDate('ymdhn')}}</p>
            </div>
            <p class="text-warn-cap">{{item.amount | numSign}}</p>
        </div>

        <v-empty v-if="!integraList.length">
            <p slot="title">还没有任何积分</p>
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
            totalSocor: 0
        }
    },
    methods: {
        getIntegration (page, size) {
            const url = '/v2/yundou/myDetail?size=' + size + '&page=' + page
            return axios.post(url)
        },
        getProfitList (type) {
            const url = '/v2/commission/listByApp?size=8&page=0&type=' + type
            return axios.post(url)
        },
        checkout (index) {
            this.currentIndex = index
            this.getProfitList(this.menus[index].type)
                .then((res) => {
                    if (res.data.data) {
                        this.profitList = res.data.data
                    } else throw new Error(res.config.url + ' failed')
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getNextPage () {
            return this.updatePager((page, size) => {
                return this.getIntegration(page, size)
                    .then((res) => {
                        if (res.data.data) {
                            this.totalSocor = res.data.data.yundouTotalNum
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
        this.getNextPage()
    }
}
</script>


<style scoped>
    .head {
        width: 100%;
        height: 1.5rem;
        background: url(../../../static/img/integration_bg.png) left/contain no-repeat;
    }
    .head-title-name {
        margin-top: .35rem;
        font-size: 14px;
        color: #FFFFFF;
        text-align: center;
    }
    .head-title {
        margin-top: .1rem;
        font-size: 36px;
        color: #FFFFFF;
        text-align: center;
    }
    .row-list {
        box-sizing: border-box;
        width: 100%;
        height: .5rem;
        margin-top: .1rem;
        padding-left: .45rem;
        padding-right: .15rem;
        background: #FFFFFF;
    }
    .row-list-info {
        flex: 1 1;
        align-items: flex-start;
        line-height: 1.5;
    }
    .text-date {
        font-size: 12px;
        color: #9B9B9B;
    }
    .rise-icon {
        background: #FFFFFF url(../../assets/rise.png) left .15rem center/.15rem no-repeat;
    }
    .drop-icon {
        background: #FFFFFF url(../../assets/drop.png) left .15rem center/.15rem no-repeat;
    }
</style>
