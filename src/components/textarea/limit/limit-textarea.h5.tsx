import { Component, Prop, State, Element, Watch, Method, Event, EventEmitter } from '@stencil/core';

/**
 * 限制输入内容长度的文本框
 */
@Component({
  tag: 'nb-limit-textarea',
  styleUrl: 'limit-textarea.h5.styl',
  shadow: true
})
export class LimitTextara {
  @Element() el: HTMLElement;

  @Event() ready: EventEmitter;

  /**
   * 最大长度
   */
  @Prop() limit: number = 120;

  /**
   * placeholder 提示信息
   */
  @Prop() placeholder: string = '请输入内容';

  /**
   * 输入框高度
   */
  @Prop() height: number = 160;

  /**
   * 内容
   */
  @State() text: any = '';

  @Watch('text')
  onTextChange(newText) {
    const text = newText.trim();
    if (text.length > this.limit) {
      this.text = text.slice(0, this.limit);
      this.textarea.value = this.text;
    } else this.text = text;
  }

  /**
   * 获取内容
   */
  @Method()
  async getContent() {
    return this.text;
  }

  /**
   * 输入框对象
   */
  private textarea;

  /**
   * 输入文本框更新内容
   * @param ev
   */
  private onInput(ev) {
    this.text = ev.target.value.trim();
  }

  /**
   * 文本长度计算
   */
  get textLength() {
    return this.text.length;
  }

  /**
   * 文本框高度
   */
  get heightRem() {
    return `${(this.height / 75)}rem`;
  }

  componentDidLoad() {
    // 设置默认内容
    this.text = this.el.innerHTML.trim();
    this.ready.emit({
      textarea: this.textarea
    });
  }

  render() {
    return (
      <div class="textarea">
        <textarea
          style={{
            height: this.heightRem
          }}
          placeholder={this.placeholder}
          ref={el => (this.textarea = el)}
          onInput={this.onInput.bind(this)}
        >
          {this.text}
        </textarea>
        <span class="counter">
          {this.textLength}/{this.limit}
        </span>
      </div>
    );
  }
}
