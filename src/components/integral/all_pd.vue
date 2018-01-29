<template>
<div class="all_pd">
    <div class="head row row-around">
        <div class="sort-item" :class="{'active-tab': type==='default'}" @click="sortByDefault">综合</div>
        <div class="sort-item price_tab" :class="{'active-tab': type!=='default'}" @click="toggleToPrice">价格</div>
    </div>
    <div class="sec_content row-mul">
        <template v-for="(pd,index) in products">
            <v-pd-b v-if="index<=3" :info="pd"></v-pd-b>
        </template>
    </div>
    
</div>
</template>

<script>
import pdBig from '../common/pd_integral_b.vue'
import axios from 'axios'
import querystring from 'querystring'
/* eslint-disable no-new */
export default {
    name: 'interalAll',
    props: ['allPd'],
    data () {
        return {
            type: 'default', // 'priceUp' 'priceDown'
            products: [],
            defaultSorted: undefined,
            priceUpSorted: undefined,
            priceDownSorted: undefined
        }
    },
    methods: {
        sortByDefault () {
            this.type = 'default'
            if (!this.defaultSorted) {
                this.getSortedList()
                    .then((res) => {
                        if (res.data.data) {
                            this.products = res.data.data.list
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else this.products = this.defaultSorted
        },
        sortByPriceUp () {
            if (!this.priceUpSorted) {
                const options = {
                    order: 'price',
                    direction: 'ASC'
                }
                this.getSortedList(options)
                    .then((res) => {
                        if (res.data.data) {
                            this.priceUpSorted = res.data.data.list
                            this.products = res.data.data.list
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else this.products = this.priceUpSorted
        },
        sortByPriceDown () {
            if (!this.priceDownSorted) {
                const options = {
                    order: 'price',
                    direction: 'DESC'
                }
                this.getSortedList(options)
                    .then((res) => {
                        if (res.data.data) {
                            this.priceDownSorted = res.data.data.list
                            this.products = res.data.data.list
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else this.products = this.priceDownSorted
        },
        toggleToPrice () {
            if (this.type === 'priceUp') {
                this.type = 'priceDown'
                this.sortByPriceDown()
            } else {
                this.type = 'priceUp'
                this.sortByPriceUp()
            }
        },
        getSortedList (data) {
            let url = '/v2/yundou/listProduct?'
            if (data) {
                url = url + querystring.stringify(data)
            }
            return axios.post(url)
        }
    },
    components: {
        'v-pd-b': pdBig
    },
    computed: {

    },
    created () {
        this.sortByDefault()
    }
}
</script>


<style scoped>
    .all_pd {
        width: 100%;
        margin-top: .1rem;
        background: #fff;
    }
    .head {
        height: .4rem;
    }
    .sec_content {
        padding-bottom: .2rem;
    }
    .sort-item {
        font-size: 14px;
        color: #636363;
    }
    .active-tab {
        color: #009A44;
    }
    .price_tab {
        padding-right: .12rem;
        background: url(../../assets/arrow_up_down.png) right center/.09rem no-repeat;
    }
</style>
