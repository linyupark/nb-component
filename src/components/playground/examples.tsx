let refTarget;

const boxStyles = {
  border: '1px solid #eee',
  width: '30px',
  height: '30px',
  textAlign: 'center',
  lineHeight: '30px',
  background: '#eee'
};

/**
 * 各组件的演示代码
 */

export default {
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
    <nb-pull-to-do
      wrapperSelector=".wrapper"
      contentSelector=".wrapper > div"
      onRefresh={(ev: any) => {
        console.log('刷新开始');
        setTimeout(() => {
          let newItem = document.createElement('div');
          newItem.innerHTML = String(Date.now());
          document
            .querySelector('.wrapper > div')
            .insertAdjacentElement('afterbegin', newItem);
          ev.target.done();
        }, 1000);
      }}
      onMore={(ev: any) => {
        console.log('加载更多');
        setTimeout(() => {
          let newItem = document.createElement('div');
          newItem.innerHTML = String(Date.now());
          document.querySelector('.wrapper > div').appendChild(newItem);
          ev.target.done();
        }, 1000);
      }}
    >
      <div
        class="wrapper"
        style={{
          padding: '0px',
          height: '30vh',
          overflow: 'auto',
          background: '#f5f5f5'
        }}
      >
        <div
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
      </div>
    </nb-pull-to-do>,
    <div class="lang">React</div>,
    <nb-code-highlight
      code={`
    <nb-pull-to-do
      wrapperSelector=".wrapper"
      contentSelector=".wrapper > div"
      onRefresh={(ev: any) => {
        console.log('刷新开始');
        setTimeout(() => {
          ev.target.done();
        }, 1000);
      }}
      onMore={(ev: any) => {
        console.log('加载更多');
        setTimeout(() => {
          ev.target.done();
        }, 1000);
      }}
    >
      <div
        class="wrapper"
        style={{
          padding: '0px',
          height: '30vh',
          overflow: 'auto',
          background: '#f5f5f5'
        }}
      >
        <div
          style={{
            overflowX: 'hidden',
            background: '#fff',
            padding: '20px'
          }}
        >
          下拉试试刷新, 上拉到底试试加载更多（touch模式）
          <br />
          {'...........................'
            .split('')
            .map(w => [w, <br />])}
        </div>
      </div>
    </nb-pull-to-do>
      `}
    />
  ],
  /**
   * 固钉
   */
  'nb-affix': [
    <div
      class="wrapper"
      ref={ev => (refTarget = ev)}
      style={{
        height: '30vh',
        overflow: 'auto'
      }}
    >
      <div
        style={{
          height: '1000px',
          overflowX: 'hidden'
        }}
      >
        <br />
        <nb-affix
          onChange={({ detail }) => {
            const target = document.querySelector('.affix-content');
            const wrapper: any = document.querySelector('.wrapper > div');
            if (detail.isFixed) {
              target.classList.add('fixed');
              wrapper.style.paddingTop = '64px';
            } else {
              target.classList.remove('fixed');
              wrapper.style.paddingTop = '20px';
            }
          }}
          offset={0}
          toTarget={() => refTarget}
        >
          <div class="affix-content">
            <div class="item">二维码</div>
            <div class="item">关系预约</div>
            <div class="item">驾驶舱</div>
            <div class="item">产品中心</div>
          </div>
        </nb-affix>
        {/* <br />
        <br />
        <nb-affix
          onChange={({ detail }) => {
            const target = document.querySelector('.affix-content2');
            if (detail.isFixed) {
              target.classList.add('fixed');
            }
            else {
              target.classList.remove('fixed');
            }
          }}
          offset={44}
          toTarget={() => refTarget}
        >
          <div class="affix-content2">
            <div class="item">二维码</div>
            <div class="item">关系预约</div>
            <div class="item">驾驶舱</div>
            <div class="item">产品中心</div>
          </div>
        </nb-affix> */}
      </div>
    </div>,
    <div class="lang">React</div>,
    <nb-code-highlight
      code={`
    <div
      style={{
        height: '1000px',
        overflowX: 'hidden'
      }}
    >
      <br />
      <nb-affix
        onChange={({ detail }) => {
          const target = document.querySelector('.affix-content');
          const wrapper: any = document.querySelector('.wrapper > div');
          if (detail.isFixed) {
            target.classList.add('fixed');
            wrapper.style.paddingTop = '64px';
          }
          else {
            target.classList.remove('fixed');
            wrapper.style.paddingTop = '20px';
          }
        }}
        offset={0}
        toTarget={() => refTarget}
      >
        <div class="affix-content">
          <div class="item">二维码</div>
          <div class="item">关系预约</div>
          <div class="item">驾驶舱</div>
          <div class="item">产品中心</div>
        </div>
      </nb-affix>
    </div>
      `}
    />
  ],
  /**
   * 分页
   */
  'nb-pagination': [
    <div class="wrapper">
      <p id="page-to">&nbsp;</p>
      <nb-pagination
        current={1}
        pagesize={10}
        total={100}
        onChange={({ detail }) =>
          (document.querySelector('#page-to').innerHTML = `触发转到第${
            detail.to
          }页`)
        }
      />
    </div>,
    <div class="lang">React</div>,
    <nb-code-highlight
      code={`
  <p id="page-to">&nbsp;</p>
  <nb-pagination
    current={1}
    pagesize={10}
    total={100}
    onChange={({ detail }) =>
      document.querySelector('#page-to').innerHTML = \`触发转到第$\{
        detail.to
      \}页\`;
    }
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
      mask={true}
      ref={ev => (refTarget = ev)}
    >
      <div slot="container">
        <ul>
          <li>选项1</li>
        </ul>
      </div>
    </nb-actionsheet>,
    <div class="wrapper">
      <button onClick={() => refTarget.show()}>打开面板</button>
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
