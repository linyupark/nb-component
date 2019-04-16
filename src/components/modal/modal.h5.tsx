import { Component, State, Prop, Watch, Method, Element } from '@stencil/core';

/**
 * 弹窗提示
 */
@Component({
  tag: 'nb-modal',
  styleUrl: 'modal.h5.styl',
  shadow: true
})
export class Modal {
  @Element() el: HTMLElement;
  /**
   * 可见开关
   */
  @Prop({ mutable: true, reflectToAttr: true })
  visible: boolean = false;

  /**
   * 弹窗类型
   */
  @Prop({ mutable: true, reflectToAttr: true })
  type: 'alert' | 'confirm' = 'alert';

  /**
   * 显示位置
   */
  @Prop({ mutable: true }) position: 'center' = 'center';

  /**
   * 样式定义
   */
  @Prop() theme: string = 'default';

  /**
   * 过渡动画
   */
  @State() transition: string = '';

  /**
   * 标题（不填则去掉头部区域）
   */
  @Prop({ mutable: true }) headTitle?: string = '';

  /**
   * 当弹窗类型是 alert, confirm 时确认按钮文案
   */
  @Prop({ mutable: true }) okText: string = '确定';

  /**
   * 点击确认按钮对应的操作
   */
  @Prop({ mutable: true }) onOk: Function = () => this.close();

  /**
   * 当弹窗类型是 confirm 时取消按钮文案
   */
  @Prop({ mutable: true }) noText: string = '取消';

  /**
   * 点击取消按钮对应的操作
   */
  @Prop({ mutable: true }) onNo: Function = () => this.close();

  @Watch('visible')
  onVisibleChange(newValue: boolean) {
    this.visible = newValue;
    if (newValue) {
      this.transition = 'enter';
      this.originStyles = document.body.getAttribute('style') || '';
      this.scrollTop = this.getScrollTop();
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = -this.scrollTop + 'px';
      document.body.style.bottom = '0px';
    } else {
      this.transition = 'leave';
      document.body.setAttribute('style', this.originStyles);
      document.body.scrollTop = document.documentElement.scrollTop =
        this.scrollTop || 0;
    }
  }

  /**
   * 显示
   * @param {String} type modal 类型
   * @param {Object} opts 配置参数
   * @returns {Promise} 可手动关闭的方法
   */
  @Method()
  async show(type, opts = {}) {
    const options = {
      title: '',
      content: '',
      okText: this.okText,
      onOk: this.onOk,
      ...opts
    };
    // 如果是已经显示的则先关闭再触发一次
    if (this.visible) this.visible = false;
    this.type = type;
    this.headTitle = options.title;
    this.okText = options.okText;
    this.onOk = options.onOk;
    this.el.innerHTML = options.content;
    this.visible = true;
    return this.close.bind(this);
  }

  /**
   * 暂存滚动条位置用于恢复
   */
  private scrollTop: number = 0;

  /**
   * body 原有样式寄存
   */
  private originStyles: string = '';

  /**
   * 获取当前滚动位置
   */
  private getScrollTop() {
    return document.body.scrollTop || document.documentElement.scrollTop;
  }

  /**
   * 关闭
   */
  private close() {
    this.visible = false;
  }

  /**
   * 当前样式
   */
  private get styleName() {
    return `${this.theme} ${this.position} ${this.transition}`;
  }

  componentDidLoad() {
    // 默认状态处理
    this.onVisibleChange(this.visible);
  }

  render() {
    return [
      <div class={`modal ${this.styleName}`}>
        <div class="wrapper">
          <div class="box">
            {/* 标题 */}
            {this.headTitle !== '' && <div class="title">{this.headTitle}</div>}
            {/* 正文 */}
            {this.headTitle !== '' && (
              <div class="content">
                <slot />
              </div>
            )}
            {/* 按钮 */}
            <div class="buttons">
            {this.type === 'confirm' && (
                <button class="cancel" onClick={this.onNo.bind(this)}>
                  {this.noText}
                </button>
              )}
              <button class="ok" onClick={this.onOk.bind(this)}>
                {this.okText}
              </button>
            </div>
          </div>
        </div>
      </div>,
      // 遮罩层
      this.visible && <div class="mask" />
    ];
  }
}
