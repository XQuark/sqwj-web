<template>
<swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper" class="topswiper">
    <swiper-slide v-for="item in imgs" :key="item.imgUrl" class="img-box">
        <a class="carousel_img-box" :href="item.targetUrl">
            <img :src="item.imgUrl" alt="" class="carousel_img">
        </a>
    </swiper-slide>
    <!-- <div class="swiper-pagination"  slot="pagination"></div> -->
    <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
    <!-- <div class="swiper-button-next" slot="button-next"></div> -->
    <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
</swiper>
</template>
<script>
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
/* eslint-disable no-new */

export default {
    name: 'carousel',
    props: ['imgs'],
    data () {
        return {
            notNextTick: true,
            swiperOption: {
                autoplay: 3000,
                direction: 'horizontal',
                grabCursor: true,
                setWrapperSize: true,
                autoHeight: true,
                pagination: '.swiper-pagination',
                paginationType: 'custom',
                paginationCustomRender: (swiper, current, total) => {
                    const item = '<span class="carousel_point"></span>'
                    const activeItem = '<span class="carousel_point carousel_point-active"></span>'
                    let ele = ''
                    for (let i = 1; i <= total; i++) {
                        ele = ele + (i === current ? activeItem : item)
                    }
                    return ele
                },
                paginationClickable: true,
                scrollbarHide: true,
                mousewheelControl: true,
                observeParents: true,
                debugger: true,
                onTransitionStart (swiper) {

                }
            }
        }
    },
    methods: {

    },
    computed: {
        swiper () {
            return this.$refs.mySwiper.swiper
        }
    },
    created () {
     this.getHeight()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.swiper-wrapper{
    width: 100%;
    height: 100%;
}
.swiper-pagination{
    height: 20px;
    
}
.carousel_img-box {
    display: block;
    width:100%;
    height: 100%;
}
.carousel_img {
    display: block;
    width: 100%;
    height: 2.5rem;
}
</style>

<style>
    
.carousel_point {
    display: inline-block;
    width: .15rem;
    height: .02rem;
    margin: 0 .05rem;
    /*opacity: 0.2;*/
    cursor: pointer;
    background: #F0F0F0;
}
.carousel_point-active {
    opacity: 1;
    background: #000000;
}
</style>
