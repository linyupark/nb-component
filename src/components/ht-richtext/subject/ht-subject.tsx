import {
  Component,
  Prop
} from '@stencil/core';


@Component({
  tag: 'ht-subject',
  styleUrl: 'ht-subject.styl',
  shadow: true
})

/**
 * 专题
 */
export class Subject {

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
   * 摘要
   * @type {String}
   */
  @Prop() summary: string;
  
  /**
   * 对应跳转地址
   */
  get link() {
    return `#/article-detail/${encodeURIComponent(this.detailId)}/article`;
  }


  render() {
    return [
      <svg width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <defs>
      <symbol id="icon-zhuanlan" viewBox="0 0 1024 1024">
        <path d="M174.327172 88.275862v847.448276h688.551725v-847.448276h-688.551725z m0-70.62069h688.551725a70.62069 70.62069 0 0 1 70.620689 70.62069v847.448276a70.62069 70.62069 0 0 1-70.620689 70.62069h-688.551725a70.62069 70.62069 0 0 1-70.620689-70.62069v-847.448276a70.62069 70.62069 0 0 1 70.620689-70.62069z"  ></path>
        <path d="M333.223724 335.448276a35.310345 35.310345 0 1 1 0-70.62069h391.662345a35.310345 35.310345 0 1 1 0 70.62069H333.223724zM333.223724 512a35.310345 35.310345 0 0 1 0-70.62069h391.662345a35.310345 35.310345 0 1 1 0 70.62069H333.223724z"></path>
      </symbol>
      </defs>
      </svg>,
      <div class="subject">
        <a href={this.link}>
          <svg class="icon" aria-hidden="true">
            <use xlinkHref="#icon-zhuanlan"></use>
          </svg> {this.headTitle}
        </a>
        <p style={{
          display: this.summary === '' ? 'inline-block' : 'block'
        }}>
          {this.summary}
          <a href={this.link}>点击阅读&gt;&gt;</a>
        </p>
      </div>
    ]
  }

}
