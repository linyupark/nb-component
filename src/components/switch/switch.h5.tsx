import { Component, Prop, Event, EventEmitter } from '@stencil/core';

/**
 * 滑动开关
 */
@Component({
  tag: 'nb-switch',
  styleUrl: 'switch.h5.styl',
  shadow: true
})
export class Switch {
  /**
   * 是否默认选中
   */
  @Prop({ mutable: true }) checked: boolean = false;

  /**
   * 是否不可修改
   */
  @Prop() disabled: boolean = false;

  /**
   * 开关背景颜色
   */
  @Prop() color: string = '#4C98FC';

  /**
   * 宽度
   */
  @Prop() w: number = 80;

  /**
   * 高度
   */
  @Prop() h: number = 48;

  /**
   * 当状态发生改变
   */
  @Event() change: EventEmitter;

  /**
   * 点击处理
   */
  protected onChange = () => {
    // 禁用无效
    if (this.disabled) return;
    this.checked = !this.checked;
    this.change.emit({ checked: this.checked });
  };
  
  /**
   * 计算出对应的rem 宽高
   */
  get remStyles() {
    return {
      container: {
        width: `${this.w / 75}rem`,
        height: `${this.h / 75}rem`,
        borderRadius: `${this.h / 2 / 75}rem`
      },
      ball: {
        width: `${(this.h - 8) / 75}rem`,
        height: `${(this.h - 8) / 75}rem`
      }
    }
  }

  render() {
    return (
      <div
        onClick={this.onChange}
        class={`switch ${this.checked ? 'checked' : ''} ${
          this.disabled ? 'disabled' : ''
        }`}
        style={{
          ...this.remStyles.container,
          backgroundColor: this.checked ? this.color : '#C7C7C7'
        }}
      >
        <div style={{
          ...this.remStyles.ball,
          transform: this.checked ? `translateX(${(this.w-this.h) / 75}rem)` : 'none'
        }} class="roundball" />
      </div>
    );
  }
}
