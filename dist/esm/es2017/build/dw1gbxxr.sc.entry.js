import { h } from '../nb-component.core.js';

var Icon = {
    prev: (h("svg", { viewBox: "64 64 896 896", "data-icon": "left", width: "1em", height: "1em", fill: "currentColor" },
        h("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" }))),
    next: (h("svg", { viewBox: "64 64 896 896", "data-icon": "right", width: "1em", height: "1em", fill: "currentColor" },
        h("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" })))
};

class Pagination {
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
    static get style() { return ".pagination ul{font-size:14px;line-height:1.5;margin:0;padding:0;list-style:none}.pagination ul li{cursor:pointer;min-width:32px;height:32px;line-height:32px;display:inline-block;outline:none;position:relative;margin-right:8px}.pagination ul li.disabled{cursor:not-allowed}.pagination ul li.disabled,.pagination ul li.disabled a:hover{border-color:#d9d9d9;color:rgba(0,0,0,.25)}.pagination ul li .ellipsis{position:absolute;display:block;letter-spacing:2px;color:rgba(0,0,0,.25);text-align:center;top:12px;margin:auto}.pagination ul li a{border:1px solid #d9d9d9;background-color:#fff;border-radius:4px;display:block;-webkit-transition:all .3s;transition:all .3s;font-size:12px;height:100%;text-align:center}.pagination ul li a.active,.pagination ul li a:hover{border-color:#1890ff;color:#1890ff}"; }
}

export { Pagination as NbPagination };
