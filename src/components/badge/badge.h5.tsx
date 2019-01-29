import { Component, Prop } from '@stencil/core';

/**
 * 徽标数
 */
@Component({
  tag: 'nb-badge',
  styleUrl: 'badge.h5.styl'
})
export class Badge {
  /**
   * 展示数字，0为隐藏
   */
  @Prop() count: number;

  /**
   * count的封顶数值超出则显示 maxCount+
   */
  @Prop() maxCount: number = 99;

  /**
   * 不展示数字，显示点
   */
  @Prop() dot: boolean = false;

  /**
   * 当count为0的时候也显示
   */
  @Prop() showZero: boolean = false;

  /**
   * 徽标底色
   */
  @Prop() bgColor: string = '#FB5B4C';

  /**
   * 徽标 classList
   */
  get dotCountClassNames() {
    let classNames = [];
    // 无论count多少都显示
    if (this.showZero) classNames.push('visible');
    // 显示为 dot
    if (this.dot) classNames.push('dot');
    // 显示为数字
    if (!this.dot) classNames.push('count');
    // 数字为0不显示
    if (!this.showZero && this.count === 0) classNames.push('hidden');
    return classNames.join(' ');
  }

  /**
   * 实际展示的数字
   */
  get displayCount() {
    if (this.dot) return '';
    if (this.showZero || this.count <= this.maxCount) return this.count;
    if (this.count > this.maxCount) return `${this.maxCount}+`;
  }

  render() {
    return (
      <div class="badge">
        <i
          class={this.dotCountClassNames}
          style={{
            backgroundColor: this.bgColor
          }}
        >
          {this.displayCount}
        </i>
        <slot />
      </div>
    );
  }
}
