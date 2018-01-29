<template>
<div class="menu">
    <div class="menu-container row row-around">
        <div class="menu-item col col-center" :class="{'tab-active': tab==='mall'}" @click="toggleTab('mall')">
            <div class="menu_item-icon menu_mall-icon"></div>
            <div class="menu_item-title menu_item-label">积分商城</div>
        </div>

        <div class="menu-item col col-center" :class="{'tab-active': tab==='allPd'}" @click="toggleTab('allPd')">
            <div class="menu_item-icon menu_all_pd-icon"></div>
            <div class="menu_item-title menu_item-label">全部商品</div>
        </div>

        <div class="menu-item col col-center" :class="{'tab-active': tab==='newPd'}" @click="toggleTab('newPd')">
            <div class="menu_item-icon menu_new_pd-icon"></div>
            <div class="menu_item-title menu_item-label">新上商品</div>
        </div>
    </div>
</div>
</template>

<script>
/* eslint-disable no-new */
export default {
    name: 'integralMenu',
    props: ['tab'],
    data () {
        return {

        }
    },
    methods: {
        toggleTab (name) {
            this.$emit('toggleTab', name)
        }
    },
    computed: {

    },
    created () {

    }
}
</script>


<style scoped>
    .menu {
        width: 100%;
        background: #fff;
    }
    .menu-container {
        width: 3.35rem;
        height: .5rem;
        margin: 0 auto;
    }
    .menu-item {
        box-sizing: border-box;
        width: .7rem;
        height: .5rem;
    }
    .tab-active {
        border-bottom: solid 2px #06A047;
    }
    .menu_item-icon {
        width: .2rem;
        height: .2rem;
    }
    .menu_item-title {
        font-size: .10px;
        color: #333333;
    }
    .menu_item-label {
        margin-top: .03rem;
    }
    .menu_mall-icon {
        background: #fff url(../../assets/integral_mall.png) center center/.2rem no-repeat;
    }
    .menu_all_pd-icon {
        background: #fff url(../../assets/all_pd.png) center center/.2rem no-repeat;
    }
    .menu_new_pd-icon {
        background: #fff url(../../assets/integral_new_pd.png) center center/.2rem no-repeat;
    }
</style>
