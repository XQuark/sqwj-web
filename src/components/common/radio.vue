<template>
<div class="radio row row-center">
    <div class="radio-container">
        <div v-for="item in info.answers" class="radio-item row row-start" :class="{'radio-selected': item.chosed, 'radio-selected-none': !item.chosed}" @click="select(item)">{{item.text}}</div>
    </div>
</div>

</template>
<script>

/* eslint-disable no-new */

export default {
    name: 'radio',
    props: ['info'],
    data () {
        return {
            response: {},
            height: ''
        }
    },
    methods: {
        select (answer) {
            this.reset()
            answer.chosed = true
            setTimeout(() => {
                this.$emit('select', this.info, answer)
            }, 300)
        },
        reset () {
            this.info.answers.forEach((item) => {
                item.chosed = false
            })
        }
    },
    computed: {

    },
    watch: {

    },
    components: {

    },
    created () {
        // this.answers = JSON.parse(JSON.stringify(this.info))
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .radio {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(64, 64, 64, .75);
        z-index: 200;
        font-size: .16rem;
    }
    .radio-container {
        width: 80%;
        background: #fff;
        box-shadow: 0 0 .1rem #404040;
    }
    .radio-item {
        height: .5rem;
        padding-left: .4rem;
        border-bottom: solid 1px #eee;
        color: #000;
    }
    .base_ques-inputed {
        color: #000;
    }
    .radio-selected {
        background: url('../../assets/radio_active.png') left .1rem center/.2rem no-repeat; 
    }
    .radio-selected-none {
        background: url('../../assets/radio.png') left .1rem center/.2rem no-repeat; 
    }
    .checkbox-selected {
        background: url('../../assets/selected.png') left .1rem center/.2rem no-repeat; 
    }
    .checkbox-selected-none {
        background: url('../../assets/radio.png') left .1rem center/.2rem no-repeat; 
    }
</style>
