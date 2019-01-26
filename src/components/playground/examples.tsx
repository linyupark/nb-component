let refTarget;

/**
 * 各组件的演示代码
 */

export default {
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
    <div class="lang">Stylus</div>,
    <nb-code-highlight
      code={`
      .affix-content {
        display: flex;
        align-items: center;
        justify-content: space-around;
        left: 0;
        width: 100%;
        height: 88px;
        background: linear-gradient(187deg, rgba(109, 201, 254, 1) 0%, rgba(59, 152, 252, 1) 100%);
        box-shadow: 0px 6px 12px 0px rgba(204, 204, 204, 1);
        border-radius: 8px;
        transition: height .3s;
  
        .item {
          color: #fff;
        }
  
        &.fixed {
          width: 100vw;
          height: 44px;
          left: 0;
        }
      }
      `}
      lang="css"
    />,
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
