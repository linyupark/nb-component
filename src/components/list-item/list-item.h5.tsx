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
  
  /**
   * 设置单元高度
   */
  @Prop() height?: 88 | 120;

  render() {
    return (
      <div class={`item ${this.short || ''} ${this.height ? 'h' + this.height : ''}`} style={{
        borderBottom: `${this.border > 0 ? `${this.border}px` : '0'} solid ${this.color}`
      }}>
        <slot />
      </div>
    );
  }
}