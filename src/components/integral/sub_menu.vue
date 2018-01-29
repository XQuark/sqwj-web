<template>
<div class="sub">
    <div class="menu-bar row row-around">
        <div class="menu-item col col-center" :class="{'tab-active': tab==='all'}" @click="toggleTab('all')">全部商品</div>
        <div class="menu-item col col-center" :class="{'tab-active': tab==='capable'}" @click="toggleTab('capable')">我能换购的</div>
    </div>
    <div class="row-mul pd-container">
        <div class="vip_img-box pd_item">
            <img src="http://img4.imgtn.bdimg.com/it/u=2140055304,3929445167&fm=214&gp=0.jpg" alt="" class="vip_img">
        </div>
        <template v-for="(item,index) in pdList">
            <v-pd-col v-if="index<4" :info="item" key="item.id" :index="index"></v-pd-col>
        </template>
    </div>
</div>
</template>

<script>
import pdCol from '../common/pd_integral_col.vue'
/* eslint-disable no-new */
export default {
    name: 'integralSubMenu',
    props: ['allPd', 'canBuyPd'],
    data () {
        return {
            tab: 'all' // 'capable'
        }
    },
    methods: {
        toggleTab (str) {
            this.tab = str
        }
    },
    components: {
        'v-pd-col': pdCol
    },
    computed: {
        pdList () {
            if (this.tab === 'all') {
                return this.allPd
            } else if (this.tab === 'capable') {
                return this.canBuyPd
            } else return []
        }
    },
    created () {

    }
}
</script>


<style scoped>
    .sub {
        width: 100%;
        margin-top: .1rem;
        background: #fff;
    }
    .menu-bar {
        width: 100%;
        height: .4rem;
        border-bottom: solid 1px #f4f4f4;
    }
    .menu-item {
        box-sizing: border-box;
        width: 1rem;
        height: .4rem;
        font-size: .10px;
        color: #666666;
    }
    .tab-active {
        border-bottom: solid 2px #009a44;
        color: #009a44;
    }
    .pd-container {
        /*width: 100%;*/
        padding: .15rem 0;
    }
    .pd_item {
        margin-left: .08rem;
    }
    .vip_img-box {
        box-sizing: border-box;
        width: 2.4rem;
        height: 1.5rem;
        border-radius: .05rem;
        overflow: hidden;
    }
    .vip_img {
        display: block;
        width: 100%;
    }
</style>
