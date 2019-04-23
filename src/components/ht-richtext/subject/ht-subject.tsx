import {
  Component,
  Prop,
  Method
} from '@stencil/core';


@Component({
  tag: 'ht-subject',
  styleUrl: 'ht-subject.styl',
  shadow: true
})

/**
 * 专题/资讯
 */
export class Subject {

  /**
   * 类型：subject1:专题/subject2:资讯
   * @type {String}
   */
  @Prop() type: string;

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
    if(this.type === 'subject1'){
      return `#/article-detail/${encodeURIComponent(this.detailId)}/article`;
    }else{
      return `@redirect=ads&title=远望谷拟10亿元收购两公司股权 24日起复牌&typecode=1&url=http://mnews.htsec.com:9080/Content/htsecNews/view/htsecNews/index.html?itemid=3cdcb4edc57028b5129a6bfd63b56be4`;
    }
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
      <div class="subject">
        <a href={this.link} onClick={this.goLink}>
          {this.type==='subject1'?<svg class="icon" viewBox="0 0 1024 1024">
            <path d="M174.327172 88.275862v847.448276h688.551725v-847.448276h-688.551725z m0-70.62069h688.551725a70.62069 70.62069 0 0 1 70.620689 70.62069v847.448276a70.62069 70.62069 0 0 1-70.620689 70.62069h-688.551725a70.62069 70.62069 0 0 1-70.620689-70.62069v-847.448276a70.62069 70.62069 0 0 1 70.620689-70.62069z"  ></path>
            <path d="M333.223724 335.448276a35.310345 35.310345 0 1 1 0-70.62069h391.662345a35.310345 35.310345 0 1 1 0 70.62069H333.223724zM333.223724 512a35.310345 35.310345 0 0 1 0-70.62069h391.662345a35.310345 35.310345 0 1 1 0 70.62069H333.223724z"></path>
          </svg>:
          <svg class="icon" viewBox="0 0 1024 1024">
            <path d="M924.672 99.328c-97.28-97.28-250.88-97.28-348.16 0L439.296 237.056c-16.384 16.384-16.384 40.448 0 56.832s40.448 16.384 56.832 0L641.536 148.48c64.512-64.512 169.984-64.512 226.304 0 64.512 64.512 64.512 161.792 0 226.304l-145.408 145.408c-56.832 72.704-161.792 72.704-226.304 8.192-16.384-16.384-40.448-16.384-56.832 0s-16.384 40.448 0 56.832c97.28 97.28 250.88 97.28 348.16 0l145.408-145.408c88.576-97.792 88.576-251.392-8.192-340.48z"></path>
            <path d="M527.872 722.432l-145.408 145.408c-64.512 64.512-169.984 64.512-226.304 0-64.512-64.512-64.512-161.792 0-226.304l169.984-169.984c64.512-64.512 169.984-64.512 226.304 0 16.384 16.384 40.448 16.384 56.832 0s16.384-40.448 0-56.832c-89.088-97.28-242.688-97.28-339.968 0l-169.984 169.984c-97.28 97.28-97.28 250.88 0 339.968 97.28 97.28 250.88 97.28 348.16 0l145.408-145.408c16.384-16.384 16.384-40.448 0-56.832-24.576-8.192-48.64-8.192-65.024 0z"></path>
          </svg>}
          &nbsp;{this.headTitle}
        </a>
        <p style={{
          display: this.summary === '' ? 'inline-block' : 'block'
        }}>
          {this.summary}&nbsp;&nbsp;&nbsp;
          <a href={this.link} onClick={this.goLink}>点击阅读&gt;&gt;</a>
        </p>
      </div>
    ]
  }

}
