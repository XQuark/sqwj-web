<template>
    <div v-if="show" class="toast">
        <div class="toast__message">{{msgInfo}}</div>
        <button class="toast__button">ACTION</button>
    </div>

</template>
<script>

/* eslint-disable no-new */

export default {
    name: 'toast',
    props: ['msg', 'uuid'],
    data () {
        return {
            show: false,
            msgInfo: ''
        }
    },
    methods: {
        toast (msg) {
            if (!this.show) {
                this.msgInfo = msg
                this.show = true
                setTimeout(() => {
                    this.show = false
                    this.msgInfo = ''
                }, 300)
            }
        }
    },
    computed: {

    },
    created () {

    }
}
</script>
