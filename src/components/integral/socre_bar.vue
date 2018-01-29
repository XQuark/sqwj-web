<template>
<div class="socre row row-center">
    <div class="socre-item border_r row row-center">
        <div class="socre-icon icon-item row row-center">
            <span class="name-text">积分</span>
            <span class="num-text">0</span>
        </div>
    </div>
    <div class="socre-item row row-center">
        <div class="detail-icon icon-item row row-center">
            <span class="name-text">积分详情</span>
        </div>
    </div>
</div>
</template>

<script>
/* eslint-disable no-new */
export default {
    name: 'integralSocre',
    data () {
        return {

        }
    },
    methods: {

    },
    computed: {

    },
    created () {

    }
}
</script>


<style scoped>
    .socre {
        width: 100%;
        height: .4rem;
        background: #fff;
    }
    .socre-item {
        flex: 1 1;
        height: .3rem;
    }
    .socre-icon {
        background: url(../../assets/integral_socre.png) left center/.12rem no-repeat;
    }
    .detail-icon {
        background: url(../../assets/detail.png) left center/.12rem no-repeat;
    }
    .icon-item {
        padding-left: .18rem;
    }
    .name-text {
        font-size: 13px;
        color: #666666;
    }
    .num-text {
        font-size: 13px;
        color: #FF5400;
    }
    .border_r {
        border-right: solid 1px #E5E5E5;
    }
    .horn-icon {
        /*background: url(../../assets/horn.png) left .11rem center/.15rem no-repeat;*/
    }
    .horn-text {
        font-size: 10px;
        color: #F7BA16;
    }
</style>
