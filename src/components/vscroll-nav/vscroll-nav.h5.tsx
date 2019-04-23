import { Component, Prop, Element, Method, Event, EventEmitter } from '@stencil/core';


/**
 * 仿通讯录侧边垂直滑动定位条
 * @slot 用于定位的内容列表
 */
@Component({
  tag: 'nb-vscroll-nav',
  styleUrl: 'vscroll-nav.h5.styl',
  shadow: true
})
export class VscrollNav {

  @Element() el: HTMLElement;

  /**
   * 触发滚动
   */
  @Event() scrollTo: EventEmitter;

  /**
   * 可用于导航滑动的关键字数组
   */
  @Prop() keywords: string[] = ['A', 'B'];

  /**
   * 定义滚动元素 id 的前置与选中的keyword 合并成完整的 id
   * eg：'vscroll-' + 'A' -> id='vscroll-A'
   */
  @Prop() idPrefix: string = 'vscroll-';

  /**
   * 包裹可滚动的容器，不填写的话默认为window级别滚动
   */
  @Prop() scroller?: string = null;

  /**
   * 滚动列表到指定id位置
   * @param id ID名称
   */
  @Method()
  async scrollToId(id: string) {
    const scrollToTarget: any = this.el.querySelector(`#${id}`);
    if (!scrollToTarget) return false;
    const offsetY = scrollToTarget.offsetTop;
    if (!this.scroller) {
      // 不设置滚动容器默认为 window滚动
      window.scrollTo(0, offsetY);
    }
    else {
      // 设置了滚动容器
      const scroller = document.querySelector(this.scroller);
      if (!scroller) return false;
      scroller.scrollTop = offsetY;
    }
    this.scrollTo.emit({
      y: offsetY
    });
    return offsetY;
  }

  /**
   * 处理点击
   * @param ev 点击对象
   */
  private onNavClick(ev) {
    const key = ev.target.innerText;
    if (~this.keywords.indexOf(key)) {
      this.scrollToId(`${this.idPrefix}${key}`);
    }
  }

  /**
   * 处理滑动
   * @param ev 滑动对象
   */
  private onNavMove(ev) {
    const pointLocation = ev.changedTouches[0];
    // 获取到真正下方元素
    const realTarget = this.el.shadowRoot.elementFromPoint(pointLocation.clientX, pointLocation.clientY);
    const key = realTarget ? realTarget.innerHTML : '';
    // 排除无效的关键字
    if (~this.keywords.indexOf(key)) {
      this.scrollToId(`${this.idPrefix}${key}`);
    }
  }

  render() {
    return (
      <div class="vscroll-nav">
        <div class="list">
          <slot />
        </div>
        <ul class="nav"
          onClick={this.onNavClick.bind(this)}
          onTouchMove={this.onNavMove.bind(this)}
        >
          {this.keywords.map(key => {
            return (
              <li key={key}>
                {key}
              </li>
            );
          })}
        </ul>  
      </div>
    );
  }

}