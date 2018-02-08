<template>
    <v-page>
        <div class="content">
            <slot></slot>
        </div>
        <v-tab></v-tab>
    </v-page>
</template>

<script>
// import router from './router'
import navbar from '../navbar.vue'
import page from './page.vue'
export default {
    name: 'app',
    data () {
        return {

        }
    },
    computed: {

    },
    components: {
        'v-tab': navbar,
        'v-page': page
    },
    created () {

    }
}
</script>

<style scoped>
    .content {
        width: 100%;
        height: calc(100% - .5rem);
        overflow-y: hidden;
        background: #fff;
    }
</style>
