import {
  Component,
  Prop,
  State,
  Element,
  Event,
  EventEmitter,
  Method
} from '@stencil/core';

let _positionSaver = {};

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
  @Prop() disable ? : 'refresh' | 'more';

  /**
   * 没有更多数据了
   */
  @Prop() noMore: boolean = false;

  /**
   * 实际滚动显示区块选择器
   */
  @Prop() wrapperSelector: string;

  /**
   * 展示内容选择器
   */
  @Prop() contentSelector: string;

  /**
   * 拉动限制高度
   */
  @Prop() dampHeight: number = 30;

  /**
   * 当浏览器是返回状态是否尝试回到上一次的位置 ID
   */
  @Prop() positionSaveId?: string = null;

  /**
   * 已经拉动的限制高度(正数为顶部，负数为底部)
   */
  @State() dampingLen: number = 0;

  /**
   * 加载状态
   */
  @Prop({ mutable: true }) loading: boolean = false;

  /**
   * 加载完毕
   */
  @Method() done() {
    this.$content.style.transform = `translateY(0px)`;
    this.dampingLen = 0;
    this.loading = false;
  }

  /**
   * 获取上次位置
   */
  @Method() restoreLastPosition() {
    if (this.positionSaveId && _positionSaver[this.positionSaveId]) {
      this.$wrapper.scrollTop = _positionSaver[this.positionSaveId];
    }
    return _positionSaver[this.positionSaveId] || 0;
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
  startDampLen ? : number;

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
    // console.log('startDampLen', this.getScrollTop(), this.pullLength, this.getWrapperScrollTop());
    if (
      (this.getScrollTop() === 0 && this.pullLength > 0) ||
      (Math.abs(this.getScrollTop() - this.getWrapperScrollTop()) < 2 &&
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
  protected handleTouchStart = (ev) => {
    this.startPageY = ev.touches[0].pageY;
  }

  /**
   * 触摸滑动操作
   * @param ev
   */
  protected handleTouchMove = (ev) => {
    this.movePageY = ev.touches[0].pageY;

    // 临时禁用
    if (this.noMore) return;

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
    console.log('more', this.getScrollTop(), this.getWrapperScrollTop(), this.startDampLen, this.pullLength, this.startDampLen);
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
      this.$content.style.webkitTransition = 'transform 0.3s';
      this.$content.style.webkitTransform = `translateY(${this.dampingLen}px)`;
    }
  }

  protected handleTouchEnd = () => {
    this.startDampLen = null;
    if (this.noMore) {
      return;
    }
    console.log(this.dampingLen);
    if (Math.abs(this.dampingLen) > 3) {
      // 进入 loading 状态
      this.loading = true;
    }
    this.dampingLen > 3 && this.disable !== 'refresh' && this.refresh.emit();
    this.dampingLen < -3 && this.disable !== 'more' && this.more.emit();
    // 记录当前位置
    if (this.positionSaveId) {
      _positionSaver[this.positionSaveId] = this.getScrollTop();
    }
  }

  /**
   * 对 touch动作监听绑定跟解绑
   * @param {Boolean} bind 绑定还是解绑？
   */
  protected bindTouchScroll(bind: boolean = true) {
    try {
      this.$wrapper = document.querySelector(this.wrapperSelector);
      this.$content = document.querySelector(this.contentSelector);
    } catch (e) {
      console.log(e);
      throw new TypeError(
        '"wrapperSelector" or "contentSelector" props maybe not a valid scroll dom selector.'
      );
    }
    // 不存在 wrapper 则不绑定
    if (!this.$wrapper) {
      return console.log('$wrapper undefined');
    }
    // 绑定
    if (bind) {
      this.$wrapper.addEventListener(
        'touchstart',
        this.handleTouchStart,
        false
      );
      this.$wrapper.addEventListener(
        'touchmove',
        this.handleTouchMove,
        false
      );
      this.$wrapper.addEventListener(
        'touchend',
        this.handleTouchEnd,
        false
      );
    }
    else {
      this.$wrapper.removeEventListener(
        'touchstart',
        this.handleTouchStart,
        false
      );
      this.$wrapper.removeEventListener(
        'touchmove',
        this.handleTouchMove,
        false
      );
      this.$wrapper.removeEventListener(
        'touchend',
        this.handleTouchEnd,
        false
      );
    }
  }

  componentDidLoad() {
    this.bindTouchScroll();
    if (this.positionSaveId && _positionSaver[this.positionSaveId]) {
      console.log('上次位置', _positionSaver[this.positionSaveId]);
      // setTimeout(() => {
      //   this.$wrapper.scrollTop = _positionSaver[this.positionSaveId];
      // }, 100);
    }
  }

  componentDidUnload() {
    // console.log('unbind pull-to-do touch event.', this.$wrapper);
    this.bindTouchScroll(false);
  }

  render() {
    return (
      <div class={`pull-to-do`}>
        <div
          class={`${(this.dampingLen > this.dampHeight * 0.8 && !this.noMore) ? 'show' : 'hide'}`}
        >
          <div class={this.loading ? 'show' : 'hide'}>
            <slot name="refresh-loading" />
          </div>
          <div class={this.loading ? 'hide' : 'show'}>
            <slot name="refresh" />
          </div>
        </div>
        <slot name="main" />
        <div class={`bottom ${this.noMore && !this.loading ? 'show' : 'hide'}`}>
          <slot name="no-more" />
        </div>
        <div class={`bottom ${this.loading ? 'show' : 'hide'}`}>
          <slot name="more-loading" />
        </div>
        <div class={`bottom ${!this.loading && !this.noMore ? 'show' : 'hide'}`}>
          <slot name="more" />
        </div>
      </div>
    );
  }
}
