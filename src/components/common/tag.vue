<template>
<div class="tag" @click="check">
    <div class="tag_img-box">
        <img :src="info.tinyImg" alt="" class="tag_img">
    </div>
    <p class="tag-name">{{info.text}}</p>
    <div v-if="checked" class="selected"></div>
</div>

</template>
<script>

/* eslint-disable no-new */

export default {
    name: 'tag',
    props: ['info', 'checkedTags'],
    data () {
        return {

        }
    },
    methods: {
        check () {
            this.$emit('check', this.info)
        }
    },
    computed: {
        checked () {
            return !!this.checkedTags.find((item) => {
                return item.id === this.info.id
            })
        }
    },
    created () {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .tag {
        position: relative;
        width: .7rem;
        margin: .15rem 0 .15rem .21rem;
    }
    .tag_img-box {
        width: .7rem;
        height: .7rem;
        overflow: hidden;
    }
    .tag_img {
        display: block;
        width: 100%;
    }
    .tag-name {
        font-size: 14px;
        color: #888888;
    }
    .selected {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 9;
        width: .2rem;
        height: .2rem;
        background: url(../../assets/check_mark.png) center/contain no-repeat;
    }
</style>
