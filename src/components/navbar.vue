<template>
<div class="nav row row-around">
    <router-link :to="{name: 'home'}" class="col col-end nav-item nav-index" active-class="nav-index-active" exact>
        首页
    </router-link>

    <router-link :to="{name: 'car'}" class="col col-center nav-item nav-car" active-class="nav-car-active" exact>
        <div class="car-icon" :class="{'car-icon-active': chosed==='car'}"></div>
        <div>购物车</div>
    </router-link>

    <router-link :to="{name: 'me'}" class="col col-end nav-item nav-me" active-class="nav-me-active" exact>
        我的
    </router-link>
</div>
</template>

<script>
export default {
    name: 'navbar',
    data () {
        return {
            chosed: 'home'
        }
    },
    methods: {
        switchTo (tabName) {
            this.chosed = tabName
        }
    },
    computed: {
        index () {
            return {
                active: this.chosed === 'home'
            }
        },
        car () {
            return {
                active: this.chosed === 'car'
            }
        },
        me () {
            return {
                active: this.chosed === 'me'
            }
        }

    },
    created () {

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .nav {
        box-sizing: border-box;
        width: 100%;
        height: .5rem;
        box-shadow: 0 1px 7px RGBA(98,98,98,.25);
        background: #F7F7FA;
    }
    .nav-item {
        width: .6rem;
        height: .49rem;
        font-size: 10px;
        text-align: center;
    }
    .nav-index {
        background: center .05rem/.25rem no-repeat url('../assets/index.png');
        color: #888888;
    }
    .nav-index-active {
        background: center .05rem/.25rem no-repeat url('../assets/index_active.png');
        color: #000000;
    }
    .nav-car {
        position: relative;
        z-index: 10;
        bottom: .18rem;
        height: .6rem;
        border-radius: .3rem;
        box-shadow: 0 3px 7px RGBA(0,0,0,.15);
        color: #888888;
        background: #F7F7FA;
    }
    .nav-car .car-icon {
        width: .29rem;
        height: .29rem;
        /*margin-bottom: .02rem;*/
        background: center/contain no-repeat url('../assets/cart.png');
    }
    .nav-car-active {
        color: #000000;
    }
    .nav-car-active .car-icon {
        background: center/contain no-repeat url('../assets/cart_active.png');
    }
    .nav-me {
        background: center .05rem/.25rem no-repeat url('../assets/me.png');
        color: #888888;
    }
    .nav-me-active {
        background: center .05rem/.25rem no-repeat url('../assets/me_active.png');
        color: #000000;
    }
</style>
