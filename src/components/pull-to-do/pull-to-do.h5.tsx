import {
  Component,
  Prop,
  State,
  Element,
  Event,
  EventEmitter,
  Method
} from '@stencil/core';

let _scrollTopPosition = 0;

/**
 * 下滑刷新
 */
@Component({
  tag: 'nb-pull-to-do',
  styleUrl: 'pull-to-do.h5.styl',
  shadow: true,
})
export class PullToRefresh {
  /**
   * 当下拉成立触发事件
   */
  @Event() refresh: EventEmitter;

  /**
   * 当上拉触发加载更多
   */
  @Event() more: EventEmitter;

  /**
   * 组件自身
   */
  @Element() el: HTMLElement;

  /**
   * 禁用哪项功能 refresh: 下拉刷新 | more: 加载更多
   */
  @Prop() disable?: 'refresh' | 'more';

  /**
   * 实际滚动显示区块选择器
   */
  @Prop() wrapperSelector: string;

  /**
   * 展示内容选择器
   */
  @Prop() contentSelector: string;

  /**
   * 下拉展示的提示
   */
  @Prop() refreshHTML: string = '<div class="onrefresh">刷新内容</div>';

  /**
   * 上拉加载更多
   */
  @Prop() moreHTML: string = '<div class="onmore">加载更多</div>';

  /**
   * 加载中的内容
   */
  @Prop() loadingHTML: string = '<div class="loading">loading</div>';

  /**
   * 拉动限制高度
   */
  @Prop() dampHeight: number = 30;

  /**
   * 当浏览器是返回状态是否尝试回到上一次的位置
   */
  @Prop() positionSave: boolean = true;

  /**
   * 已经拉动的限制高度(正数为顶部，负数为底部)
   */
  @State() dampingLen: number = 0;

  /**
   * 加载状态
   */
  @State() loading: boolean = false;

  /**
   * 加载完毕
   */
  @Method() done() {
    this.$content.style.transform = `translateY(0px)`;
    this.dampingLen = 0;
    this.loading = false;
  }

  /**
   * 实际滚动显示区块
   */
  $wrapper: HTMLElement;

  /**
   * 展示内容
   */
  $content: HTMLElement;

  /**
   * touch 起点
   */
  startPageY: number;

  /**
   * touch 当前移动位置
   */
  movePageY: number;

  /**
   * 开始阻尼位置记录
   */
  startDampLen?: number;

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
  protected getScrollTop() {
    return this.$wrapper.scrollTop;
  }

  /**
   * 滚动区域最多能到达的scrollTop值，判断是否到底部
   */
  protected getWrapperScrollTop() {
    return this.$wrapper.scrollHeight - this.$wrapper.clientHeight;
  }

  /**
   * 记录阻尼开始位置
   */
  protected recordStartDampLen() {
    if (this.startDampLen) return;
    if (
      (this.getScrollTop() === 0 && this.pullLength > 0) ||
      (this.getScrollTop() === this.getWrapperScrollTop() &&
        this.pullLength < 0)
    ) {
      this.startDampLen = this.pullLength;
      // console.log('startDampLen', this.startDampLen);
    }
  }

  /**
   * 触摸开始操作
   * @param ev
   */
  protected handleTouchStart(ev) {
    this.startPageY = ev.touches[0].pageY;
  }

  /**
   * 触摸滑动操作
   * @param ev
   */
  protected handleTouchMove(ev) {
    this.movePageY = ev.touches[0].pageY;

    // 还在loading
    if (this.loading) return;

    this.recordStartDampLen();

    // 在有阻尼开始位置记录的时候继续拉动
    if (this.startDampLen > 0 && this.disable !== 'refresh') {
      if (this.pullLength > this.startDampLen) {
        this.dampingLen = this.pullLength - this.startDampLen;
        if (this.dampingLen > this.dampHeight)
          this.dampingLen = this.dampHeight;
      } else if (this.pullLength + 3 < this.startDampLen) {
        this.dampingLen = 0;
      }
    }

    if (this.startDampLen < 0 && this.disable !== 'more') {
      if (this.pullLength < this.startDampLen) {
        this.dampingLen = this.pullLength + this.startDampLen;
        if (this.dampingLen < -this.dampHeight)
          this.dampingLen = -this.dampHeight;
      } else if (this.pullLength - 3 > this.startDampLen) {
        this.dampingLen = 0;
      }
    }

    if (this.startDampLen !== 0) {
      this.$content.style.transition = 'transform 0.3s';
      this.$content.style.transform = `translateY(${this.dampingLen}px)`;
    }
  }

  protected handleTouchEnd() {
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
  protected bindTouchScroll(bind: boolean = true) {
    // 绑定
    if (bind) {
      try {
        this.$wrapper = this.el.querySelector(this.wrapperSelector);
        this.$content = this.el.querySelector(this.contentSelector);
        this.$wrapper.addEventListener(
          'touchstart',
          this.handleTouchStart.bind(this),
          false
        );
        this.$wrapper.addEventListener(
          'touchmove',
          this.handleTouchMove.bind(this),
          false
        );
        this.$wrapper.addEventListener(
          'touchend',
          this.handleTouchEnd.bind(this),
          false
        );
      } catch (e) {
        throw new TypeError(
          '"wrapperSelector" or "contentSelector" props maybe not a valid scroll dom selector.'
        );
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
    return (
      <div class="pull-to-do">
        <div
          class={`${this.dampingLen > this.dampHeight * 0.8 ? 'show' : 'hide'}`}
        >
          <div
            innerHTML={!this.loading ? this.refreshHTML : this.loadingHTML}
          />
        </div>
        <slot />
        <div
          class={`bottom ${
            this.dampingLen < -this.dampHeight * 0.8 ? 'show' : 'hide'
          }`}
        >
          <div innerHTML={!this.loading ? this.moreHTML : this.loadingHTML} />
        </div>
      </div>
    );
  }
}
