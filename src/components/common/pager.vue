<script>
export default {
    name: 'pager',
    data () {
        return {
            pager: {
                page: 0,
                size: 3,
                list: [],
                isMore: true
            }
        }
    },
    methods: {
        updatePager (fn) {
            if (this.pager.isMore) {
                return fn(this.pager.page, this.pager.size)
                    .then((data) => {
                        this.pager.isMore = !(data.length < this.pager.size)
                        this.pager.list = this.pager.list.concat(data)
                        this.pager.page ++
                        return this.pager.list
                    })
            } else return Promise.reject('没有更多数据')
        },
        setPagerSize (n) {
            this.pager.size = 10
        }
    },
    computed: {

    },
    created () {

    }
}
</script>
