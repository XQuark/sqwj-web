<template>
<div class="horn horn-icon row row-center">
    <span class="horn-text">您的积分还处于闲置状态吗？积分当钱花，好货天天拿！</span>
</div>
</template>

<script>
/* eslint-disable no-new */
export default {
    name: 'horn',
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
    .horn {
        width: 100%;
        height: .3rem;
        background: #f4f4f4;
    }
    .horn-icon {
        background: url(../../assets/horn.png) left .11rem center/.15rem no-repeat;
    }
    .horn-text {
        font-size: 10px;
        color: #F7BA16;
    }
</style>
