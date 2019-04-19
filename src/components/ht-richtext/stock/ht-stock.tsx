import {
  Component,
  Prop,
  Method
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
    return `ht_square_function_${this.headTitle}_@stk=${encodeURIComponent(this.detailId)}`;
  }

  /**
   * 跳转链接时阻止冒泡
   */
  @Method()
  goLink(event) {
    event.stopPropagation();
  }

  render() {
    return [
      <div class="stock">
        <a href={this.link} onClick={this.goLink}>
          ${this.headTitle}
        </a>
      </div>
    ]
  }

}
