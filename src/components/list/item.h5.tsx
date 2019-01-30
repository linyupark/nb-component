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

  @Prop() color: string = '#f5f5f5';

  render() {
    return (
      <div class="item" style={{
        borderBottom: `${this.border > 0 ? `${this.border}px` : '0'} solid #f5f5f5`
      }}>
        <slot />
      </div>
    );
  }
}