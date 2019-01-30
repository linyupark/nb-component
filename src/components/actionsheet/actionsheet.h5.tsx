import { Component, State, Prop, Method, Watch } from '@stencil/core';


/**
 * 上滑交互框
 */
@Component({
  tag: 'nb-actionsheet',
  styleUrl: 'actionsheet.h5.styl',
  shadow: true,
})
export class Actionsheet {

  /**
   * 暂存滚动条位置用于恢复
   * @type {Number}
   */
  private scrollTop: number = 0;

  /**
   * 获取当前滚动位置
   * @return {Number}
   */
  private getScrollTop() {
    return document.body.scrollTop || document.documentElement.scrollTop;
  }

  @Watch('visible')
  /**
   * 观察显示状态来控制滚动条（显示时滑动屏幕不能让背景内容一起滚动）
   * @param  {String} visible 最新的显示状态值
   * @return {Void}
   */
  scrollHandler(visible) {
    if (visible) {
      this.scrollTop = this.getScrollTop();
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = -this.scrollTop + 'px';
    } else {
      document.body.style.position = 'inherit';
      document.body.style.width = 'inherit';
      document.body.scrollTop = document.documentElement.scrollTop = this.scrollTop || 0;
    }
  }

  /**
   * 展示开关
   */
  @State() visible: boolean = false;

  /**
   * 展示标题内容 （不用title避免跟原生属性冲突）
   */
  @Prop() headTitle: string = '标题';

  /**
   * 是否需要遮罩
   */
  @Prop() mask: boolean = true;

  private get visibleClassName() {
    return this.visible ? 'actionsheet visible' : 'actionsheet';
  }

  /**
   * 关闭显示
   */
  onClose = () => {
    this.close();
  };

  /**
   * 关闭显示
   */
  @Method() close() {
    this.visible = false;
  }

  /**
   * 显示
   */
  @Method() show() {
    this.visible = true;
  }

  render() {
    return [
      <div class={this.visibleClassName}>
        <div class="container">
          {this.headTitle && (
            <div class="header">
              <div class="title">{this.headTitle}</div>
              <svg onClick={this.onClose} class="icon-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="#333" d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>
              </svg>
            </div>
          )}
          <slot name="container" />
        </div>
      </div>,
      this.mask && <div class={`mask ${this.visible ? 'visible' : ''}`} onClick={this.onClose} />
    ];
  }
}
