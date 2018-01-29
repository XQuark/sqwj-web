<template>
<div class="num-seting row row-start">
    <div class="num-item num_sub" @click="sub"></div>
    <div class="num_input-box row row-center">
        <input type="text" v-model="amount" @blur="setAmount(amount)" class="num_input">
    </div>
    <div class="num-item num_add" @click="add"></div>
</div>
</template>

<script>
export default {
    name: 'alert',
    props: ['pd', 'max', 'min'],
    data () {
        return {
            amount: this.pd.amount,
            isShow: false,
            errorInfo: ''
        }
    },
    methods: {
        add () {
            this.amount += 1
            this.setAmount()
        },
        sub () {
            this.amount -= 1
            this.setAmount()
        },
        setAmount () {
            let errorInfo = ''
            if (this.amount > this.max) {
                errorInfo = '数量大于库存'
            } else if (this.amount < this.min) {
                errorInfo = '最少购买' + this.min + '件'
            }
            if (errorInfo) {
                this.$emit('alert', errorInfo)
                this.amount = this.pd.amount
            } else this.$emit('updateAmount', this.amount)
        }
    },
    watch: {
        pd () {
            this.amount = this.pd.amount
        }
    },
    computed: {

    },

    created () {

    }
}
</script>

<style scoped>
    .num-seting {
        align-self: flex-end;
        /*margin-bottom: .15rem;*/
    }
    .num-item {
        width: .25rem;
        height: .25rem;
        border: solid 1px #000000;
    }
    .num_sub {
        background: url(../../assets/sub.png) center/.15rem no-repeat;
    }
    .num_add {
        background: url(../../assets/add.png) center/.15rem no-repeat;
    }
    .num_input-box {
        width: .5rem;
        height: .25rem;
        border-top: solid 1px #000000;
        border-bottom: solid 1px #000000;
        
    }
    .num_input {
        display: block;
        width: 70%;
        outline: none;
        border: 0;
        text-align: center;
        font-size: 16px;
        color: #000000;
    }
</style>
