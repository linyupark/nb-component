let _scrollTopPosition = 0;
/**
 * 下滑刷新
 */
export class PullToRefresh {
    constructor() {
        /**
         * 下拉展示的提示
         */
        this.refreshHTML = '<div class="onrefresh">刷新内容</div>';
        /**
         * 上拉加载更多
         */
        this.moreHTML = '<div class="onmore">加载更多</div>';
        /**
         * 加载中的内容
         */
        this.loadingHTML = '<div class="loading">loading</div>';
        /**
         * 拉动限制高度
         */
        this.dampHeight = 30;
        /**
         * 当浏览器是返回状态是否尝试回到上一次的位置
         */
        this.positionSave = true;
        /**
         * 已经拉动的限制高度(正数为顶部，负数为底部)
         */
        this.dampingLen = 0;
        /**
         * 加载状态
         */
        this.loading = false;
    }
    /**
     * 加载完毕
     */
    done() {
        this.$content.style.transform = `translateY(0px)`;
        this.dampingLen = 0;
        this.loading = false;
    }
    /**
     * 计算拉动距离
     */
    get pullLength() {
        return this.movePageY - this.startPageY;
    }
    /**
     * 获取当前滚动位置
     * @return {Number}
     */
    getScrollTop() {
        return this.$wrapper.scrollTop;
    }
    /**
     * 滚动区域最多能到达的scrollTop值，判断是否到底部
     */
    getWrapperScrollTop() {
        return this.$wrapper.scrollHeight - this.$wrapper.clientHeight;
    }
    /**
     * 记录阻尼开始位置
     */
    recordStartDampLen() {
        if (this.startDampLen)
            return;
        if ((this.getScrollTop() === 0 && this.pullLength > 0) ||
            (this.getScrollTop() === this.getWrapperScrollTop() &&
                this.pullLength < 0)) {
            this.startDampLen = this.pullLength;
            // console.log('startDampLen', this.startDampLen);
        }
    }
    /**
     * 触摸开始操作
     * @param ev
     */
    handleTouchStart(ev) {
        this.startPageY = ev.touches[0].pageY;
    }
    /**
     * 触摸滑动操作
     * @param ev
     */
    handleTouchMove(ev) {
        this.movePageY = ev.touches[0].pageY;
        // 还在loading
        if (this.loading)
            return;
        this.recordStartDampLen();
        // 在有阻尼开始位置记录的时候继续拉动
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
            // 进入 loading 状态
            this.loading = true;
        }
        this.dampingLen > 3 && this.refresh.emit();
        this.dampingLen < -3 && this.more.emit();
        // 记录当前位置
        if (this.positionSave) {
            _scrollTopPosition = this.getScrollTop();
        }
    }
    /**
     * 对 touch动作监听绑定跟解绑
     * @param {Boolean} bind 绑定还是解绑？
     */
    bindTouchScroll(bind = true) {
        // 绑定
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
        if (this.positionSave) {
            // console.log('回到位置', _scrollTopPosition);
            this.$wrapper.scrollTo(0, _scrollTopPosition);
        }
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
    static get encapsulation() { return "shadow"; }
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
        "positionSave": {
            "type": Boolean,
            "attr": "position-save"
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
    static get style() { return "/**style-placeholder:nb-pull-to-do:**/"; }
}
