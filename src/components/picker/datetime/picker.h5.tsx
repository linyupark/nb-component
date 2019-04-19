import { Component, Prop, Method, Element, Event, EventEmitter } from '@stencil/core';

import Picker from './picker.esm';

/**
 * 时间选择器
 * 核心代码封装自：https://github.com/fengyuanchen/pickerjs
 */
@Component({
  tag: 'nb-datetime-picker',
  styleUrl: 'picker.h5.styl',
  shadow: true
})
export class DatetimePicker {

  @Element() el: HTMLElement;

  @Event() ready: EventEmitter;

  /**
   * 日期时间格式设置
    YYYY: 4 digits year with leading zero
    YYY: 3 digits year with leading zero
    YY: 2 digits year with leading zero and be converted to a year near 2000
    Y: Years with any number of digits and sign
    MMMM: Month name
    MMM: Short month name
    MM: Month number with leading zero
    M: Month number
    DD: Day of month with leading zero
    D: Day of month
    HH: Hours with leading zero
    H: Hours
    mm: Minutes with leading zero
    m: Minutes
    ss: Seconds with leading zero
    s: Seconds
    SSS: Milliseconds with leading zero
    SS: Milliseconds with leading zero
    S: Milliseconds
   */
  @Prop() format: string = 'YYYY-MM-DD HH:mm';

  /**
   * 当前选中时间
   * new Date(2048, 9, 24, 5, 12) or '2048-10-24 05:12'
   * @type {String|Date} 字符串或者时间对象
   */
  @Prop() date?: any = null;

  /**
   * 触发选择显示开关的对象，一般是 input 框，可以是选择器字符串
   */
  @Prop() for: string = null;

  /**
   * 每个选项上是否显示提示性文字
   */
  // @Prop() headers?: boolean = false;

  /**
   * 选项可见行数
   */
  @Prop() rows: number = 7;

  /**
   * 标题内容
   */
  @Prop() textTitle: string = '选择日期时间';

  /**
   * 确定按钮文案
   */
  @Prop() textConfirm: string = '确定';

  /**
   * 取消按钮文案
   */
  @Prop() textCancel: string = '取消';

  /**
   * 获取实例化选择器
   * 之后可以使用API中对应的方法
   * show() how the picker.
   * hide() Hide the picker.
   * pick() Pick the current date to the target element.
   * getDate([formatted: 是否使用格式化]) Get the current date.
   * setDate(date: Date) Override the current date with a new date.
   * update() Update the picker with the current the element value / text.
   * reset() Reset the picker and the element value / text.
   * parseDate(date) @return {Date} Parse a date string with the set date format.
   * formatDate(date) @return {String} Format a date object to a string with the set date format.
   * destroy() Destroy the picker and remove the instance from the target element.
   */
  @Method()
  async getPicker() {
    return this.Picker;
  }

  /**
   * 选择器
   */
  private Picker;

  componentDidLoad() {
    const el = document.querySelector(this.for);
    const container = this.el.shadowRoot.querySelector('.picker-container');
    // 实例化选择器
    this.Picker = new Picker(el, {
      container,
      rows: this.rows,
      format: this.format,
      date: this.date,
      // headers: this.headers,
      headers: false, // 因为要显示中间选中框必须强制不显示每列的头部提示信息
      language: 'zh-CN',
      text: {
        title: this.textTitle,
        confirm: this.textConfirm,
        cancel: this.textCancel
      },
      translate(type, text) {
        const suffixes = {
          year: '年',
          month: '月',
          day: '日',
          hour: '时',
          minute: '分',
        };
        return Number(text) + suffixes[type];
      },
    });
    // 发送准备完毕
    this.ready.emit({
      picker: this.Picker
    });
  }

  render() {
    return (
      <div class="datetime-picker">
        <slot />
        <div class="picker-container"></div>
      </div>
    );
  }
}
