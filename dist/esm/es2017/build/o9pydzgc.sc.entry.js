import { h } from '../nb-component.core.js';

class PullToRefresh {
    constructor() {
        this.refreshHTML = '<div class="onrefresh">刷新内容</div>';
        this.moreHTML = '<div class="onmore">加载更多</div>';
        this.loadingHTML = '<div class="loading">loading</div>';
        this.dampHeight = 30;
        this.dampingLen = 0;
        this.loading = false;
    }
    done() {
        this.$content.style.transform = `translateY(0px)`;
        this.dampingLen = 0;
        this.loading = false;
    }
    get pullLength() {
        return this.movePageY - this.startPageY;
    }
    getScrollTop() {
        return this.$wrapper.scrollTop;
    }
    getWrapperScrollTop() {
        return this.$wrapper.scrollHeight - this.$wrapper.clientHeight;
    }
    recordStartDampLen() {
        if (this.startDampLen)
            return;
        if ((this.getScrollTop() === 0 && this.pullLength > 0) ||
            (this.getScrollTop() === this.getWrapperScrollTop() &&
                this.pullLength < 0)) {
            this.startDampLen = this.pullLength;
        }
    }
    handleTouchStart(ev) {
        this.startPageY = ev.touches[0].pageY;
    }
    handleTouchMove(ev) {
        this.movePageY = ev.touches[0].pageY;
        if (this.loading)
            return;
        this.recordStartDampLen();
        if (this.startDampLen > 0 && this.disable !== 'refresh') {
            if (this.pullLength > this.startDampLen) {
                this.dampingLen = this.pullLength - this.startDampLen;
                if (this.dampingLen > this.dampHeight)
                    this.dampingLen = this.dampHeight;
            }
            else if (this.pullLength + 3 < this.startDampLen) {
                this.dampingLen = 0;
            }
        }
        if (this.startDampLen < 0 && this.disable !== 'more') {
            if (this.pullLength < this.startDampLen) {
                this.dampingLen = this.pullLength + this.startDampLen;
                if (this.dampingLen < -this.dampHeight)
                    this.dampingLen = -this.dampHeight;
            }
            else if (this.pullLength - 3 > this.startDampLen) {
                this.dampingLen = 0;
            }
        }
        if (this.startDampLen !== 0) {
            this.$content.style.transition = 'transform 0.3s';
            this.$content.style.transform = `translateY(${this.dampingLen}px)`;
        }
    }
    handleTouchEnd() {
        this.startDampLen = null;
        if (Math.abs(this.dampingLen) > 3) {
            this.loading = true;
        }
        this.dampingLen > 3 && this.refresh.emit();
        this.dampingLen < -3 && this.more.emit();
    }
    bindTouchScroll(bind = true) {
        if (bind) {
            try {
                this.$wrapper = this.el.querySelector(this.wrapperSelector);
                this.$content = this.el.querySelector(this.contentSelector);
                this.$wrapper.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
                this.$wrapper.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
                this.$wrapper.addEventListener('touchend', this.handleTouchEnd.bind(this), false);
            }
            catch (e) {
                throw new TypeError('"wrapperSelector" or "contentSelector" props maybe not a valid scroll dom selector.');
            }
        }
    }
    componentDidLoad() {
        this.bindTouchScroll();
    }
    render() {
        return (h("div", { class: "pull-to-do" },
            h("div", { class: `${this.dampingLen > this.dampHeight * 0.8 ? 'show' : 'hide'}` },
                h("div", { innerHTML: !this.loading ? this.refreshHTML : this.loadingHTML })),
            h("slot", null),
            h("div", { class: `bottom ${this.dampingLen < -this.dampHeight * 0.8 ? 'show' : 'hide'}` },
                h("div", { innerHTML: !this.loading ? this.moreHTML : this.loadingHTML }))));
    }
    static get is() { return "nb-pull-to-do"; }
    static get properties() { return {
        "contentSelector": {
            "type": String,
            "attr": "content-selector"
        },
        "dampHeight": {
            "type": Number,
            "attr": "damp-height"
        },
        "dampingLen": {
            "state": true
        },
        "disable": {
            "type": String,
            "attr": "disable"
        },
        "done": {
            "method": true
        },
        "el": {
            "elementRef": true
        },
        "loading": {
            "state": true
        },
        "loadingHTML": {
            "type": String,
            "attr": "loading-h-t-m-l"
        },
        "moreHTML": {
            "type": String,
            "attr": "more-h-t-m-l"
        },
        "refreshHTML": {
            "type": String,
            "attr": "refresh-h-t-m-l"
        },
        "wrapperSelector": {
            "type": String,
            "attr": "wrapper-selector"
        }
    }; }
    static get events() { return [{
            "name": "refresh",
            "method": "refresh",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "more",
            "method": "more",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ".pull-to-do{position:relative}.pull-to-do .hide,.pull-to-do .show{position:absolute;width:100%;top:0;opacity:1;z-index:2;-webkit-transition:opacity .3s;transition:opacity .3s}.pull-to-do .hide{opacity:0;z-index:-1}.pull-to-do .bottom{top:auto;bottom:0}.loading,.onmore,.onrefresh{text-align:center;color:#ccc;background:#f5f5f5;height:.8rem;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}"; }
}

export { PullToRefresh as NbPullToDo };
