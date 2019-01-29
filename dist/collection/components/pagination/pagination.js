import Icon from './svg-icon';
export class Pagination {
    constructor() {
        this.current = 1;
        this.pagesize = 10;
        this.total = 0;
        this.autoHide = true;
        this.limitPage = 4;
    }
    onCurrentPageChange(to, from) {
        this.change.emit({
            to, from
        });
    }
    get totalPages() {
        return Math.ceil(this.total / this.pagesize);
    }
    get hasPrev() {
        return this.current != 1;
    }
    get hasNext() {
        return this.totalPages > this.current;
    }
    get showPagination() {
        return this.totalPages > 1 || !this.autoHide;
    }
    get numberPageList() {
        let list = [];
        const leftOffset = this.current - this.limitPage / 2;
        const leftStartAt = leftOffset < 1 ? 1 : leftOffset;
        const rightOffset = this.current + this.limitPage / 2;
        const rightEndAt = rightOffset > this.totalPages ? this.totalPages : rightOffset;
        for (let n = leftStartAt; n <= rightEndAt; n++) {
            list.push(n);
        }
        const prefixSpan = list[0] - 1;
        if (prefixSpan >= 2) {
            list.unshift('<<');
        }
        if (prefixSpan >= 1) {
            list.unshift(1);
        }
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
