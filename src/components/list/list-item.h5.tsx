import { Component, Prop } from '@stencil/core';


/**
 * 上滑交互框
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
  @Prop() topSpace: 's' | 'm' | 'l' | 'none' = 'm';

  render() {
    return [
      this.topSpace !== 'none' && <div class={`space ${this.topSpace}`}></div>,
      <div class="list">
        <slot />
      </div>
    ];
  }
}