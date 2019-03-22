import { Component, Prop } from '@stencil/core';


/**
 * 列表区块
 */
@Component({
  tag: 'nb-list',
  styleUrl: 'list-item.h5.styl',
  shadow: true,
})
export class List {

  /**
   * List之间的间距
   */
  @Prop() topSpace?: number = 20;

  /**
   * 像素转为rem
   */
  px2rem(px) {
    return (px / 75);
  }

  render() {
    return [
      this.topSpace !== 0 && <div 
        class={`space`}
        style={{
          height: `${this.px2rem(this.topSpace)}rem`,
        }}
      >
        <slot name="space" />
      </div>,
      <div class="list">
        <slot />
      </div>
    ];
  }
}

