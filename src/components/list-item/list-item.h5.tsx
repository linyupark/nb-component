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
  @Prop() height?: number = 88;

  /**
   * 设置横线左右间距
   */
  @Prop() sideSpace?: number = 30;

  /**
   * 像素转为rem
   */
  px2rem(px) {
    return px == 0 ? 'auto' : (px / 75);
  }

  /**
   * 是否要某一边缩进
   * @param side 方向
   */
  isShort(side) {
    return this.short === side || this.short ===  'both';
  }

  render() {
    return (
      <div class={`item`} style={{
        paddingLeft: `${this.isShort('left') === false ? `${this.px2rem(this.sideSpace)}rem` : '0'}`,
        paddingRight: `${this.isShort('right') === false ? `${this.px2rem(this.sideSpace)}rem` : '0'}`,
        height: `${this.px2rem(this.height)}rem`,
        borderBottom: `${this.border > 0 ? `${this.border}px` : '0'} solid ${this.color}`,
        marginLeft: `${this.isShort('left') ? this.px2rem(this.sideSpace) + 'rem' : '0'}`,
        marginRight: `${this.isShort('right') ? this.px2rem(this.sideSpace) + 'rem' : '0'}`,
      }}>
        <slot />
      </div>
    );
  }
}