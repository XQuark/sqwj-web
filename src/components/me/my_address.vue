<template>
<v-page>
    <div class="address-list">
    <router-link class="add-address text-p-cap row row-start" :to="{name: 'addressCreate'}">添加新地址</router-link>
        <div v-for="item in addrList" :key="item.id" class="address-item">
            <p class="user-info text-p-cap">
                <span>{{item.consignee}}</span>
                <span class="user_info-phone">{{item.phone}}</span>
            </p>
            <p class="addr-info text-p">{{item.details}}</p>
            <div class="floor-row row row-end">
                <p v-if="item.isDefault" class="default-amrk">[默认地址]</p>
                <router-link class="edit-btn text-p" :to="{path: '/address/edit/' + item.id}">修改</router-link>
                <div class="delete-btn text-p" @click="addrDelete(item.id)">删除</div>
            </div>
        </div>
    </div>
</v-page>
</template>

<script>
import axios from 'axios'
/* eslint-disable no-new */
export default {
    name: 'addressList',
    data () {
        return {
            addrList: []
        }
    },
    methods: {
        getAddrList () {
            const url = '/v2/address/list'
            return axios.post(url)
        },
        addrDelete (id) {
            const url = `/v2/address/${id}/delete`
            axios.post(url)
            .then((res) => {
                if (res.data.data === true) {
                    const index = this.addrList.findIndex((item) => {
                        return item.id === id
                    })
                    this.addrList.splice(index, 1)
                } else throw new Error('网络请求数据错误')
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
    computed: {

    },
    created () {
        this.getAddrList()
            .then((res) => {
                if (res.data.data) {
                    this.addrList = res.data.data
                } else throw new Error('网络请求数据错误')
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
</script>
<style scoped>
    .address-list {
        width: 100%;
        background: #FFFFFF;
    }
    .add-address {
        height: .45rem;
        padding: 0 .15rem;
        border-bottom: solid 1px #F0F0F0;
        background: url(../../assets/arrow_right_dark.png) right .15rem center/.08rem no-repeat;
    }
    .address-item {
        padding: 0 .15rem;
        border-bottom: solid 1px #F0F0F0;
    }
    .user-info {
        margin-top: .1rem;
    }
    .user_info-phone {
        margin-left: .3rem;
    }
    .addr-info {
        margin-top: .1rem;
    }
    .floor-row {
        margin: .1rem 0 .05rem 0;
    }
    .default-amrk {
        flex: 1 1;
        font-size: 11px;
        color: #FF5350;
        text-align: left;
    }
    .edit-btn, .delete-btn {
        padding-left: .2rem;
        margin-left: .2rem;
    }
    .edit-btn {
        background: url(../../assets/edit.png) left center/.13rem no-repeat;
    }
    .delete-btn {
        background: url(../../assets/delete.png) left center/.13rem no-repeat;
    }
</style>
