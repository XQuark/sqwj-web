<template>
    <keep-alive :include="include">
        <router-view></router-view>
    </keep-alive>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            include: ['home', 'me']
        }
    },
    created () {

    }
}
</script>

<style>
    html {
        font-family: PingFang-SC-Light,'Avenir', Helvetica, Arial, sans-serif; 
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td, hr, button, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
        margin: 0;
        padding: 0;
    }
    body {
        -webkit-overflow-scrolling: touch;
    }
    input {
        border: 0;
        outline: none;
    }
    a {
        display: block;
        -webkit-tap-highlight-color: transparent;
        text-decoration: none;
    }
</style>
