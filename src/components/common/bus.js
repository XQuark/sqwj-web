import Vue from 'vue'
export default new Vue({
    methods: {
        alert (msg) {
            this.$emit('alert', msg)
        }
    }
})
