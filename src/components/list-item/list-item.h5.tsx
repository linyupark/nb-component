import { Component, Prop, State } from '@stencil/core';

/**
 * 区块项目
 */
@Component({
  tag: 'nb-list-item',
  styleUrl: 'list-item.h5.styl',
  shadow: true
})
export class ListItem {
  /**
   * 区块元素
   */
  itemEl: HTMLElement;

  /**
   * 滑动元素
   */
  slideEl: HTMLElement;

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
   * 是否启用横滑操作开关
   */
  @Prop() slide: boolean = false;

  /**
   * 滑动开关
   */
  @State() slideIn: boolean = false;

  /**
   * 像素转为rem
   */
  px2rem(px) {
    return px == 0 ? 'auto' : px / 75;
  }

  /**
   * 是否要某一边缩进
   * @param side 方向
   */
  isShort(side) {
    return this.short === side || this.short === 'both';
  }

  /**
   * touch X 起点
   */
  startPageX: number;

  /**
   * 滑动开始
   * @param ev 滑动事件
   */
  private onTouchStart(ev) {
    if (!this.slide) return;
    this.itemEl.style.transition = `none`;
    this.startPageX = ev.touches[0].pageX;
  }

  /**
   * touch X 移动长度
   */
  movePageX: number;

  /**
   * 滑动中
   * @param ev 滑动事件
   */
  private onTouchMove(ev) {
    if (!this.slide) return;
    const touchLength = this.startPageX - this.movePageX;
    this.movePageX = ev.touches[0].pageX;
    // 滑动范围不能超过slide自身宽度
    if (Math.abs(touchLength) < this.slideEl.clientWidth) {
      const moveOffset =
        (this.slideIn ? -this.slideEl.clientWidth : 0) - touchLength;
      if (touchLength > 0 && this.slideIn) return;
      if (touchLength < 0 && !this.slideIn) return;
      this.itemEl.style.transform = `translateX(${moveOffset}px)`;
    }
  }

  /**
   * 滑动结束
   */
  private onTouchEnd() {
    if (!this.slide) return;
    const offsetX = Number(this.itemEl.style.transform.match(/\((.+)px\)/)[1]);
    this.slideIn = offsetX < - (Number(this.slideEl.clientWidth) / 2);
    this.itemEl.style.transition = `transform 0.3s`;
    if (this.slideIn) {
      this.itemEl.style.transform = `translateX(${-this.slideEl.clientWidth}px)`;
    } else {
      this.itemEl.style.transform = `translateX(0)`;
    }
  }

  render() {
    return (
      <div class="item-wrapper">
        <div
          class={`item`}
          ref={ev => {
            this.itemEl = ev;
          }}
          style={{
            paddingLeft: `${
              this.isShort('left') === false
                ? `${this.px2rem(this.sideSpace)}rem`
                : '0'
            }`,
            paddingRight: `${
              this.isShort('right') === false
                ? `${this.px2rem(this.sideSpace)}rem`
                : '0'
            }`,
            height: `${this.px2rem(this.height)}rem`,
            borderBottom: `${this.border > 0 ? `${this.border}px` : '0'} solid ${
              this.color
            }`,
            marginLeft: `${
              this.isShort('left') ? this.px2rem(this.sideSpace) + 'rem' : '0'
            }`,
            marginRight: `${
              this.isShort('right') ? this.px2rem(this.sideSpace) + 'rem' : '0'
            }`
          }}
          onTouchStart={this.onTouchStart.bind(this)}
          onTouchMove={this.onTouchMove.bind(this)}
          onTouchEnd={this.onTouchEnd.bind(this)}
        >
          <slot />
          {this.slide && (
            <div
              class="slide"
              ref={ev => {
                this.slideEl = ev;
              }}
            >
              <slot name="slide" />
            </div>
          )}
        </div>
      </div>
    );
  }
}
