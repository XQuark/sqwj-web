<template>
<div class="pd-footer">
    <div class="panel-row-up row row-start">
        <div class="img_box">
            <img :src="pdInfo.imgUrl" alt="" class="pd_img">
        </div>
        <div class="pd_info col-start">
            <!-- <div class="pd_tag-list row-mul">
                <div v-for="item in pdInfo.categorys" :key="item.id" class="pd_tag-item row row-center">{{item.name}}</div>
            </div> -->
            <div class="pd_price">￥{{pdInfo.rmbPrice}}</div>
            <p class="choose">请选择规格</p>
            <div class="num-seting row row-start">
                <div class="num-item num_sub" @click="sub">-</div>
                <div class="num_input-box row row-center">
                    <input type="text" v-model="amount" class="num_input" @blur="checkAmount">
                </div>
                <div class="num-item num_add" @click="add">+</div>
            </div>
        </div>
    </div>
    <div class="panel-spec">
        <div class="spec-name">颜色</div>
        <div class="spec-color-item row row-center">随机</div>
        <div class="spec-name spec_size-name">规格</div>
        <div class="spec_size-list row row-start">
            <div v-for="item in pdInfo.skus" :key="item.id" class="spec_size-item row row-center" :class="{'spec_size-active': item.id === skuId}" @click="selectSku(item)">{{item.spec}}</div>
        </div>
    </div>
    <div class="confirm-btn row row-center" @click="confirm">确定</div>
</div>


</template>
<script>

/* eslint-disable no-new */

export default {
    name: 'pdFooter',
    props: ['pdInfo'],
    data () {
        return {
            amount: 1,
            skuId: ''
        }
    },
    methods: {
        confirm () {
            if (this.amount > 0 && this.skuId) {
                this.$emit('submit', this.skuId, this.amount)
            } else this.$emit('alert', '请选择正确颜色和数量')
        },
        selectSku (item) {
            if (item.amount < 1) {
                this.$emit('alert', '该商品库存不足，暂时无法购买')
            } else this.skuId = item.id
        },
        checkAmount () {
            if (this.skuId) {
                // const maxAmount = this.findSkuAmount(this.skuId)
                // if (this.amount > maxAmount) {
                //     this.$emit('alert', '购买数量不能超过库存')
                //     this.amount = maxAmount
                // }
            } else {
                this.$emit('alert', '请先选择尺码')
                this.amount = 1
            }
        },
        findSkuAmount (id) {
            return this.pdInfo.skus.find(item => {
                return item.id === id
            }).amount
        },
        add () {
            if (this.skuId) {
                this.amount ++

                // if (this.amount < this.findSkuAmount(this.skuId)) {
                // } else this.$emit('alert', '购买数量不能超过库存')
            } else this.$emit('alert', '请先选择尺码')
        },
        sub () {
            if (this.skuId) {
                if (this.amount > 1) {
                    this.amount --
                } else this.$emit('alert', '最少购买一件')
            } else this.$emit('alert', '请先选择尺码')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
    .pd-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 20;
        background: #FFFFFF;
    }
    .panel-row-up {
        width: 100%;
        padding: .15rem 0;
        border-bottom: solid 1px #F0F0F0;
    }
    .img_box, .pd_info {
        align-self: flex-start;
    }
    .img_box {
        width: .8rem;
        height: .8rem;
        margin-left: .15rem;
        overflow: hidden;
    }
    .pd_img {
        display: block;
        height: 100%;
    }
    .pd_info {
        position: relative;
        flex: 1;
        margin: 0 .08rem 0 .1rem;
        display: flex;
        flex-flow: column nowrap;
    }
    .pd_tag-list, .pd_price {
        align-self: flex-start;
    }
    .pd_tag-list {
        width: 100%;
    }
    .pd_tag-item {
        height: .2rem;
        margin-right: .1rem;
        margin-bottom: .15rem;
        padding: 0 .05rem;
        border: solid 1px #000000;
        font-size: 15px;
        color: #333333;
        background: #FFFFFF;
    }
    .choose{
        font-size: 14px;
        float: left;
        margin-left: 0.14rem;
        margin-top:0.43rem;;
        width: 80px;
        color: #A0A0A0;
    }
    .pd_price {
        margin-top: .01rem;
        font-size: 16px;
        color: #E30059;
        font-family: STHeitiSC-Light;
    }
    .num-seting {
        align-self: flex-end;
        margin-top: -29px;
        /*margin-bottom: .15rem;*/
    }
    .num-item {
        width: .25rem;
        height: .25rem;
        border: solid 1px #A0A0A0;
        color: #A0A0A0;
        font-size: 20px;
        line-height: .25rem;
        text-align: center;
    }
    .num_sub {
        /* background: url(../../assets/sub.png) center/.15rem no-repeat; */
    }
    .num_add {
        /* background: url(../../assets/add.png) center/.15rem no-repeat; */
    }
    .num_input-box {
        width: .5rem;
        height: .25rem;
        border-top: solid 1px #A0A0A0;
        border-bottom: solid 1px #A0A0A0;
        
    }
    .num_input {
        display: block;
        width: 70%;
        outline: none;
        border: 0;
        text-align: center;
        font-size: 16px;
        color: #A0A0A0;
    }
    .panel-spec {
        height: 1.3rem;
        padding: 0 .15rem;
        background: #FFFFFF;
    }
    .spec-name {
        font-size: 16px;
        line-height: .34rem;
        color: #A0A0A0;
        font-family: PingFang-SC-Regular;
    }
    .spec_size-name {
        margin-top: .06rem;
    }
    .spec-color-item {
        width: .6rem;
        height: .22rem;
        font-size: 16px;
        color: #FEFEFE;
        background: #E30059;
    }
    .spec_size-list {

    }
    .spec_size-item {
        width: .4rem;
        height: .22rem;
        margin-right: .15rem;
        border: solid 1px #A0A0A0;
        font-size: 16px;
        color: #000000;
    }
    .spec_size-active {
        color: #FFFFFF;
        background: #E30059;
    }
    .confirm-btn {
        width: 100%;
        height: .4rem;
        font-size: 16px;
        color: #FFFFFF;
        background: #E30059;
    }
</style>
