<template>
    <div class="new_pd sec_content row-mul">
        <template v-for="(pd,index) in newPd">
            <v-pd-b v-if="index<=3" :info="pd"></v-pd-b>
        </template>
    </div>
</template>

<script>
import pdBig from '../common/pd_integral_b.vue'
// import axios from 'axios'
// import querystring from 'querystring'
/* eslint-disable no-new */
export default {
    name: 'interalNew',
    props: ['newPd'],
    data () {
        return {

        }
    },
    methods: {

    },
    components: {
        'v-pd-b': pdBig
    },
    computed: {

    },
    created () {

    }
}
</script>


<style scoped>
    .new_pd {
        width: 100%;
        margin-top: .1rem;
        padding-bottom: .2rem;
        background: #fff;
    }
</style>
