<template>
    <div class="container col col-start">
        <slot></slot>
        <v-alert class="alert-layer" ref="alert"></v-alert>
        <v-toast ref="toast"></v-toast>
    </div>
</template>

<script>
import alert from './alert.vue'
import toast from './toast.vue'
export default {
    name: 'app',
    data () {
        return {
            isMsg: false,
            msgInfo: ''
        }
    },
    methods: {
        toast (msg) {
            console.log(msg)
            this.$refs.toast.toast(msg)
        },
        alert (msg) {
            this.$refs.alert.show(msg)
        }
    },
    computed: {

    },
    watch: {

    },
    components: {
        'v-alert': alert,
        'v-toast': toast
    },
    created () {

    }
}
</script>

<style scoped>
    .container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #F4F4F4;
        overflow-y: scroll;
    }
    .alert-layer {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 200;
    }
    .white-bg {
        background: #f4f4f4;
        width: 100%;
    }
</style>
