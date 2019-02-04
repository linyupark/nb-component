import { Component, State, Element } from '@stencil/core';
import Examples from './examples';
import { search2obj } from '@utils/string';

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
    },
    {
      key: 'list',
      text: '列表.H5',
      mobile: true,
      tag: 'nb-list'
    },
    {
      key: 'icon',
      text: '图标.H5',
      mobile: true,
      tag: 'nb-svg-icon'
    },
    {
      key: 'switch',
      text: '滑动开关.H5',
      mobile: true,
      tag: 'nb-switch'
    },
    {
      key: 'canvas-radar',
      text: 'canvas雷达图',
      mobile: false,
      tag: 'nb-canvas-radar'
    }
  ];

  /**
   * 当前展示的demo
   */
  @State() demo: any = this.demoList[0];

  private parseHash() {
    const tag = location.hash.match(/#([^\?]+)/);
    // 获得渲染组件
    if (tag) {
      this.tag = tag[1];
      // 设定当前demo
      this.demo = this.demoList.filter(demo => {
        return demo.tag === this.tag;
      })[0];
      // console.log('渲染', this.tag, this.demo);
    } else {
      this.tag = '';
    }
    const search = tag ? search2obj(location.hash.split('?')[1]) : {};
    // h5 模式
    this.h5 = search.display === 'mobile';
    if (this.h5 && this.tag !== '') {
      this.el.ownerDocument.documentElement.style.fontSize = '37.5px';
    }
  }

  /**
   * 从hash来得到需要展示的组件
   */
  componentWillLoad() {
    this.parseHash();
    window.onhashchange = this.parseHash.bind(this);
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
            src={`#${this.demo.tag}?display=${this.demo.mobile ? 'mobile' : 'pc'}`}
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
