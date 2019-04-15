let refTarget: any = {};

const boxStyles = {
  border: '1px solid #eee',
  width: '30px',
  height: '30px',
  textAlign: 'center',
  lineHeight: '30px',
  background: '#eee'
};
const iconBox = {
  display: 'inline-block',
  width: '25%',
  padding: '20px 0',
  textAlign: 'center'
};

/**
 * 各组件的演示代码
 */

export default {
  /**
   * 跑马灯
   */
  'nb-marquee': [
    <div class="wrapper">
      <nb-marquee items={[
    {
      key: 1,
      text: '首批或不欢迎红筹架构，种子选手明年。',
      time: '45分钟前',
      link: 'javascript:;'
    },
    {
      key: 2,
      text: '金融法院赴上交所专题调研，科创板定时金融法院赴上交所专题调研，科创板定',
      time: '48分钟前',
      link: 'javascript:;'
    },
    {
      key: 3,
      text: '一般公司债业务完成',
      time: '56分钟前',
      link: 'javascript:;'
    }
  ]}>
      </nb-marquee>
    </div>,
    <div class="lang">React</div>,
    <nb-code-highlight
      code={`
  <nb-marquee items={[
    {
      key: 1,
      text: '首批或不欢迎红筹架构，种子选手明年。',
      time: '45分钟前',
      link: 'javascript:;'
    },
    {
      key: 2,
      text: '金融法院赴上交所专题调研，科创板定时金融法院赴上交所专题调研，科创板定',
      time: '48分钟前',
      link: 'javascript:;'
    },
    {
      key: 3,
      text: '一般公司债业务完成',
      time: '56分钟前',
      link: 'javascript:;'
    }
  ]}>
  </nb-marquee>
    `}
    />
  ],
  /**
   * 滚动选择器
   */
  'nb-roll-picker': [
    <div class="wrapper">
      <nb-roll-picker ref={ev => (refTarget.rollPicker = ev)} defaultKey={2} />
      <button
        onClick={async (ev: any) => {
          const selectItem = await refTarget.rollPicker.getCurrentItem();
          ev.target.innerHTML = `确定(${selectItem.label})`;
        }}
      >
        确定
      </button>
    </div>,
    <div class="lang">React</div>,
    <nb-code-highlight
      code={`
  <nb-roll-picker defaultKey={2} items={[
    {
      key: 1,
      label: '选项1'
    },
    ...
  ]} />
  <button onClick={async (ev: any) => {
      const selectItem = await refTarget.rollPicker.getCurrentItem();
      ev.target.innerHTML = \`确定($\{selectItem.label\})\`;
    }}>确定</button>
    `}
    />
  ],
  /**
   * canvas 雷达图
   */
  'nb-canvas-radar': [
    <div class="wrapper">
      <nb-canvas-radar fontSize={14} />
    </div>,
    <div class="lang">React</div>,
    <nb-code-highlight
      code={`
    <nb-canvas-radar 
      fontSize={14} 
      borderColor="#2E3F63"
      labelDataList={['选时',
        '选股',
        '配置',
        '日内交易',
        '风格把控',
        '风控能力'
      ]}
      points={[
        {
          bgcolor: 'RGBA(18, 105, 191, 0.5)',
          data: [30, 50, 60, 70, 80, 90]
        },
        {
          bgcolor: 'RGBA(102, 56, 240, 0.8)',
          data: [40, 40, 30, 70, 60, 100]
        }
      ]}
    />
    `}
    />
  ],
  /**
   * 滑动开关
   * */
  'nb-switch': [
    <div class="wrapper">
      点击切换：
      <nb-switch
        w={67}
        h={40}
        onChange={ev => {
          console.log(ev.detail.checked);
        }}
      />
      &nbsp;&nbsp;&nbsp; 禁用无法点击：
      <nb-switch disabled={true} />
      <br /> 更换背景色：
      <nb-switch color="red" checked={true} />
    </div>,
    <div class="lang">React</div>,
    <nb-code-highlight
      code={`
  点击切换：
  <nb-switch
    onChange={ev => {
      console.log(ev.detail.checked);
    }}
  />
  &nbsp;&nbsp;&nbsp; 禁用无法点击：
  <nb-switch disabled={true} />
  <br /> 更换背景色：
  <nb-switch color="red" checked={true} />
      `}
    />
  ],
  /**
   * 图标
   */
  'nb-svg-icon': [
    <div class="wrapper">
      <div style={iconBox}>
        <nb-svg-icon type="forward" size="xs" />
        <br />
        forward(XS)
      </div>
      <div style={iconBox}>
        <nb-svg-icon type="back" size="s" />
        <br />
        back(S)
      </div>
      <div style={iconBox}>
        <nb-svg-icon type="loading" />
        <br />
        loading(M)
      </div>
      <div style={iconBox}>
        <nb-svg-icon type="add" size="l" />
        <br />
        add (L)
      </div>
      <div style={iconBox}>
        <nb-svg-icon type="close" size="xl" />
        <br />
        close(XL)
      </div>
      <div style={iconBox}>
        <nb-svg-icon>
          <svg viewBox="0 0 32 32">
            <path
              d="M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z M22.8823123,11.1582487 L13.6200552,20.2918445 L9.7475544,16.6425102 C9.48246798,16.3731249 9.05246304,16.3731249 8.78737662,16.6425102 C8.5222902,16.9112336 8.5222902,17.3476334 8.78737662,17.6170187 L13.15007,21.7647489 C13.4153737,22.0343548 13.8451613,22.0343548 14.110465,21.7647489 C14.1406675,21.7343024 14.166307,21.7009878 14.1893391,21.66657 L23.8427073,12.1331984 C24.1077937,11.8640338 24.1077937,11.4274134 23.8427073,11.1582487 C23.5774036,10.8888634 23.147616,10.8888634 22.8823123,11.1582487 Z"
              fill="#3BC49D"
            />
          </svg>
        </nb-svg-icon>
        <br />
        自定义svg内容(M)
      </div>
    </div>,
    <div class="lang">React</div>,
    <nb-code-highlight
      code={`
    <div style={iconBox}>
      <nb-svg-icon type="forward" size="xs" />
      <br />
      forward(XS)
    </div>
    <div style={iconBox}>
      <nb-svg-icon type="back" size="s" />
      <br />
      back(S)
    </div>
    <div style={iconBox}>
      <nb-svg-icon type="loading" />
      <br />
      loading(M)
    </div>
    <div style={iconBox}>
      <nb-svg-icon type="add" size="l" />
      <br />
      add (L)
    </div>
    <div style={iconBox}>
      <nb-svg-icon type="close" size="xl" />
      <br />
      close(XL)
    </div>
    <div style={iconBox}>
      <nb-svg-icon>
        <svg viewBox="0 0 32 32">
          <path
            d="M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z M22.8823123,11.1582487 L13.6200552,20.2918445 L9.7475544,16.6425102 C9.48246798,16.3731249 9.05246304,16.3731249 8.78737662,16.6425102 C8.5222902,16.9112336 8.5222902,17.3476334 8.78737662,17.6170187 L13.15007,21.7647489 C13.4153737,22.0343548 13.8451613,22.0343548 14.110465,21.7647489 C14.1406675,21.7343024 14.166307,21.7009878 14.1893391,21.66657 L23.8427073,12.1331984 C24.1077937,11.8640338 24.1077937,11.4274134 23.8427073,11.1582487 C23.5774036,10.8888634 23.147616,10.8888634 22.8823123,11.1582487 Z"
            fill="#3BC49D"
          />
        </svg>
      </nb-svg-icon>
      <br />
      自定义svg内容(M)
    </div>`}
    />
  ],
  /**
   * 列表
   */
  'nb-list': [
    <div
      class="wrapper"
      style={{
        padding: '0',
        background: '#f5f5f5'
      }}
    >
      <nb-list topSpace={75}>
        <div slot="space">
          <div class="label" style={{
            textAlign: 'center',
            width: '10rem',
            color: '#999'
          }}>标题</div>
        </div>
        <nb-list-item>default 默认</nb-list-item>
        <nb-list-item short="left">short=left 左边缩进</nb-list-item>
        <nb-list-item short="right">short=right 右边缩进</nb-list-item>
        <nb-list-item short="both">short=both 两边缩进</nb-list-item>
        <nb-list-item border={0}>border=0 隐藏横线</nb-list-item>
      </nb-list>
      <nb-list>
        <nb-list-item border={2}>border=2 横线粗细</nb-list-item>
        <nb-list-item color="red">color=red 横线颜色</nb-list-item>
        <nb-list-item height={137}>自定义高度</nb-list-item>
      </nb-list>
    </div>,
    <div class="lang">React</div>,
    <nb-code-highlight
      code={`
    <nb-list topSpace={75}>
      <div slot="space">
        <div class="label" style={{
          textAlign: 'center',
          width: '10rem',
          color: '#999'
        }}>标题</div>
      </div>
      <nb-list-item>default 默认</nb-list-item>
      <nb-list-item short="left">short=left 左边缩进</nb-list-item>
      <nb-list-item short="right">short=right 右边缩进</nb-list-item>
      <nb-list-item short="both">short=both 两边缩进</nb-list-item>
      <nb-list-item border={0}>border=0 隐藏横线</nb-list-item>
    </nb-list>
    <nb-list>
      <nb-list-item border={2}>border=2 横线粗细</nb-list-item>
      <nb-list-item color="red">color=red 横线颜色</nb-list-item>
      <nb-list-item height={137}>自定义高度</nb-list-item>
    </nb-list>
      `}
    />
  ],
  /**
   * 徽标数
   */
  'nb-badge': [
    <div class="wrapper">
      <nb-badge count={213}>
        <div style={boxStyles}>默超</div>
      </nb-badge>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <nb-badge count={0} showZero>
        <div style={boxStyles}>显0</div>
      </nb-badge>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <nb-badge dot count={1}>
        <div style={boxStyles}>圆点</div>
      </nb-badge>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <nb-badge count={6} maxCount={5}>
        <div style={boxStyles}>定超</div>
      </nb-badge>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <nb-badge count={6} bgColor="blue">
        <div style={boxStyles}>点色</div>
      </nb-badge>
    </div>,
    <div class="lang">React</div>,
    <nb-code-highlight
      code={`
  <nb-badge count={213}>
    <div style={boxStyles}>默超</div>
  </nb-badge>
  <nb-badge count={0} showZero>
    <div style={boxStyles}>显0</div>
  </nb-badge>
  <nb-badge dot count={1}>
    <div style={boxStyles}>圆点</div>
  </nb-badge>
  <nb-badge count={6} maxCount={5}>
    <div style={boxStyles}>定超</div>
  </nb-badge>
  <nb-badge count={6} bgColor="blue">
    <div style={boxStyles}>点色</div>
  </nb-badge>
      `}
    />
  ],
  /**
   * 下拉刷新上拉加载
   */
  'nb-pull-to-do': [
    <div
      class="wrapper"
      style={{
        padding: '0px',
        height: '30vh',
        overflow: 'auto',
        background: '#f5f5f5'
      }}
    >
      <nb-pull-to-do
        wrapperSelector=".wrapper"
        contentSelector=".main"
        onRefresh={(ev: any) => {
          console.log('刷新开始');
          setTimeout(() => {
            let newItem = document.createElement('div');
            newItem.innerHTML = String(Date.now());
            document
              .querySelector('.main')
              .insertAdjacentElement('afterbegin', newItem);
            ev.target.done();
          }, 1000);
        }}
        onMore={(ev: any) => {
          console.log('加载更多');
          setTimeout(() => {
            let newItem = document.createElement('div');
            newItem.innerHTML = String(Date.now());
            document.querySelector('.main').appendChild(newItem);
            ev.target.done();
          }, 1000);
        }}
      >
        <div slot="refresh-loading">加载中</div>
        <div slot="refresh">下拉刷新</div>
        <div
          class="main"
          slot="main"
          style={{
            overflowX: 'hidden',
            background: '#fff',
            padding: '20px'
          }}
        >
          下拉试试刷新, 上拉到底试试加载更多（touch模式）
          <br />
          {'...........................'.split('').map(w => [w, <br />])}
        </div>
        <div slot="more">上拉加载更多</div>
        <div slot="more-loading">加载中</div>
      </nb-pull-to-do>
    </div>,
    <div class="lang">React</div>,
    <nb-code-highlight
      code={`
    <div
      class="wrapper"
      style={{
        padding: '0px',
        height: '30vh',
        overflow: 'auto',
        background: '#f5f5f5'
      }}
    >
      <nb-pull-to-do
        wrapperSelector=".wrapper"
        contentSelector=".main"
        onRefresh={(ev: any) => {
          console.log('刷新开始');
          setTimeout(() => {
            let newItem = document.createElement('div');
            newItem.innerHTML = String(Date.now());
            document
              .querySelector('.main')
              .insertAdjacentElement('afterbegin', newItem);
            ev.target.done();
          }, 1000);
        }}
        onMore={(ev: any) => {
          console.log('加载更多');
          setTimeout(() => {
            let newItem = document.createElement('div');
            newItem.innerHTML = String(Date.now());
            document.querySelector('.main').appendChild(newItem);
            ev.target.done();
          }, 1000);
        }}
      >
        <div slot="refresh-loading">加载中</div>
        <div slot="refresh">下拉刷新</div>
        <div
          class="main"
          slot="main"
          style={{
            overflowX: 'hidden',
            background: '#fff',
            padding: '20px'
          }}
        >
          下拉试试刷新, 上拉到底试试加载更多（touch模式）
          <br />
          {'...........................'.split('').map(w => [w, <br />])}
        </div>
        <div slot="more">上拉加载更多</div>
        <div slot="more-loading">加载中</div>
      </nb-pull-to-do>
    </div>
      `}
    />
  ],
  /**
   * 固钉
   */
  'nb-affix': [
    <div
      class="wrapper"
      ref={ev => (refTarget.affix = ev)}
      style={{
        height: '30vh',
        overflow: 'auto',
        padding: '0px'
      }}
    >
      <div
        class="content"
        style={{
          height: '1000px',
          overflowX: 'hidden'
        }}
      >
        <br />
        <nb-affix
          onChange={({ detail }) => {
            if (!refTarget.affix) return;
            const target = refTarget.affix.querySelector('.affix-content');
            const wrapper: any = refTarget.affix.querySelector('.content');
            if (detail.isFixed) {
              target.classList.add('fixed');
              wrapper.style.paddingTop = '64px';
            } else {
              target.classList.remove('fixed');
              wrapper.style.paddingTop = '20px';
            }
          }}
          offset={0}
          relativeSelector=".wrapper"
        >
          <div class="affix-content">
            <div class="item">二维码</div>
            <div class="item">关系预约</div>
            <div class="item">驾驶舱</div>
            <div class="item">产品中心</div>
          </div>
        </nb-affix>
      </div>
    </div>,
    <div class="lang">React</div>,
    <nb-code-highlight
      code={`
    <div
      class="wrapper"
      ref={ev => (refTarget.affix = ev)}
      style={{
        height: '30vh',
        overflow: 'auto',
        padding: '0px'
      }}
    >
      <div
        class="content"
        style={{
          height: '1000px',
          overflowX: 'hidden'
        }}
      >
        <br />
        <nb-affix
          onChange={({ detail }) => {
            if (!refTarget.affix) return;
            const target = refTarget.affix.querySelector('.affix-content');
            const wrapper: any = refTarget.affix.querySelector('.content');
            if (detail.isFixed) {
              target.classList.add('fixed');
              wrapper.style.paddingTop = '64px';
            } else {
              target.classList.remove('fixed');
              wrapper.style.paddingTop = '20px';
            }
          }}
          offset={0}
          relativeSelector=".wrapper"
        >
          <div class="affix-content">
            <div class="item">二维码</div>
            <div class="item">关系预约</div>
            <div class="item">驾驶舱</div>
            <div class="item">产品中心</div>
          </div>
        </nb-affix>
      </div>
    </div>
      `}
    />
  ],
  /**
   * 分页
   */
  'nb-pagination': [
    <div class="wrapper">
      <nb-pagination
        current={1}
        pagesize={10}
        total={100}
        onChange={({ detail }) => console.log(`触发转到第${detail.to}页`)}
      />
    </div>,
    <div class="lang">React</div>,
    <nb-code-highlight
      code={`
  <nb-pagination
    current={1}
    pagesize={10}
    total={100}
    onChange={({ detail }) => console.log(\`触发转到第\${detail.to}页\`)}
  />
    `}
    />,
    <div class="lang">Vue</div>,
    <nb-code-highlight
      code={`
  <nb-pagination
    :current="1"
    :pagesize="10"
    :total="100"
    @change="..."
  />
    `}
    />,
    <div class="lang">HTML</div>,
    <nb-code-highlight
      code={`
  <nb-pagination
    current="1"
    pagesize="10"
    total="100"
  />
  <script>
    const pager = document.querySelector('nb-pagination');
    pager.addEventListener('change', ({ detail }) => {
      document.querySelector('#page-to').innerHTML = \`触发转到第$\{
        detail.to
      \}页\`
    }, false);
  </script>
    `}
    />
  ],
  /**
   * 动作面板
   */
  'nb-actionsheet': [
    <nb-actionsheet
      headTitle="面板标题"
      mask={0.6}
      ref={ev => (refTarget.actionsheet = ev)}
    >
      <div slot="container">
        <ul>
          <li>选项1</li>
        </ul>
      </div>
    </nb-actionsheet>,
    <div class="wrapper">
      <button onClick={() => {
        refTarget.actionsheet.show();
        document.querySelector('#testInner').innerHTML = '<nb-pagination current="1" pagesize="5" total="50" />';
      }}>打开面板</button>
      <span id="testInner"></span>
    </div>,
    <div class="lang">React</div>,
    <nb-code-highlight
      code={`
  <nb-actionsheet headTitle="面板标题" mask={true} ref={ev => refTarget = ev}>
    <div slot="container">
      <ul>
        <li>选项1</li>
      </ul>
    </div>
  </nb-actionsheet>
  <button onClick={() => refTarget.show()}>打开面板</button>
    `}
    />,
    <div class="lang">Vue</div>,
    <nb-code-highlight
      code={`
  <nb-actionsheet head-title="面板标题" :mask="true" ref="actionsheet">
    <div slot="container">
      <ul>
        <li>选项1</li>
      </ul>
    </div>
  </nb-actionsheet>
  <button @click="$refs.actionsheet.show()">打开面板</button>
    `}
    />,
    <div class="lang">HTML</div>,
    <nb-code-highlight
      code={`
  <nb-actionsheet head-title="面板标题" mask="true">
    <div slot="container">
      <ul>
        <li>选项1</li>
      </ul>
    </div>
  </nb-actionsheet>
  <button onclick="document.querySelector('nb-actionsheet').show()">打开面板</button>
    `}
    />
  ]
};
