import {
  Component,
  Prop
} from '@stencil/core';


@Component({
  tag: 'ht-stock',
  styleUrl: 'ht-stock.styl',
  shadow: true
})

/**
 * 股票
 */
export class Stock {

  /**
   * 详情对应id
   * @type {String}
   */
  @Prop() detailId: string;

  /**
   * 头部标题
   * @type {String}
   */
  @Prop() headTitle: string;
  
  /**
   * 对应跳转地址
   */
  get link() {
    return `http://baidu.com?wd=${encodeURIComponent(this.detailId)}`;
  }


  render() {
    return [
      <div class="stock">
        <a href={this.link}>
          ${this.headTitle}
        </a>
      </div>
    ]
  }

}
