<template>
<div class="brand-item">
    <div class="brand-head row row-start">
        <slot name="select"></slot>
        <!-- <div class="brand_img-box">
            <img :src="brandInfo.imgUrl" alt="" class="brand_img">
        </div> -->
        <!-- <p class="brand-name">{{brandInfo.name}}</p> -->
        <slot name="orderStatus"></slot>
    </div>
    <slot name="pds"></slot>
</div>
</template>
<script>
// import axios from 'axios'
// import querystring from 'querystring'
/* eslint-disable no-new */

export default {
    name: 'carOrder',
    props: ['brandInfo'],
    data () {
        return {
            isDisabled: false
        }
    },
    methods: {

    },
    computed: {

    },
    watch: {

    },
    created () {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .brand-item {
        width: 100%;
        background: #FFFFFF;
    }
    .brand-head {
        width: 100%;
    }
    .select-icon {
        width: .2rem;
        height: .2rem;
        margin-left: .1rem;
        background: url(../../assets/circle_black.png) center/contain no-repeat;
    }
    .selected-icon {
        background: url(../../assets/check_mark.png) center/contain no-repeat;
    }
    .brand_img-box {
        width: .35rem;
        height: .35rem;
        margin-left: .1rem;
        border-radius: .17rem;
        border: solid 1px #000000;
        overflow: hidden;
    }
    .brand_img {
        display: block;
        width: 100%;
    }
    .brand-name {
        margin-left: .1rem;
        font-size: 15px;
        color: #4A4A4A;
    }
</style>
