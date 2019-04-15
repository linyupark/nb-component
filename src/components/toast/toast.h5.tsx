import { Component, State, Prop, Watch, Method, Element } from '@stencil/core';

/**
 * 轻提示
 */
@Component({
  tag: 'nb-toast',
  styleUrl: 'toast.h5.styl',
  shadow: true
})
export class Toast {
  @Element() el: HTMLElement;

  /**
   * 可见开关
   */
  @Prop({ mutable: true, reflectToAttr: true }) visible: boolean = false;

  /**
   * 显示位置
   */
  @Prop() position: 'center' = 'center';

  /**
   * 消失延时时间 0 -> 不自动消失
   */
  @Prop() duration: number = 2000;

  /**
   * 最大显示宽度
   */
  @Prop() maxLength: number = 480;

  /**
   * 样式定义
   */
  @Prop() theme: string = 'default';

  /**
   * 过渡动画
   */
  @State() transition: string = '';

  /**
   * 显示
   * @param {String} message 如果需要覆盖原有信息则填写
   */
  @Method()
  async show(message: string = '') {
    if (message !== '') {
      this.el.innerHTML = message;
    }
    this.visible = true;
    this.onShowToast();
    // 返回一个可手动关闭的方法当 duration 为0 时候可使用
    return this.close.bind(this);
  }

  @Watch('visible')
  onVisibleChange(newValue: boolean, oldValue: boolean) {
    // 从不可见变为可见触发一个展示效果周期
    if (newValue && oldValue === false) {
      this.onShowToast();
    }
    if (newValue) {
      this.originStyles = document.body.getAttribute('style') || '';
      this.scrollTop = this.getScrollTop();
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = -this.scrollTop + 'px';
      document.body.style.bottom = '0px';
    } else {
      document.body.setAttribute('style', this.originStyles);
      document.body.scrollTop = document.documentElement.scrollTop =
        this.scrollTop || 0;
    }
  }

  /**
   * 展示定时器
   */
  private timer: any;

  /**
   * 暂存滚动条位置用于恢复
   */
  private scrollTop: number = 0;

  /**
   * body 原有样式寄存
   */
  private originStyles: string = '';

  /**
   * 关闭
   */
  private close() {
    this.transition = 'leave';
    this.visible = false;
  }

  /**
   * 获取当前滚动位置
   */
  private getScrollTop() {
    return document.body.scrollTop || document.documentElement.scrollTop;
  }

  /**
   * 处理显示提示
   */
  private onShowToast() {
    // 如果有计时器还没结束则刷新
    if (this.timer) {
      clearTimeout(this.timer);
    }

    // 逐渐显示动画
    this.transition = 'enter';

    // 如果延时为0 则不自动隐藏
    if (this.duration === 0) return;

    // 延时消失
    this.timer = setTimeout(() => {
      this.close();
    }, this.duration);
  }

  /**
   * 当前样式
   */
  private get styleName() {
    return `${this.theme} ${this.position} ${this.transition}`;
  }

  /**
   * 内容展示的最大宽度
   */
  private get maxWidth() {
    return `${this.maxLength / 75}rem`;
  }

  render() {
    return [
      <div class={`toast ${this.styleName}`}>
        <div class="wrapper">
          <div
            class="message"
            style={{
              maxWidth: this.maxWidth
            }}
          >
            <slot />
          </div>
        </div>
      </div>
    ];
  }
}
