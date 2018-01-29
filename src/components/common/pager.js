class Pager {
    constructor (fn) {
        this.page = 0
        this.size = 20
        this.fn = fn
    }
    getNextPage (...arg) {
        return this.fn(this.page, this.size, ...arg)
    }
    addPage () {
        this.page ++
    }
    clean () {
        this.page = 0
        this.size = 3
    }
}

export default Pager
