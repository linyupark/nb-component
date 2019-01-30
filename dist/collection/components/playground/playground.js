import Examples from './examples';
import { search2obj } from '@utils/string';
export class Playground {
    constructor() {
        /**
         * 开启h5模式
         */
        this.h5 = false;
        /**
         * 需要演示的组件列表
         */
        this.demoList = [
            {
                key: 'actionsheet',
                text: '动作面板.H5',
                mobile: true,
                tag: 'nb-actionsheet'
            },
            {
                key: 'pagination',
                text: '分页',
                mobile: false,
                tag: 'nb-pagination'
            },
            {
                key: 'affix',
                text: '固钉',
                mobile: false,
                tag: 'nb-affix'
            },
            {
                key: 'pull-to-do',
                text: '上下拉操作.H5',
                mobile: true,
                tag: 'nb-pull-to-do'
            },
            {
                key: 'badge',
                text: '徽标数.H5',
                mobile: true,
                tag: 'nb-badge'
            },
            {
                key: 'list',
                text: '列表.H5',
                mobile: true,
                tag: 'nb-list'
            }
        ];
        /**
         * 当前展示的demo
         */
        this.demo = this.demoList[0];
    }
    parseHash() {
        const tag = location.hash.match(/#([^\?]+)/);
        // 获得渲染组件
        if (tag) {
            this.tag = tag[1];
            // 设定当前demo
            this.demo = this.demoList.filter(demo => {
                return demo.tag === this.tag;
            })[0];
            // console.log('渲染', this.tag, this.demo);
        }
        else {
            this.tag = '';
        }
        const search = tag ? search2obj(location.hash.split('?')[1]) : {};
        // h5 模式
        this.h5 = search.display === 'mobile';
        if (this.h5 && this.tag !== '') {
            this.el.ownerDocument.documentElement.style.fontSize = '37.5px';
        }
    }
    /**
     * 从hash来得到需要展示的组件
     */
    componentWillLoad() {
        this.parseHash();
        window.onhashchange = this.parseHash.bind(this);
    }
    render() {
        return this.tag === '' ? (h("div", { class: "site" },
            h("h2", null,
                "NB-\u725B\u90A6\u901A\u7528\u7EC4\u4EF6\u5E93",
                h("small", { class: "intro" },
                    "Powered by",
                    ' ',
                    h("a", { href: "https://stenciljs.com/docs/introduction", target: "_blank" }, "Stencil"),
                    "\u00B7",
                    h("a", { href: "https://stenciljs.com/docs/overview", target: "_blank" }, "\u8DE8\u5E73\u53F0\u4F7F\u7528\u65B9\u6CD5"),
                    "\u00B7",
                    h("a", { href: "https://github.com/linyupark/nb-component", target: "_blank" }, "github"))),
            h("ul", null, this.demoList.map(demo => (h("li", { key: demo.key, class: { active: demo.key === this.demo.key } },
                h("a", { href: "javascript:;", onClick: () => {
                        this.demo = demo;
                    } },
                    demo.text,
                    h("br", null),
                    demo.key))))),
            h("div", { class: "content" },
                h("iframe", { scrolling: "no", class: this.demo.mobile ? 'mobile' : '', src: `#${this.demo.tag}?display=${this.demo.mobile ? 'mobile' : 'pc'}` })))) : (h("div", { class: this.demo.mobile ? 'example mobile' : 'example' }, Examples[this.tag]));
    }
    static get is() { return "nb-playground"; }
    static get properties() { return {
        "demo": {
            "state": true
        },
        "el": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:nb-playground:**/"; }
}
