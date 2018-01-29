<template>
    <v-page class="white-bg">
        <div class="row row-start">
            <div class="input-list row row-start">
                <label for="" class="input-list-label text-p">年</label>
                <input type="text" class="input-list-input text-p" v-model="phone">
            </div>

            <div class="input-list row row-start">
                <label for="" class="input-list-label text-p">月</label>
                <input type="text" class="input-list-input text-p" v-model="phone">
            </div>

            <div class="input-list row row-start">
                <label for="" class="input-list-label text-p">日</label>
                <input type="text" class="input-list-input text-p" v-model="phone">
            </div>
            
        </div>

        <div class="confirm-btn row row-center" @click="submit">确定</div>
    </v-page>
</template>

<script>
// import querystring from 'querystring'
import axios from 'axios'
/* eslint-disable no-new */
export default {
    name: 'phone',
    data () {
        return {
            phone: '',
            code: ''
        }
    },
    methods: {
        // getCode () {
        //     const url = '/v2/register/bindPhone?mobile=' + this.oldPhone
        //     axios.post(url)
        //         .then((res) => {
        //             console.log(res)
        //         })
        //         .catch((err) => {
        //             console.log(err)
        //         })
        // },
        checkPhone () {
            if (/^\d{11}$/.test(this.phone)) {
                return true
            } else {
                alert('手机号格式不对')
                return false
            }
        },
        submit () {
            if (this.checkPhone()) {
                const url = '/v2/user/updatePhoneNew?mobile=' + this.phone
                axios.post(url)
                    .then((res) => {
                        if (res.data.data !== true) {
                            alert('绑定失败')
                        }
                        this.$router.go(-1)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    },
    created () {

    }
}
</script>
<style scoped>
    .input-list {
        /*width: 3.5rem;*/
        flex: 1 1;
        height: .45rem;
        margin: 0 auto;
        margin-top: .1rem;
        background: #F5F5F5;
    }
    .input-list-label {
        margin-left: .14rem;
    }
    .input-list-input {
        flex: 1 1;
        margin-left: .2rem;
        background: #F5F5F5;
    }
    .code-btn {
        width: .85rem;
        height: .3rem;
        margin-right: .1rem;
        background: #000000;
        font-size: 14px;
        color: #FFFFFF;
    }
    .confirm-btn {
        width: 3.5rem;
        height: .35rem;
        margin: 0 auto;
        margin-top: .1rem;
        background: #000000;
        font-size: 14px;
        color: #FFFFFF;
    }
</style>
