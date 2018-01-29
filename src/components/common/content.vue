<template>
<div class="content">
    <slot></slot>
</div>
</template>

<script>
import page from './page.vue'
export default {
    name: 'thrSection',
    data () {
        return {

        }
    },
    computed: {

    },
    components: {
        'v-page': page
    },
    created () {

    }
}
</script>

<style scoped>
    .content {
        flex: 1 0;
        width: 100%;
        overflow-y: scroll;
    }
</style>
