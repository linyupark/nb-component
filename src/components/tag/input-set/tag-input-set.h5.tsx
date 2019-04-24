import { Component, Prop, State, Method, Event, EventEmitter, Watch } from '@stencil/core';

/**
 * 仿微信标签设置添加输入框
 */
@Component({
  tag: 'nb-tag-input-set',
  styleUrl: 'tag-input-set.h5.styl',
  shadow: true
})
export class TagInputSet {

  /**
   * 标签数据发生变化
   */
  @Event() change: EventEmitter;

  @Watch('tags')
  onTagsChange(newTags) {
    this.change.emit({
      tags: newTags
    });
  }

  /**
   * 当前选中的tag标签数组
   */
  @Prop({ mutable: true }) tags: any = [];

  /**
   * 输入框提示信息
   */
  @Prop() placeholder: string = '请输入标签';

  /**
   * 输入框内容副本
   */
  @State() inputText: string = this.placeholder;

  /**
   * 获取当前标签
   */
  @Method()
  async getTags() {
    return this.tags;
  }

  /**
   * 手动添加标签
   * @param tagString 标签内容
   */
  @Method()
  async addTag(tagString: string) {
    this.tags = this.tags.concat(tagString.trim());
  }

  /**
   * 提交表单（按下键盘确定，添加输入框内文字变为标签）
   * @param ev
   */
  private submit(ev) {
    this.tags = this.tags.concat(this.input.value.trim());
    this.input.value = '';
    this.input.classList.remove('active');
    ev.preventDefault();
    return this.tags;
  }

  /**
   * 输入框
   */
  private input: HTMLInputElement;

  /**
   * 输入看是否是回退删除前面的标签
   * @param ev 
   */
  private onKeyDown(ev) {
    if (ev.keyCode === 8 && this.input.value === '') {
      this.tags = this.tags.slice(0, -1);
    }
    // 根据输入框有没有内容切换样式
    this.input.classList.toggle('active', this.input.value !== '');
  }

  /**
   * 影子占位符用于动态设置input宽度
   */
  private shadowText: HTMLSpanElement;

  get inputWidth() {
    return this.shadowText ? (this.shadowText.clientWidth + 10) + 'px' : 'auto';
  }

  render() {
    return (
      <form action="" onSubmit={this.submit.bind(this)} class="tag-input-set">
        {this.tags.map(tag => {
          return <div class="tag">{tag}</div>;
        })}
        <input
          type="text"
          class="input"
          placeholder={this.placeholder}
          onKeyDown={this.onKeyDown.bind(this)}
          onKeyUp={(ev: any) => {
            this.inputText = ev.target.value;
          }}
          ref={el => (this.input = el)}
          style={{
            width: this.inputWidth
          }}
        />
        <span class="shadow" ref={el => this.shadowText = el}>{this.inputText}</span>
      </form>
    );
  }
}
