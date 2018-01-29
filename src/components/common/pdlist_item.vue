<template>
    <router-link  :to="{name: 'product', params: {id: info.id}}" class="pd">
        <div class="pd_img-box">
            <img :src="info.imgUrl" alt="" class="pd_img">
        </div>
        <div class="logo">
            <img :src="info.brandImgUrl" alt="" class="logo_img">
        </div>
        <div class="collected text-p-cap">{{info.collectionNum}}</div>
    </router-link>
</template>
<script>

// import axios from 'axios'
// import querystring from 'querystring'
/* eslint-disable no-new */

export default {
    name: 'pdListItem',
    props: ['info'],
    data () {
        return {

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
