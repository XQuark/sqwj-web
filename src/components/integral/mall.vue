<template>
<div class="mall">
    <template v-for="item in homeList">
        <div v-if="item.products.length" key="item.title" class="section-item">
            <div class="sec_head row row-center">
                <div class="sharp_left"></div>
                <div class="sec_title">{{item.title}}</div>
                <div class="sharp_right"></div>
            </div>
            <div class="sec_content" :class="{'row-mul':item.flow==='flow', 'row row-start':item.flow==='grid'}">
                <template v-if="item.flow==='flow'">
                    <template v-for="(pd,index) in item.products">
                        <v-pd-b v-if="index<=3" :info="pd"></v-pd-b>
                    </template>
                </template>

                <template v-if="item.flow==='grid'">
                    <v-pd-b v-if="item.products[0]" :info="item.products[0]"></v-pd-b>
                    <div class="md_pd-container col col-between">
                        <template v-for="(pd,index) in item.products">
                            <v-pd-m v-if="(index===1) || (index===2)" :info="pd"></v-pd-m>
                        </template>
                    </div>
                </template>
            </div>
            
        </div>
    </template>
    
    <v-sub-menu :allPd="allPd" :canBuyPd="canBuyPd"></v-sub-menu>

</div>
</template>

<script>
import pdBig from '../common/pd_integral_b.vue'
import pdMiddle from '../common/pd_integral_m.vue'
import subMenu from './sub_menu.vue'
/* eslint-disable no-new */
export default {
    name: 'integralMall',
    props: ['homeList', 'allPd', 'canBuyPd'],
    data () {
        return {

        }
    },
    methods: {

    },
    computed: {

    },
    components: {
        'v-pd-b': pdBig,
        'v-pd-m': pdMiddle,
        'v-sub-menu': subMenu
    },
    watch: {

    },
    created () {

    }
}
</script>


<style scoped>
    .mall {
        width: 100%;
        /*height: 2rem;*/
    }
    .section-item {
        width: 100%;
        margin-top: .1rem;
        background: #fff;
    }
    .sec_head {
        box-sizing: border-box;
        width: 100%;
        height: .45rem;
        border-bottom: solid 1px #F4F4F4;
        font-size: 16px;
        color: #fff;
    }
    .sec_title {
        min-width: .9rem;
        height: .225rem;
        text-align: center;
        background: #2eb779;
    }
    .sharp_left {
        width: .4rem;
        height: .225rem;
        background: url(../../assets/sharp_bg_left.png) center center/.4rem no-repeat;
    }
    .sharp_right {
        width: .4rem;
        height: .225rem;
        background: url(../../assets/sharp_bg_right.png) center center/.4rem no-repeat;
    }
    .sec_content {
        padding-bottom: .2rem;
    }
    .md_pd-container {
        width: 1.75rem;
        height: 2.05rem;
        margin: .1rem 0 0 .07rem;
    }
</style>
