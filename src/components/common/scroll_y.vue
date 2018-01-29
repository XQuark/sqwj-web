<template>
<div class="scroll_y" @scroll="scrollListener($event)">
    <div class="wraper">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'thrSection',
    // props: [''],
    data () {
        return {
            listenerOn: true
        }
    },
    methods: {
        finishPullUp () {
            this.listenerOn = true
        },
        scrollListener (e) {
            if (this.listenerOn) {
                const target = e.target
                const bDistance = target.scrollHeight - target.offsetHeight - target.scrollTop
                if (bDistance < 100) {
                    this.listenerOn = false
                    this.$emit('pullingUp')
                }
            }
        }
    },
    created () {

    }
}
</script>

<style scoped>
    .scroll_y {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
    }
    .wraper {
        width: 100%;
    }
</style>
