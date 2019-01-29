import { Component, State, Element } from '@stencil/core';
import Examples from './examples';

@Component({
  tag: 'nb-playground',
  styleUrl: 'playground.styl'
})
export class Playground {
  @Element() el: HTMLElement;

  /**
   * 内嵌的展示组件tag名称
   */
  tag: string;

  /**
   * 开启h5模式
   */
  h5: boolean = false;

  /**
   * 需要演示的组件列表
   */
  demoList = [
    {
      key: 'actionsheet',
      text: '动作面板.H5',
      mobile: true,
      tag: 'nb-actionsheet'
    },
    {
      key: 'pagination',
      text: '分页',
      mobile: false,
      tag: 'nb-pagination'
    },
    {
      key: 'affix',
      text: '固钉',
      mobile: false,
      tag: 'nb-affix'
    },
    {
      key: 'pull-to-do',
      text: '上下拉操作.H5',
      mobile: true,
      tag: 'nb-pull-to-do'
    },
    {
      key: 'badge',
      text: '徽标数.H5',
      mobile: true,
      tag: 'nb-badge'
    }
  ];

  /**
   * 当前展示的demo
   */
  @State() demo: any = this.demoList[0];

  /**
   * 从hash来得到需要展示的组件
   */
  componentWillLoad() {
    const hash = location.hash.split('#');
    const search = location.search;
    // 获得渲染组件
    if (hash.length > 1) {
      this.tag = hash[1];
      // 设定当前demo
      this.demo = this.demoList.filter(demo => {
        return demo.tag === this.tag;
      })[0];
      console.log('渲染', this.tag, this.demo);
    } else {
      this.tag = '';
    }
    // h5 模式
    this.h5 = !!~search.search('mobile');
    if (this.h5 && this.tag !== '') {
      this.el.ownerDocument.documentElement.style.fontSize = '37.5px';
    }
  }

  render() {
    return this.tag === '' ? (
      <div class="site">
        <h2>
          NB-牛邦通用组件库
          <small class="intro">
            Powered by{' '}
            <a href="https://stenciljs.com/docs/introduction" target="_blank">
              Stencil
            </a>
            ·
            <a href="https://stenciljs.com/docs/overview" target="_blank">
              跨平台使用方法
            </a>
            ·
            <a href="https://github.com/linyupark/nb-component" target="_blank">github</a>
          </small>
        </h2>
        <ul>
          {this.demoList.map(demo => (
            <li key={demo.key} class={{ active: demo.key === this.demo.key }}>
              <a
                href="javascript:;"
                onClick={() => {
                  this.demo = demo;
                }}
              >
                {demo.text}
                <br />
                {demo.key}
              </a>
            </li>
          ))}
        </ul>
        <div class="content">
          <iframe
            scrolling="no"
            class={this.demo.mobile ? 'mobile' : ''}
            src={`./?${this.demo.mobile ? 'mobile' : ''}${Date.now()}#${this.demo.tag}`}
          />
        </div>
      </div>
    ) : (
      <div class={this.demo.mobile ? 'example mobile' : 'example'}>
        {Examples[this.tag]}
      </div>
    );
  }
}
