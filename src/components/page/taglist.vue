<template>
<v-page class="white-bg">
    <div class="head row row-center">
            <!-- <div v-for="item in checkedTags" :key="item.id" class="search-item row row-center">
                <p>{{item.text}}</p>
                <div class="close_btn" @click="checkTag(item)"></div>
            </div> -->
        <div @click="search" class="search-logo"></div>
        <input class="search-box" v-on:keydown ="getcode($event)" v-model="searchContain"/>
        <router-link :to="{name: 'home'}" class="search-p">取消</router-link>
    </div>
    <div class="history-search-box">
        <div class="history-search-left"></div>
        <div class="history-search">历史搜索</div>
        <div class="history-search-right"></div>
    </div>
    <div class="history">
    <div class="history-box">
        <div v-for="(item,index) in history" :key="index" @click="getsave(item)" class="history-contain">{{item}}</div>
        <div class="history-remove" @click="clearhistory()"></div>
    </div>
   
    </div>
</v-page>
</template>
<script>

import axios from 'axios'
// import querystring from 'querystring'
import tag from '../common/tag.vue'
/* eslint-disable no-new */

export default {
    name: 'tagList',
    data () {
        return {
            currentId: '',
            brands: [],
            checkedTags: [],
            searchContain:'',
            history:[],
            inx:0
            
        }
    },
    methods: {
        getTagList () {
            const url = '/v2/category/list'
            return axios.post(url)
        },
        switchBrand (id) {
            this.currentId = id
        },
        scroll () {
            this.$nextTick(() => {
                this.$refs.search.scrollLeft = 10000
            })
        },
        checkTag (tag) {
            const index = this.checkedTags.findIndex((item) => {
                return item.id === tag.id
            })
            if (index !== -1) {
                this.checkedTags.splice(index, 1)
            } else this.checkedTags.push(tag)
            this.scroll()
        },
        getTagIds () {
            return this.checkedTags.map((item) => {
                return item.id
            })
        },
        getcode(e){
            var keycode = e.keyCode;    
            if(keycode=='13') { 
               e.preventDefault(); 
               this.search()
            }         
        },
        search () {
            this.saveHistory()
            var that=this;
            this.$router.push({
                name: 'pdList',
                query: {value:that.searchContain}
            })
        },
        saveHistory(){
           
            var a=0;
            this.history.forEach(element => {
                if(this.searchContain===element){
                        a=1
                }
            });
            if(a==0){
               this.inx++
               sessionStorage.setItem(this.inx, this.searchContain)
               sessionStorage.setItem('index', this.inx)
            }
            
        },
        gethistory(){
            for(var i=1;i<=this.inx;i++){
                this.history.push(sessionStorage.getItem(i))
            }
        },
        getsave(value){
            this.searchContain=value;
        },
        clearhistory(){
            this.history=[];
            for(var i=1;i<=this.inx;i++){
                sessionStorage.clear(i)
               
            }
             this.inx=0;
            sessionStorage.setItem('index',1)
        }
    },
    computed: {
        tagList () {
            if (this.currentId) {
                return this.brands.find((item) => {
                    return item.id === this.currentId
                }).children
            } else return []
        },
        isTrilaminar () {
            return !!this.tagList.find((item) => {
                return item.children.length
            })
        }
    },
    components: {
        'v-tag': tag
    },
    created () {
        // this.getTagList()
        //     .then((res) => {
        //         if (res.data && res.data.length) {
        //             this.brands = res.data[0].children
        //             if (this.brands.length) {
        //                 this.switchBrand(this.brands[0].id)
        //             }
        //         } else throw new Error('网络错误')
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
        if(sessionStorage.getItem('index')!=undefined){
            this.inx=sessionStorage.getItem('index');
        }
        console.log(this.inx)
        this.gethistory()
        console.log(this.history)
            
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .white-bg {
        background: #FFFFFF;
    }
    .list-content {
        width: 100%;
    }
    .head {
        position: relative;
        width: 100%;
        height: .5rem;
        background: #eeeeee;
        font-size: 12px;
    }
    .scroll_x {
        width: 3.18rem;
        height: .5rem;
        margin-left: .05rem;
        
    }
    .search-logo{
        width: .29rem;
        height: .29rem;
        background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTMgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQyICgzNjc4MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+aW9zLXNlYXJjaC1pbnB1dC1pY29uPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9ImNvbXBvbmVudHMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJpb3Mtc2VhcmNoLWlucHV0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDguMDAwMDAwLCAtNDMuMDAwMDAwKSIgZmlsbD0iIzdBNzk3QiI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAuMDAwMDAwLCAzNi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNi45OTcyNDgyLDE1LjUwNDE0NjYgQzE3LjA3NzM2NTcsMTUuNTQwNTkzOCAxNy4xNTIyNzMxLDE1LjU5MTYxMjkgMTcuMjE3NzUxNiwxNS42NTcwOTE0IEwyMC42NDk5OTEsMTkuMDg5MzMwOCBDMjAuOTQ0ODQ0OSwxOS4zODQxODQ3IDIwLjk0ODQ3NjQsMTkuODU4NjA2IDIwLjY1MzU0MTIsMjAuMTUzNTQxMiBDMjAuMzYwNjQ4LDIwLjQ0NjQzNDQgMTkuODgxMjcxNiwyMC40NDE5MzE3IDE5LjU4OTMzMDgsMjAuMTQ5OTkxIEwxNi4xNTcwOTE0LDE2LjcxNzc1MTYgQzE2LjA5MTM3LDE2LjY1MjAzMDEgMTYuMDQwMTE3MSwxNi41NzczODc0IDE2LjAwMzQxNDEsMTYuNDk3Nzk5NSBDMTUuMTY3MTY5NCwxNy4xMjcwNDExIDE0LjEyNzEzOTMsMTcuNSAxMywxNy41IEMxMC4yMzg1NzYzLDE3LjUgOCwxNS4yNjE0MjM3IDgsMTIuNSBDOCw5LjczODU3NjI1IDEwLjIzODU3NjMsNy41IDEzLDcuNSBDMTUuNzYxNDIzNyw3LjUgMTgsOS43Mzg1NzYyNSAxOCwxMi41IEMxOCwxMy42Mjc0Njg1IDE3LjYyNjgyMzIsMTQuNjY3Nzc2OCAxNi45OTcyNDgyLDE1LjUwNDE0NjYgWiBNMTMsMTYuNSBDMTUuMjA5MTM5LDE2LjUgMTcsMTQuNzA5MTM5IDE3LDEyLjUgQzE3LDEwLjI5MDg2MSAxNS4yMDkxMzksOC41IDEzLDguNSBDMTAuNzkwODYxLDguNSA5LDEwLjI5MDg2MSA5LDEyLjUgQzksMTQuNzA5MTM5IDEwLjc5MDg2MSwxNi41IDEzLDE2LjUgWiIgaWQ9Imlvcy1zZWFyY2gtaW5wdXQtaWNvbiI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')no-repeat;
        background-position: center;
        background-color: #fff;
        border-radius: 5px;
    }
    .search-box{
        width: 2.89rem;
        height: .29rem;
        background-color:#fff;
        font-size: 14px;
        border-radius: 5px;
        padding-left: .1rem;
        margin-left: -.1rem;
    }
    .scroll_x::-webkit-scrollbar {
        display: none;
    }
    .search-item {
        position: relative;
        flex: 0 0 .75rem;
        height: .25rem;
        margin: 0 .1rem;
        font-size: 12px;
        color: #666666;
        background: #F0F0F0;
    }
    .close_btn {
        position: absolute;
        width: .13rem;
        height: .13rem;
        right: -.06rem;
        top: -.06rem;
        background: url(../../assets/close.png) center/contain no-repeat;
    }
    .search-p {
        width:.5rem;
        font-size: 16px;
        color: #333;
        text-align: center;
    }
    .brand_tag-list {
        align-self: flex-start;
        width: .8rem;
        border-right: solid 1px #D6D6DB;
        background: #ffffff;
    }
    .brand_tag {
        width: .8rem;
        height: .46rem;
        font-size: 14px;
        color: #888888;
    }
    .brand_tag_active {
        color: #070606;
    }
    .tag-list {
        flex: 1 1;
        align-self: flex-start;

    }
    .sub-brand {
    }
    .sub_brand-head {
        margin-top: .15rem;
    }
    .sub_brand-title {
        margin: 0 .1rem;
        font-size: 14px;
        color: #020202;
    }
    .line_black {
        width: .5rem;
        height: 0;
        border-top: solid 1px #000000;
    }
    .history{
        width: 100%;
        height:calc(100% - .75rem);
        background: #fff;
    }
    .history-box{
        width: 100%;
       position: relative;
       float: left;
    }
    .history-remove{
        width: .18rem;
        height: .18rem;
        background: url(../../assets/删除@2x.png);
        background-size: 100% 100%;
        position: absolute;
        right: .11rem;
        bottom: 0;
    }
    .history-contain{
       width: .61rem;
       height: .23rem;
       color: #666;
       font-size: 14px;
       text-align: center;
       line-height: .23rem;
       border: 1px solid #e5e5e5;
       border-radius: 5px;
       margin: .14rem 0 0 .14rem;
       float: left;
    }
    .history-search-box{
        width: 100%;
        height: .12rem;
        font-size: 12px;
        line-height: 12px;
        color: #888;
        padding-top:.13rem;
        background: #fff;
    }
    .history-search-left{
        width: 1.01rem;
        height: 0;
        border-top: 1px solid #e5e5e5;
        margin-top: .05rem;
        float: left;
        margin-left: .46rem;
    }
    .history-search-right{
        width: 1.01rem;
        height: 0;
        border-top: 1px solid #e5e5e5;
        float: left;
        margin-top: .05rem;
    }
    .history-search{
        width: .8rem;
        text-align: center;
        float: left;
    }
</style>
