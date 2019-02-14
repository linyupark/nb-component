import {
  Component,
  State,
  Prop,
  Element,
  Event,
  EventEmitter,
  Watch
} from '@stencil/core';

/**
 * 固钉组件
 * @description 根据滑动来切换固定跟原始状态的组件
 */
@Component({
  tag: 'nb-affix',
  shadow: true
})
export class Affix {
  
  /**
   * 参照对象
   */
  target: HTMLElement;

  /**
   * 当固定状态发生变化对外发送事件
   */
  @Event() change: EventEmitter;

  /**
   * 观察固定状态变化
   * @param isFixed
   */
  @Watch('fixed') onCurrentPageChange(isFixed) {
    this.change.emit({
      isFixed
    });
  }

  /**
   * 组件自身
   */
  @Element() el: HTMLElement;

  /**
   * 距离偏移量后触发（正数举例上沿，负数下沿）
   */
  @Prop() offset: number;

  /**
   * 计算举例的参照dom
   */
  @Prop() relativeSelector?: string;

  /**
   * 是否处于固定状态
   */
  @State() fixed: boolean;

  /**
   * 根据设置来切换固定状态
   */
  handleFix() {
    const rectTop = this.el.getBoundingClientRect().top;
     const parentTop = this.target.getBoundingClientRect().top;
    if (this.offset >= 0) {
      // 已经固定住的时候判断滚动位置能不能释放固定
      if (this.fixed) {
        this.fixed = !(this.target.scrollTop < this.offset);
      }
      else {
        this.fixed = (rectTop - parentTop) <= this.offset;
      }
    }
  }
  
  /**
   * 计算出固定时候的高度
   */
  get fixedTop() {
    if (!this.target) return this.offset;
    return this.target.getBoundingClientRect().top + this.offset;
  }

  componentDidLoad() {
    try {
      setTimeout(() => {
        this.target = this.relativeSelector ? document.querySelector(this.relativeSelector) : document.body;
        this.handleFix();
        this.target.addEventListener(
          'scroll',
          this.handleFix.bind(this),
          false
        );
      }, 10);
    } catch (e) {
      throw new TypeError(e);
    }
  }

  componentDidUnload() {
    this.target && this.target.removeEventListener(
      'scroll',
      this.handleFix.bind(this),
      false
    );
  }

  render() {
    return (
      <div
        style={{
          position: this.fixed ? `fixed` : 'relative',
          top: this.fixed ? `${this.fixedTop}px` : 'auto'
        }}
      >
        <slot />
      </div>
    );
  }
}
