import { Component, Prop, State, Element, Watch, Event, EventEmitter } from '@stencil/core';

/**
 * 滑动效果的 tab 切换
 * @slot 以 div 作为单位作为选项卡展示
 */
@Component({
  tag: 'nb-tab-slide',
  styleUrl: 'tab-slide.h5.styl',
  shadow: true
})
export class TabSlide {

  /**
   * 根元素
   */
  @Element() el: HTMLElement;
  
  /**
   * 滑动块的位置，默认：底部
   */
  @Prop() position: 'bottom' | 'top' = 'bottom';

  get slidePositionStyle() {
    return {
      [this.position]: '0'
    }
  }

  /**
   * 当前选中的 index
   */
  @Prop({ mutable: true }) index: number = 0;

  @Watch('index')
  onIndexChange(newIndex) {
    this.change.emit({
      index: newIndex
    });
    this.setCurrentTab();
  }

  /**
   * 当 tab 切换发生变化
   */
  @Event() change: EventEmitter;

  /**
   * tab 的宽度
   */
  @Prop() width: number = 750;

  get tabContainerWidth() {
    return `${this.width / 75}rem`;
  }

  /**
   * tab 高度
   */
  @Prop() height: number = 88;

  get tabContainerHeight() {
    return `${this.height / 75}rem`;
  }

  /**
   * slide 左边距离
   */
  @State() slideLeft: string = '0px';

  /**
   * 设置当前激活的 tab
   */
  private setCurrentTab() {
    const tabItems = this.el.querySelectorAll('div');
    if (tabItems.length === 0) {
      throw new Error('请在 <nb-tab-slide> 标签内输入 div为容器的选项卡内容.')
    }
    [].forEach.call(tabItems, (item, i) => {
      // 跟 index 一致的 tab 添加 classname，样式可由具体业务容器去实现
      item.classList.toggle('active', i === this.index);
      item.onclick = () => {
        this.index = i;
      }
    });
    this.setSlideLeft();
  }

  /**
   * 根据当前激活 index 以及 tab总宽度来计算 slide 应该设置的 left 距离
   */
  private setSlideLeft() {
    const slide = this.el.shadowRoot.querySelector('.slide');
    const slideWidth = slide.clientWidth;
    const tabWidth = this.el.shadowRoot.querySelector('.container').clientWidth;
    const tabItemNum = this.el.querySelectorAll('div').length;
    const itemWidth = tabWidth / tabItemNum;
    // 计算出 每个 tab slide 左错位距离
    const slideOffsetLeft = (itemWidth - slideWidth) / 2;
    this.slideLeft = `${(this.index * itemWidth) + slideOffsetLeft}px`;
  }

  componentDidLoad() {
    this.setCurrentTab();
  }

  render() {
    return (
      <div class="container" style={{
        width: this.tabContainerWidth,
        height: this.tabContainerHeight
      }}>
        {/* tab 选项卡 */}
        <slot />
        {/* 滑块 */}
        <div class="slide" style={{
          visibility: this.slideLeft === '0px' ? 'hidden' : 'visible',
          left: String(this.slideLeft),
          ...this.slidePositionStyle
        }}></div>
      </div>
    );
  }

}