import {
  Component,
  Prop,
  State,
  Event,
  EventEmitter,
  Method
} from '@stencil/core';

/**
 * SVG 图标
 */
const ICONS = {
  qingchu: `<svg class="icon icon-qingchu" viewBox="0 0 1024 1024"><path d="M512 896C299.936 896 128 724.064 128 512S299.936 128 512 128s384 171.936 384 384-171.936 384-384 384z m45.248-384l90.528-90.496a32 32 0 0 0-45.28-45.28L512 466.752l-90.496-90.528a32 32 0 0 0-45.28 45.28L466.752 512l-90.528 90.496a32 32 0 0 0 45.28 45.28L512 557.248l90.496 90.528a32 32 0 0 0 45.28-45.28L557.248 512z"  ></path></svg>`,
  sousuo: `<svg class="icon icon-sousuo" viewBox="0 0 1024 1024"><path d="M718.496 673.28l190.816 190.784a32 32 0 1 1-45.248 45.248l-190.816-190.816A350.56 350.56 0 0 1 448 800C253.6 800 96 642.4 96 448S253.6 96 448 96s352 157.6 352 352c0 85.664-30.624 164.224-81.504 225.28zM448 736a288 288 0 1 0 0-576 288 288 0 0 0 0 576z"  ></path></svg>`
};

/**
 * 搜索框
 */
@Component({
  tag: 'nb-search-bar',
  styleUrl: 'search-bar.h5.styl',
  shadow: true
})
export class SearchBar {
  /**
   * 输入框内的值（可变化反射）
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * 输入框最大长度限制
   */
  @Prop() maxLength: number = 15;

  /**
   * 搜索框内的提示文案
   */
  @Prop() placeholder: string = '输入搜索关键字';

  /**
   * 取消操作文案
   */
  @Prop() cancelText: string = '取消';

  /**
   * 搜索触发延迟
   */
  @Prop() searchDelay: number = 500;

  /**
   * 控制输入框是否聚焦的状态
   */
  @State() isInputFocus: boolean = false;

  /**
   * 当输入框发生变动时
   */
  @Event() search: EventEmitter;

  /**
   * 当发生提交操作时
   */
  @Event() submit: EventEmitter;

  /**
   * 提交搜索框内容
   */
  @Method()
  async submitForm(ev) {
    ev && ev.preventDefault();
    this.submit.emit({
      value: this.value
    });
    return this;
  }

  /**
   * 清除搜索框内容
   */
  @Method()
  async removeValue() {
    this.value = '';
    this.search.emit({
      value: ''
    });
    this.refInput.focus();
    return true;
  }

  /**
   * 取消搜索操作
   */
  @Method()
  async cancelSearch() {
    this.value = '';
    this.search.emit({
      value: ''
    });
    await this.submitForm(null);
    return true;
  }

  /**
   * 延迟搜索计时器
   */
  private delayTimer: any;

  /**
   * 输入框 DOM
   */
  private refInput: HTMLElement;

  /**
   * 当输入框有内容变化时
   */
  private onInput(ev) {
    const value = ev.target.value;
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
    }
    this.value = value;
    this.delayTimer = setTimeout(() => {
      this.search.emit({
        value
      });
    }, this.searchDelay);
  }

  /**
   * 当输入框激活
   */
  private onFocus() {
    this.isInputFocus = true;
  }

  /**
   * 当输入框失去激活
   */
  private onBlur() {
    this.isInputFocus = false;
  }

  /**
   * 带搜索图标的提示信息
   */
  get placeholderWithIcon() {
    return (
      <div class={`placeholder ${this.inputActived ? 'focus' : ''}`}>
        <i innerHTML={ICONS.sousuo} />
        &nbsp;
        {this.inputActived ? '' : this.placeholder}
      </div>
    );
  }

  /**
   * 输入框有内容或者激活中
   */
  get inputActived() {
    return this.isInputFocus || this.value.length > 0;
  }

  /**
   * 清除搜索框内容按钮
   */
  get removeValueButton() {
    return this.value.length > 0 ? (
      <i
        class={``}
        innerHTML={ICONS.qingchu}
        onClick={this.removeValue.bind(this)}
      />
    ) : (
      ''
    );
  }

  componentDidLoad() {}

  render() {
    return (
      <form action="" onSubmit={this.submitForm.bind(this)} class="search-bar">
        <input
          type="text"
          class={`input ${this.inputActived ? 'focus' : ''}`}
          maxlength={this.maxLength}
          ref={el => (this.refInput = el)}
          onInput={this.onInput.bind(this)}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          value={this.value}
        />
        {this.placeholderWithIcon}
        {this.removeValueButton}
        {/* 取消整体搜索操作 */}
        {this.inputActived && (
          <a
            class="cancelSearch"
            href="javascript:;"
            onClick={this.cancelSearch.bind(this)}
          >
            {this.cancelText}
          </a>
        )}
      </form>
    );
  }
}
