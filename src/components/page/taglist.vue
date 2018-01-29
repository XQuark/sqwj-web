<template>
<v-page class="white-bg">
    <div class="head row row-center">
        <div class="scroll_x row row-start" ref="search">
            <div v-for="item in checkedTags" :key="item.id" class="search-item row row-center">
                <p>{{item.text}}</p>
                <div class="close_btn" @click="checkTag(item)"></div>
            </div>
        </div>
        <div class="search-p" @click="search">搜索</div>
    </div>
    
    <div class="list-content row row-start">
        <div class="brand_tag-list col col-start">
            <div v-for="item in brands" :key="item.id" class="brand_tag row row-center" :class="{'brand_tag_active': currentId===item.id}" @click="switchBrand(item.id)">{{item.text}}</div>
        </div>
        <div class="tag-list">
            <template v-if="isTrilaminar">
                <div v-for="item in tagList" :key="item.id" class="sub-brand">
                    <div class="sub_brand-head row row-center">
                        <div class="line_black"></div>
                        <div class="sub_brand-title">{{item.text}}</div>
                        <div class="line_black"></div>
                    </div>
                    <div class="tags-container row-mul">
                        <v-tag v-for="tag in item.children" :key="tag.id" :info="tag" :checkedTags="checkedTags" @check="checkTag"></v-tag>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="tags-container row-mul">
                    <v-tag v-for="tag in tagList" :key="tag.id" :info="tag" :checkedTags="checkedTags" @check="checkTag"></v-tag>
                </div>
            </template>
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
            checkedTags: []
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
        search () {
            this.$router.push({
                name: 'resultPds',
                query: {category: this.getTagIds()}
            })
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
        this.getTagList()
            .then((res) => {
                if (res.data && res.data.length) {
                    this.brands = res.data[0].children
                    if (this.brands.length) {
                        this.switchBrand(this.brands[0].id)
                    }
                } else throw new Error('网络错误')
            })
            .catch((err) => {
                console.log(err)
            })
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
        height: .45rem;
        border-bottom: solid 1px #D6D6DB;
        font-size: 12px;
    }
    .scroll_x {
        flex: 1;
        height: 100%;
        overflow-x: scroll;
        transition: scrollLeft .5s ease-in .1s;
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
        font-size: 16px;
        color: #010101;
        margin: 0 .16rem;
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

</style>
