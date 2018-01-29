<template>
    <div class="empty-cart col col-start">
        <p class="empty-title">
            <slot name="title"></slot>
        </p>
        <p class="empty-des">
            <slot name="des"></slot>
        </p>
    </div>
</template>
<script>
/* eslint-disable no-new */

export default {
    name: 'empty',
    props: [],
    data () {
        return {

        }
    },
    created () {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .empty-cart {
        width: 100%;
        height: 2.5rem;
        background: #FFFFFF url(../../assets/empty.png) center center/.64rem .61rem no-repeat;
    }
    .empty-title {
        margin-top: 1.7rem;
        font-size: 16px;
        color: #666666;
    }
    .empty-des {
        font-size: 16px;
        color: #666666;
    }
</style>
