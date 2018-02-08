<template>
    <div class="pd_info row row-start">
        <div class="pd_img-box">
            <img :src="info.$pdUrl" alt="" class="pd_img">
        </div>
        <div class="pd-content col col-start">
            <div class="tag-list row row-mul">
                <div class="tag-item">{{info.$title}}</div>
            </div>
            <p class="pd_text">
                <span class="pd_spec">
                    <span class="pd_info-key">型号：</span>
                    <span class="pd_info-value">{{info.$skuSize}}</span>
                </span>
                <!-- <span class="pd_size">
                    <span class="pd_info-key">尺寸：</span>
                    <span class="pd_info-value">{{info.$skuSize}}</span>
                </span> -->
            </p>
            <p v-if="info.$disabled" class="invalid-des">该宝贝已卖完</p>
            <template v-else>
                <!-- <del class="pd_price-del">￥{{info.$originPrice}}</del> -->
                <div class="pd_num row row-between">
                    <p class="pd_price">￥{{info.$price}}</p>
                    <slot></slot>
                </div>
            </template>
        </div>
    </div>
</template>
<script>

/* eslint-disable no-new */
export default {
    name: 'pdItem',
    props: ['info'],
    data () {
        return {

        }
    },
    methods: {

    },
    computed: {

    },
    watch: {

    },
    components: {
        // 'v-amount': amount
    },
    created () {
        console.log(this.info)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .pd_info {
        flex: 1;
        box-sizing: border-box;
        padding: .1rem;
        cursor: pointer;
    }
    .pd_img-box {
        align-self: flex-start;
        /*flex: 0 0 .8rem;*/
        width: .8rem;
        height: .8rem;
        /* border: solid 1px #000000; */
        overflow: hidden;
    }
    .pd_img {
        display: block;
        width: 100%;
    }
    .pd-content {
        flex: 1;
        min-height: .8rem;
        align-self: flex-start;
        margin-left: .1rem;
    }
    .tag-list {
        align-self: stretch;
        overflow: hidden;
        height: .4rem;
    }
    .tag-item {
        /* width: .45rem; */
        height: .4rem;
        line-height: .2rem;
        font-size: 15px;
        color: #333333;
    }
    .pd_text {
        align-self: stretch;
        font-size: 13px;
    }
    .pd_info-name {
        color: #616161;
    }
    .pd_info-value {
        color: #242424;
    }
    .pd_spec {

    }
    .pd_size {
        margin-left: .2rem;
    }
    .pd_info-key {
        color: #333;
    }
    .pd_info-value {
        color: #242424;
    }
    .pd_num {
        flex: 1 1;
        height: .27rem;
        align-self: stretch;
        font-size: 16px;
    }
    .pd_price-del {
        align-self: flex-start;
        font-size: 12px;
        color: #888888;
    }
    .pd_price {
        font-size: 16px;
        color: #E30059;
    }
    .pd_amount {
        padding-left: .13rem;
        font-size: 14px;
        color: #8A8A8A;
        background: url(../../assets/multiple.png) left center/.08rem no-repeat;
    }
    .invalid-des {
        align-self: flex-start;
        margin-top: .1rem;
        font-size: 12px;
        color: #000000;
    }
</style>
