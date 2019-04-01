import {
  Component,
  Prop
} from '@stencil/core';


@Component({
  tag: 'ht-topic',
  styleUrl: 'ht-topic.styl',
  shadow: true
})

/**
 * 话题
 */
export class Topic {

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
      <div class="topic">
        <a href={this.link}>
          #{this.headTitle}#
        </a>
      </div>
    ]
  }

}
