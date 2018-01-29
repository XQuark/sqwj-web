<template>
<div class="rtb-count row row-center">
    
    <span class="count-title">仅剩</span>

    <div class="count-item count-number row row-center">{{count.hour0}}</div>
    <div class="count-item count-number row row-center">{{count.hour1}}</div>

    <span class="count-item count-unit-text">时</span>

    <div class="count-item count-number row row-center">{{count.minute0}}</div>
    <div class="count-item count-number row row-center">{{count.minute1}}</div>

    <span class="count-item count-unit-text">分</span>

    <div class="count-item count-number row row-center">{{count.second0}}</div>
    <div class="count-item count-number row row-center">{{count.second1}}</div>

    <span class="count-unit-text count-item ">秒</span>
</div>

</template>
<script>

/* eslint-disable no-new */

export default {
    name: 'countDown',
    props: ['endTime'],
    data () {
        return {
            deadLine: 0
        }
    },
    methods: {
        subOne () {
            const t = setTimeout(() => {
                clearTimeout(t)
                const deadLine = this.endTime - new Date().getTime()
                if (deadLine > 0) {
                    this.deadLine = deadLine
                    this.subOne()
                }
            }, 1000)
        }
    },
    computed: {
        count () {
            const s = parseInt(this.deadLine / 1000)
            const hours = Math.floor(s / 3600)
            const min = Math.floor((s % 3600) / 60)
            const seconds = s % 60
            return {
                hour0: Math.floor((hours % 100) / 10),
                hour1: Math.floor(hours % 10),
                minute0: Math.floor(min / 10),
                minute1: Math.floor(min % 10),
                second0: Math.floor(seconds / 10),
                second1: Math.floor(seconds % 10)
            }
        }
    },
    watch: {

    },
    components: {

    },
    created () {
        this.deadLine = Math.max(0, this.endTime - new Date().getTime())
        this.subOne()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .rtb-count {
        /*flex: 1 1;*/
        height: .13rem;
        padding: .065rem 0;
    }
    .count-title {
        margin-right: .075rem;
        font-size: .12rem;
        line-height: 1;
        color: #ea2429;
    }
    .count-unit-text {
        color: #666;
    }
    .count-item {
        margin: 0 .015rem;
        line-height: 1;
        font-size: .1rem;
    }
    .count-number {
        box-sizing: border-box;
        width: .11rem;
        height: .13rem;
        padding: .015rem 0;
        color: #fff;
        background: #EA2429;
    }
</style>
