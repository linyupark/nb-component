import { Component, Prop, Element } from '@stencil/core';

/**
 * 限制显示文字长度
 * length 模式：固定长度，超出的使用...
 * line 模式：固定最大行数
 */
@Component({
  tag: 'nb-string-limit',
  styleUrl: 'string-limit.styl',
  shadow: true
})
export class StringLimit {

  @Element() el: HTMLElement;

  /**
   * 选择限制长度的模式
   */
  @Prop() mode: 'line' | 'length' = 'line';

  /**
   * 针对模式设置数值 line 代表行数， length 代表长度
   */
  @Prop() number: number = 1;

  /**
   * 限制行数样式
   */
  get limitLineStyles() {
    if (this.mode === 'line') {
      return {
        '-webkit-line-clamp': String(this.number)
      }
    }
  }

  /**
   * 限制长度样式
   */
  limitLengthString() {
    if (this.mode === 'length') {
      const originString = this.el.innerText.trim();
      // const originString = this.el.shadowRoot.querySelector('slot').assignedNodes()[0].textContent;
      this.el.shadowRoot.innerHTML = originString.slice(0, this.number) + '...';
    }
  }

  componentDidLoad() {
    this.limitLengthString();
  }

  render() {
    return this.mode === 'line' ? 
    <div class="limit-line" style={{
      ...this.limitLineStyles
    }}>
      <slot />
    </div>
    : 
    <span class="limit-length">
      <slot />
    </span>;
  }
}
