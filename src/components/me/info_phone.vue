<template>
    <v-page class="white-bg">
        <div class="input-list row row-start">
            <label for="" class="input-list-label text-p">手机号</label>
            <input type="text" class="input-list-input text-p" v-model="oldPhone">
            <div class="code-btn row row-center" :class="{'not-btn':!getcode}" @click="getCode">{{codevalue}}</div>
        </div>

        <div class="input-list row row-start">
            <label for="" class="input-list-label text-p">验证码</label>
            <input type="text" class="input-list-input text-p" v-model="phone">
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
            oldPhone:'',
            code: '',
            getcode:true,
            codevalue:"获取验证码"
        }
    },
    methods: {
        getCode () {
            var that=this;
            if(this.checkPhone()){
                if(this.getcode==false){
                return console.log(123)
                }
            const url = '/v2/register/bindPhone?mobile=' + this.oldPhone
            axios.post(url)
                .then((res) => {    
                    console.log(res)
                   this.getcode=false;
                })
                .catch((err) => {
                    console.log(err)
                    return
                })
                var inx=59;
                var time=setInterval(function(){
                    inx--;
                    that.codevalue=inx+"s后再获取";
                    if(inx===0){
                    that.getcode=true;
                    that.codevalue="获取验证码"
                    clearInterval(time)
                     }
                   },1000)
            }     
        },
        checkPhone () {
            if (/^\d{11}$/.test(this.oldPhone)) {
                return true
            } else {
                alert('手机号格式不对')
                return false
            }
        },
        submit () {
            if(this.phone==''){
                return alert('验证码错误')
            }
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
        width: 3.5rem;
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
        background: #e30059;
        font-size: 14px;
        color: #FFFFFF;
    }
    .confirm-btn {
        width: 3.5rem;
        height: .35rem;
        margin: 0 auto;
        margin-top: .1rem;
        background: #e30059;
        font-size: 14px;
        color: #FFFFFF;
    }
    .not-btn{
        background: #888;
    }
</style>
