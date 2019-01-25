let refTarget;

/**
 * 各组件的演示代码
 */

export default {
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
