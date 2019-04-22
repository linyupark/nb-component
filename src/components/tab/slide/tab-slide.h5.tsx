import { Component, Prop } from '@stencil/core';

/**
 * 滑动效果的 tab 切换
 */
@Component({
  tag: 'nb-tab-slide',
  styleUrl: 'tab-slide.h5.styl',
  shadow: true
})
export class TabSlide {
  
  /**
   * 滑动块的位置，默认：底部
   */
  @Prop() position: 'bottom' | 'top' = 'bottom';

  /**
   * tab 内容控制数据列表
   */
  @Prop() items: {key: number, text: string}[] = [
    {
      key: 1,
      text: 'tab1'
    },
    {
      key: 2,
      text: 'tab2'
    }
  ]

  /**
   * 当前选中的 key
   */
  @Prop() key: number = 1;

  /**
   * 控制显示的内容选择器
   */
  @Prop() target: string = '.tab-content';

  render() {
    return (
      <div class="container">
        {this.items.map(item => {
          return (
            <div class="item" key={item.key}></div>
          )
        })}
      </div>
    );
  }

}