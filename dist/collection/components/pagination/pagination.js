import Icon from './svg-icon';
/**
 * 分页组件
 */
export class Pagination {
    constructor() {
        /**
         * 当前页面
         */
        this.current = 1;
        /**
         * 每页条数
         */
        this.pagesize = 10;
        /**
         * 总数据条数
         */
        this.total = 0;
        /**
         * 当只有一页的时候自动隐藏
         */
        this.autoHide = true;
        /**
         * 当分页太多时候限制前后显示页数
         */
        this.limitPage = 4;
    }
    /**
     * 观察页数变化
     * @param to 前往页面
     * @param from 来自页面
     */
    onCurrentPageChange(to, from) {
        this.change.emit({
            to, from
        });
    }
    /**
     * 计算出一共有几页
     */
    get totalPages() {
        return Math.ceil(this.total / this.pagesize);
    }
    /**
     * 是否上一页可用
     */
    get hasPrev() {
        return this.current != 1;
    }
    /**
     * 是否下一页可用
     */
    get hasNext() {
        return this.totalPages > this.current;
    }
    /**
     * 判断是否可以显示分页
     */
    get showPagination() {
        return this.totalPages > 1 || !this.autoHide;
    }
    /**
     * 数字页数列表（实际中间展示的页码）
     */
    get numberPageList() {
        let list = [];
        // 左侧页起始未知
        const leftOffset = this.current - this.limitPage / 2;
        const leftStartAt = leftOffset < 1 ? 1 : leftOffset;
        // 右侧
        const rightOffset = this.current + this.limitPage / 2;
        const rightEndAt = rightOffset > this.totalPages ? this.totalPages : rightOffset;
        for (let n = leftStartAt; n <= rightEndAt; n++) {
            list.push(n);
        }
        // 添加第一页
        const prefixSpan = list[0] - 1;
        if (prefixSpan >= 2) {
            list.unshift('<<');
        }
        if (prefixSpan >= 1) {
            list.unshift(1);
        }
        // 添加末页
        const suffixSpan = this.totalPages - list.slice(-1)[0];
        if (suffixSpan >= 2) {
            list.push('>>');
        }
        if (suffixSpan >= 1) {
            list.push(this.totalPages);
        }
        return list;
    }
    render() {
        return [
            this.showPagination && h("div", { class: "pagination" },
                h("ul", null,
                    h("li", { title: "\u4E0A\u4E00\u9875", class: this.hasPrev ? '' : 'disabled', onClick: () => this.hasPrev && this.current-- },
                        h("a", null,
                            h("i", null, Icon.prev))),
                    this.numberPageList.map(n => {
                        if (n === '<<')
                            return (h("li", { onClick: () => this.current -= this.limitPage / 2 },
                                h("span", { class: "ellipsis" }, "\u2022\u2022\u2022")));
                        else if (n === '>>')
                            return (h("li", { onClick: () => this.current += this.limitPage / 2 },
                                h("span", { class: "ellipsis" }, "\u2022\u2022\u2022")));
                        else
                            return (h("li", { title: `第${n}页`, onClick: () => (this.current = n) },
                                h("a", { class: this.current == n ? 'active' : '' }, n)));
                    }),
                    h("li", { title: "\u4E0B\u4E00\u9875", class: this.hasNext ? '' : 'disabled', onClick: () => this.hasNext && this.current++ },
                        h("a", null,
                            h("i", null, Icon.next)))))
        ];
    }
    static get is() { return "nb-pagination"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "autoHide": {
            "type": Boolean,
            "attr": "auto-hide"
        },
        "current": {
            "type": Number,
            "attr": "current",
            "mutable": true,
            "watchCallbacks": ["onCurrentPageChange"]
        },
        "limitPage": {
            "type": Number,
            "attr": "limit-page"
        },
        "pagesize": {
            "type": Number,
            "attr": "pagesize"
        },
        "total": {
            "type": Number,
            "attr": "total"
        }
    }; }
    static get events() { return [{
            "name": "change",
            "method": "change",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:nb-pagination:**/"; }
}
