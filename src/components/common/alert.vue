<template>
<div class="index-top" v-if="isShow">
    <div class="alert-dialog-mask"></div>
    <div class="alert-dialog">
        <div class="alert-dialog-container">
            <div class="alert-dialog-title">数据错误</div>
            <div class="alert-dialog-content">{{errorInfo}}</div>

            <div class="alert-dialog-footer">
                <button class="alert-dialog-button alert-dialog-button--primal" @click="hide">OK</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// import bus from './bus.js'
export default {
    name: 'alert',
    data () {
        return {
            isShow: false,
            errorInfo: ''
        }
    },
    methods: {
        show (msg) {
            this.errorInfo = msg
            this.isShow = true
        },
        hide () {
            setTimeout(() => {
                this.isShow = false
            }, 200)
        }
    },
    computed: {

    },
    created () {
        // bus.$on('alert', (msg) => {
        //     this.show(msg)
        // })
    }
}
</script>

<style scoped>
/*    .index-top {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 900;
    }
    .alert-dialog-mask {

    }*/
</style>
