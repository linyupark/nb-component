import { Component, Prop } from '@stencil/core';


/**
 * 区块项目
 */
@Component({
  tag: 'nb-list-item',
  styleUrl: 'list-item.h5.styl',
  shadow: true,
})
export class ListItem {

  /**
   * 下边框, 0则不显示
   */
  @Prop() border: number = 1;

  /**
   * 线条颜色
   */
  @Prop() color: string = '#f5f5f5';

  /**
   * 短线条方向
   */
  @Prop() short?: 'left' | 'right' | 'both';

  render() {
    return (
      <div class={`item ${this.short || ''}`} style={{
        borderBottom: `${this.border > 0 ? `${this.border}px` : '0'} solid ${this.color}`
      }}>
        <slot />
      </div>
    );
  }
}