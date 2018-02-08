<template>
    <div class="address">
        <div class="info-item row row-start">
            <div class="info-label">收件人： </div>
            <div class="info-content row row-start">
                <input type="text" class="addr-input-item" v-model="user.consignee">
            </div>
        </div>
        <div class="info-item row row-start">
            <div class="info-label">联系方式：</div>
            <div class="info-content row row-start">
                <input type="text" class="addr-input-item" v-model="user.phone">
            </div>
        </div>
        <div class="info-item row row-start">
            <div class="info-label">所在地区：</div>
            <div class="info-content row row-start">
                <select class="select-input" v-model="province">
                    <option v-for="(item,index) in provinceList" :value="item.id">{{item.name}}</option>
                </select>
                <select class="select-input" v-model="city">
                    <option v-for="item in cityList" :value="item.id">{{item.name}}</option>
                </select>
                <select class="select-input" v-model="user.zoneId">
                    <option v-for="item in districtList" :value="item.id">{{item.name}}</option>
                </select>
            </div>
        </div>
        <div class="info-item row row-start">
            <div class="info-label">详细地址：</div>
            <div class="info-content row row-start">
                <input type="text" class="addr-input-item" v-model="user.street">
            </div>
        </div>
        <div class="info-item row row-start">
            <div class="info-label">店名：</div>
            <div class="info-content row row-start">
                <input type="text" class="addr-input-item" v-model="user.storeName">
            </div>
        </div>
        <div class="default-setting row row-between">
            <div class="col col-center">
                <p class="setting-title text-lable ">设为默认地址</p>
                <p class="setting-prompt text-prompt">注：每次下单时会使用该地址</p>
            </div>
            <label class="switch">
              <input type="checkbox" class="switch__input" v-model="user.isDefault">
              <div class="switch__toggle">
                <div class="switch__handle"></div>
              </div>
            </label>
        </div>

        <div class="confirm-btn row row-center" @click="submit">保存</div>

        <template v-if="isAlert">
            <div class="alert-dialog-mask"></div>
            <div class="alert-dialog">
                <div class="alert-dialog-container">
                    <div class="alert-dialog-title">数据错误</div>
                    <div class="alert-dialog-content">请填写正确{{errorInfo}}</div>

                    <div class="alert-dialog-footer">
                        <button class="alert-dialog-button alert-dialog-button--primal" @click="closeAlert">OK</button>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import querystring from 'querystring'
import axios from 'axios'
/* eslint-disable no-new */
export default {
    name: 'address',
    data () {
        return {
            currentAddrId: null,
            addrList: [],
            provinceList: [],
            cityList: [],
            districtList: [],
            province: null,
            city: null,
            district: null,
            user: {
                consignee: '',
                zoneId: '',
                phone: '',
                street: '',
                isDefault: false,
                storeName:''
            },
            isAlert: false,
            tradeName:'东方文具店'
        }
    },
    methods: {
        getAreaList (id) {
            const url = `/zone/${id}/children`
            return axios.post(url)
        },
        setAddrSelect (id, setedAttr) {
            this.getAreaList(id)
                .then((res) => {
                    if (res.data) {
                        this[setedAttr] = res.data
                    } else throw new Error('网络请求数据错误')
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        saveAddress (data) {
            const params = Object.assign(this.currentAddrId ? {id: this.currentAddrId} : {}, data)
            const url = '/v2/address/save?' + querystring.stringify(params)
            return axios.post(url)
        },
        getAddrInfo (id) {
            const url = '/v2/address/' + id
            return axios.post(url)
        },
        closeAlert () {
            this.isAlert = false
        },
        alert () {
            this.isAlert = true
        },
        submit () {
            if (this.errorInfo) {
                this.alert()
            } else {
                this.saveAddress(this.user)
                    .then((res) => {
                        if (res.data.data && res.data.data.id) {
                            this.$router.go(-1)
                        } else throw new Error('网络请求数据错误')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
        initEdit (id) {
            this.currentAddrId = id
            this.getAddrInfo(id)
                .then((res) => {
                    if (res.data.data) {
                        const addr = res.data.data
                        this.user = {
                            consignee: addr.consignee,
                            zoneId: addr.zoneId,
                            phone: addr.phone,
                            street: addr.street,
                            isDefault: addr.isDefault,
                            storeName:addr.storeName

                        }
                        this.setAddrSelect(1, 'provinceList')
                        this.province = addr.zones[1].id
                        this.district = addr.zones[3].id
                        this.city = addr.zones[2].id
                    } else throw new Error('网络请求数据错误')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },
    components: {
        // 'v-pd': pd
    },
    computed: {
        errorInfo () {
            const u = this.user
            if (!u.consignee) {
                return '收件人'
            } else if (!u.zoneId) {
                return '所在地区'
            } else if (!u.phone) {
                return '联系方式'
            } else if (!u.street) {
                return '详细地址'
            } else return false
        }
    },
    watch: {
        province (value) {
            if (value) this.setAddrSelect(value, 'cityList')
        },
        city (value) {
            if (value) this.setAddrSelect(value, 'districtList')
        },
        provinceList (value) {
            let currentProvince = value.find(item => {
                return item.id === this.province
            })
            if (!currentProvince) {
                this.province = value[0].id
            }
        },
        cityList (value) {
            const currentCity = value.find(item => {
                return item.id === this.city
            })
            if (!currentCity) {
                this.city = value[0].id
            }
        },
        districtList (value) {
            const currentDistrict = value.find(item => {
                return item.id === this.district
            })
            if (!currentDistrict) {
                this.district = value[0].id
                this.user.zoneId = value[0].id
            }
        }
    },
    created () {
        if (this.$route.params.id) { // 编辑地址
            this.initEdit(this.$route.params.id)
        } else this.setAddrSelect(1, 'provinceList') // 新增地址
    }
}
</script>
<style scoped>
    .address {
        width: 100%;
        background: #FFFFFF;
    }
    .info-item {
        height: .5rem;
        padding: 0 .12rem;
        border-bottom: solid 1px #F0F0F0;
    }
    .info-label {
        min-width: .7rem;
        font-size: 14px;
        color: #666666;
    }
    .info-content {
        flex: 1 1;
        align-self: stretch;
    }
    .addr-input-item {
        display: block;
        height: .2rem;
        font-size: 14px;
        color: #333333;
    }
    .detail-icon {
        background: url(../../assets/arrow_right_dark.png) right  center/.08rem no-repeat;
    }
    .default-setting {
        height: .75rem;
        padding: 0 .12rem;
        border-bottom: solid 1px #F0F0F0;
    }
    .setting-title {
        align-self: flex-start;
    }
    .setting-prompt {
        margin-top: .1rem;
    }
    .text-lable {
        font-size: 14px;
        color: #666666;
    }
    .text-prompt {
        font-size: 12px;
        color: #999999;
    }
    .confirm-btn {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: .45rem;
        background: #000000;
        font-size: 18px;
        color: #FFFFFF;
        background: #000000;
    }
    :checked + .switch__toggle {
        box-shadow: inset 0 0 0 2px #4CD864;
        background-color: #4CD864;
    }
    .select-input {
        /*flex: 1 1;*/
        width: 30%;
        margin-right: .1rem;
        font-size: 14px;
    }
</style>
