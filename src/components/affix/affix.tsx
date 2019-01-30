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
  @Prop() targetDom: () => HTMLElement = () => document.body;

  /**
   * 是否处于固定状态
   */
  @State() fixed: boolean;

  /**
   * 根据设置来切换固定状态
   */
  handleFix() {
    if (this.offset >= 0) {
      const rectTop = this.el.getBoundingClientRect().top;
      this.fixed = rectTop <= this.offset;
    }
  }

  componentDidLoad() {
    try {
      this.handleFix();
      setTimeout(() => {
        this.targetDom().addEventListener(
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
    this.targetDom().removeEventListener(
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
          top: this.fixed ? `${this.offset}px` : 'auto'
        }}
      >
        <slot />
      </div>
    );
  }
}
