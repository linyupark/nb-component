import { Component, Prop, State, Method, Element } from '@stencil/core';

/**
 * 仿ios滚动选择器
 */
@Component({
  tag: 'nb-roll-picker',
  styleUrl: 'roll-picker.h5.styl',
  shadow: true
})
export class RollPicker {

  /**
   * 选项列表dom
   */
  $itemList: HTMLElement;
  $itemListInvisible: HTMLElement;

  /**
   * 单体高度
   */
  itemHeight: number;

  /**
   * 滚动距离
   */
  scrollTop: number = 0;

  /**
   * 滚动计时器
   */
  scrollTimer: any;

  /**
   * 选中索引值
   */
  @State() selectIndex: number = 0;

  /**
   * 容器dom
   */
  @Element() el: HTMLElement;

  /**
   * 选项内容对齐方向
   */
  @Prop() align: 'left' | 'center' | 'right' = 'center';

  /**
   * 选项内容列表
   */
  @Prop() items: any[] = [{
      key: 1,
      label: '选项1'
    },
    {
      key: 2,
      label: '选项2'
    },
    {
      key: 3,
      label: '选项3'
    },
    {
      key: 4,
      label: '选项4'
    },
    {
      key: 5,
      label: '选项5'
    },
    {
      key: 6,
      label: '选项6'
    },
    {
      key: 7,
      label: '选项7'
    },
    {
      key: 8,
      label: '选项8'
    },
    {
      key: 9,
      label: '选项9'
    }
  ];

  /**
   * 默认选中项目的key值
   */
  @Prop() defaultKey ? : number;

  /**
   * 当前选中的key值
   */
  @State() currentKey ? : number;

  /**
   * 获取当前选中的选项的数据
   * @return {Object}
   */
  @Method() async getCurrentItem() {
    return this.items.filter(item => item.key === this.currentKey)[0] || {};
  }

  /**
   * 滑动操作
   */
  protected handleScroll() {
    this.selectIndex = Math.round(this.$wrapper.scrollTop / this.itemHeight);
    this.scrollTop = this.$wrapper.scrollTop;
    this.rescroll(this.scrollTop);
    // console.log(this.scrollTop);
  }

  /**
   * 修正滚动高度确保选中
   */
  protected rescroll(preScrollTop: number) {
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
    this.scrollTimer = setTimeout(() => {
      if (preScrollTop !== this.scrollTop) {
        return this.rescroll(this.scrollTop);
      } else {
        // 完全停止
        const selectIndex = Math.round(this.scrollTop / this.itemHeight);
        // 添加动画
        // const offset = selectIndex * this.itemHeight - this.scrollTop;
        // this.$wrapper.style.transform = `translateY(${-offset}px)`;
        // this.$wrapper.style.webkitTransform = `translateY(${-offset}px)`;
        // setTimeout(() => {
          // this.$wrapper.scrollTop = selectIndex * this.itemHeight;
          // this.$wrapper.style.transform = `translateY(0px)`;
          // this.$wrapper.style.webkitTransform = `translateY(0px)`;
        // }, 100);
        this.$wrapper.scrollTop = selectIndex * this.itemHeight;
        this.currentKey = this.items[selectIndex].key;
        this.selectIndex = selectIndex;
        console.log('滚动停止', selectIndex + 1);
      }
    }, 100);
  }

  /**
   * 每个单元格高度
   */
  protected setItemHeight() {
    this.itemHeight = Math.round(this.$itemListInvisible.scrollHeight / this.items.length);
    console.log('itemHeight', this.itemHeight);
  }

  /**
   * 设置默认选中
   */
  protected async setDefaultItem() {
    if (this.defaultKey) {
      const currentItem = await this.getCurrentItem();
      this.selectIndex = this.items.indexOf(currentItem);
      this.$wrapper.scrollTop = this.selectIndex * this.itemHeight;
    }
  }

  /**
   * 获取 wrapper dom
   */
  get $wrapper(): HTMLElement {
    return this.el.shadowRoot.querySelector('.wrapper');
  }

  render() {
    return (
      <div class="roll-picker" style={{
        width: '25%',
        textAlign: 'center'
      }}>
        <div class="wrapper" onScroll={this.handleScroll.bind(this)}>
          <ul class="item-list" ref={ev => (this.$itemList = ev)}>
            {this.items.map((item, i) => {
              const classString = `offset-${this.selectIndex - i}`;
              return <li key={item.key} class={classString}>{item.label}</li>
            })}
          </ul>
          <ul class="item-list invisible" ref={ev => (this.$itemListInvisible = ev)}>
            {this.items.map(item => (
              <li key={item.key}>{item.label}</li>
            ))}
          </ul>
        </div>
        <div class="select-box"></div>
      </div>
    );
  }

  componentDidLoad() {
    this.currentKey = this.defaultKey;
    this.setItemHeight();
    this.setDefaultItem();
  }
}
