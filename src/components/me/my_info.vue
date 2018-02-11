<template>
    <v-page>
        <template v-if="status === 'normal'">
            <div class="row_list-item row_list-avatar row row-between">
                <div class="row_list-left text-p-cap">头像</div>
                <div class="row_list-right me_avatar-box">
                    <img :src="user.avatar" alt="" class="me-avatar">
                </div>
            </div>

            <div class="row_list-item row row-between">
                <div class="row_list-left text-p-cap">姓名</div>
                <div class="row_list-right nick-text">{{user.name}}</div>
            </div>

            <router-link class="row_list-item row row-between" :to="{name: 'infoPhone'}">
                <div class="row_list-left text-p-cap">绑定手机号</div>
                <div class="row_list-right arrow_right-icon text-p-cap">{{user.phone}}</div>
                <div class="icon"></div>
            </router-link>

            <div class="row_list-item row row-between"  @click="toCheckSex">
                <div class="row_list-left text-p-cap">性别</div>
                <div class="row_list-right arrow_right-icon gender-text">{{user.sex}}</div>
                <div class="icon"></div>
            </div>
            
<!--             <router-link class="row_list-item row row-between" :to="{name: 'infoDate'}">
                <div class="row_list-left text-p-cap">生日</div>
                <div class="row_list-right arrow_right-icon gender-text">{{user.birthday | formatDate}}</div>
            </router-link> -->

        </template>

        <template v-if="status === 'sexSelect'">
            <div class="row_list-item row row-between text-p-cap" @click="checkSex('男')">
                <span class="row_list-left">男</span>
            </div>
            <div class="row_list-item row row-between text-p-cap" @click="checkSex('女')">
                <span class="row_list-left">女</span>
            </div>
        </template>

    </v-page>

</template>

<script>
// import querystring from 'querystring'
import axios from 'axios'
/* eslint-disable no-new */
export default {
    name: 'myInfo',
    data () {
        return {
            user: {},
            status: 'normal'
        }
    },
    methods: {
        getUserInfo () {
            const url = '/v2/user/getInfo'
            return axios.post(url)
        },
        toCheckSex () {
            this.status = 'sexSelect'
        },
        checkSex (gender) {
            const url = '/v2/user/update?sex=' + gender
            axios.post(url)
                .then((res) => {
                    if (res.data.data) {
                        this.user.sex = gender
                    }
                    this.status = 'normal'
                })
                .catch((err) => {
                    this.status = 'normal'
                    console.log(err)
                })
        }
    },
    computed: {
        phone () {
            var number=this.user.phone;
            var userphone=number.substr(0, 3) + '****' + number.substr(7); 
            return userphone ;
        }
    },
    created () {
        this.getUserInfo()
            .then((res) => {
                if (res.data.data) {
                    this.user = res.data.data.user
                }
            })
            .catch(() => {

            })
    }
}
</script>
<style scoped>
    .row_list-item {
        width: 100%;
        height: .45rem;
        border-bottom: solid 1px #E5E5E5;
        background: #FFFFFF;
        position: relative;
    }
    .icon{
        position: absolute;
        width: .09rem;
        height: .18rem;
        top: .12rem;
        right: .12rem;
        background: url(../../assets/arrow_right.png) no-repeat;
        background-size: 100% 100%;
    }
    .row_list-avatar {
        height: .8rem;
    }
    .me_avatar-box {
        width: .5rem;
        height: .5rem;
        overflow: hidden;
    }
    .me-avatar {
        display: block;
        width: 100%;
    }
    .row_list-left {
        margin-left: .15rem;
    }
    .row_list-right {
        margin-right: .15rem;
    }
    .nick-text {
        font-size: 16px;
        color: #666666;
    }
    .gender-text {
        font-size: 16px;
        color: #888888;
    }
    .arrow_right-icon {
        padding-right: .15rem;
        /* background: url(../../assets/arrow_right.png) right center/.1rem no-repeat; */
    }
    .sex-checkbox {
        display: block;
        /*width: 0;*/
        /*height: 0;*/
        /*border: 0;*/
        /*outline: none;*/
    }
</style>
