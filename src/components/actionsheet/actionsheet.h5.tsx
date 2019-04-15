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
   * body 原有样式寄存
   */
  private originStyles: string = '';

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
      this.originStyles = document.body.getAttribute('style') || '';
      this.scrollTop = this.getScrollTop();
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = -this.scrollTop + 'px';
      document.body.style.bottom = '0px';
    } else {
      document.body.setAttribute('style', this.originStyles);
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
  @Prop() headTitle?: string = '标题';

  /**
   * 是否需要遮罩 0 不需要，其他数字代表透明度
   */
  @Prop() mask: number = 0.1;

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
          {this.headTitle !== '' && (
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
      this.mask > 0 && <div style={{
        background: `rgba(0,0,0, ${String(this.mask)})`
      }} class={`mask ${this.visible ? 'visible' : ''}`} onClick={this.onClose} />
    ];
  }
}
