 /* eslint-disable */
import Vue from 'vue'
export default new Vue({
    data: {
        wxInfo: {}
    },
    methods: {
        config (data) {
            this.wxInfo = data
            wx.error((res) => {
                WeixinJSBridge.log(res) // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            })
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timeStamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名，见附录1
                jsApiList: ['checkJsApi', 'chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
        },
        ready () {
            return new Promise((resolve, reject) => {
                wx.ready(() => {
                    resolve(true)
                })
            })
        },
        chooseWXPay () {
            return new Promise((resolve, reject) => {
                wx.chooseWXPay({
                    timestamp: this.wxInfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: this.wxInfo.nonceStr, // 支付签名随机串，不长于 32 位
                    package: this.wxInfo.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: this.wxInfo.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: this.wxInfo.paySign, // 支付签名
                    success: (res) => {
                        WeixinJSBridge.log(res);
                        resolve(res)
                    },
                    cancel (msg) {
                        WeixinJSBridge.log(msg);
                        reject({
                            reason: 'cancel',
                            msg: msg
                        })
                    },
                    fail (err) {
                        WeixinJSBridge.log(err);
                        reject({
                            reason: 'error',
                            msg: err
                        })
                    }
                })
            })
        },
        checkJsApi () {
            return new Promise((resolve, reject) => {
                wx.checkJsApi({
                    jsApiList: ['chooseWXPay'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    success (res) {
                        resolve(res)
                    }
                })
            })
        }
    }
})
