let refTarget = {};
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
     * 列表
     */
    'nb-list': [
        h("div", { class: "wrapper", style: {
                padding: '0',
                background: '#f5f5f5'
            } },
            h("nb-list", null,
                h("nb-list-item", null, "\u5185\u5BB9"),
                h("nb-list-item", null, "\u5185\u5BB9"),
                h("nb-list-item", null, "\u5185\u5BB9")),
            h("nb-list", null,
                h("nb-list-item", null, "\u5185\u5BB9"),
                h("nb-list-item", null, "\u5185\u5BB9"),
                h("nb-list-item", null, "\u5185\u5BB9")))
    ],
    /**
     * 徽标数
     */
    'nb-badge': [
        h("div", { class: "wrapper" },
            h("nb-badge", { count: 213 },
                h("div", { style: boxStyles }, "\u9ED8\u8D85")),
            "\u00A0\u00A0\u00A0\u00A0",
            h("nb-badge", { count: 0, showZero: true },
                h("div", { style: boxStyles }, "\u663E0")),
            "\u00A0\u00A0\u00A0\u00A0",
            h("nb-badge", { dot: true, count: 1 },
                h("div", { style: boxStyles }, "\u5706\u70B9")),
            "\u00A0\u00A0\u00A0\u00A0",
            h("nb-badge", { count: 6, maxCount: 5 },
                h("div", { style: boxStyles }, "\u5B9A\u8D85")),
            "\u00A0\u00A0\u00A0\u00A0",
            h("nb-badge", { count: 6, bgColor: "blue" },
                h("div", { style: boxStyles }, "\u70B9\u8272"))),
        h("div", { class: "lang" }, "React"),
        h("nb-code-highlight", { code: `
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
      ` })
    ],
    /**
     * 下拉刷新上拉加载
     */
    'nb-pull-to-do': [
        h("nb-pull-to-do", { wrapperSelector: ".wrapper", contentSelector: ".wrapper > div", onRefresh: (ev) => {
                console.log('刷新开始');
                setTimeout(() => {
                    let newItem = document.createElement('div');
                    newItem.innerHTML = String(Date.now());
                    document
                        .querySelector('.wrapper > div')
                        .insertAdjacentElement('afterbegin', newItem);
                    ev.target.done();
                }, 1000);
            }, onMore: (ev) => {
                console.log('加载更多');
                setTimeout(() => {
                    let newItem = document.createElement('div');
                    newItem.innerHTML = String(Date.now());
                    document.querySelector('.wrapper > div').appendChild(newItem);
                    ev.target.done();
                }, 1000);
            } },
            h("div", { class: "wrapper", style: {
                    padding: '0px',
                    height: '30vh',
                    overflow: 'auto',
                    background: '#f5f5f5'
                } },
                h("div", { style: {
                        overflowX: 'hidden',
                        background: '#fff',
                        padding: '20px'
                    } },
                    "\u4E0B\u62C9\u8BD5\u8BD5\u5237\u65B0, \u4E0A\u62C9\u5230\u5E95\u8BD5\u8BD5\u52A0\u8F7D\u66F4\u591A\uFF08touch\u6A21\u5F0F\uFF09",
                    h("br", null),
                    '...........................'.split('').map(w => [w, h("br", null)])))),
        h("div", { class: "lang" }, "React"),
        h("nb-code-highlight", { code: `
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
      ` })
    ],
    /**
     * 固钉
     */
    'nb-affix': [
        h("div", { class: "wrapper", ref: ev => (refTarget.affix = ev), style: {
                height: '30vh',
                overflow: 'auto',
                padding: '0px'
            } },
            h("div", { class: "content", style: {
                    height: '1000px',
                    overflowX: 'hidden'
                } },
                h("br", null),
                h("nb-affix", { onChange: ({ detail }) => {
                        if (!refTarget.affix)
                            return;
                        const target = refTarget.affix.querySelector('.affix-content');
                        const wrapper = refTarget.affix.querySelector('.content');
                        if (detail.isFixed) {
                            target.classList.add('fixed');
                            wrapper.style.paddingTop = '64px';
                        }
                        else {
                            target.classList.remove('fixed');
                            wrapper.style.paddingTop = '20px';
                        }
                    }, offset: 0, targetDom: () => refTarget.affix },
                    h("div", { class: "affix-content" },
                        h("div", { class: "item" }, "\u4E8C\u7EF4\u7801"),
                        h("div", { class: "item" }, "\u5173\u7CFB\u9884\u7EA6"),
                        h("div", { class: "item" }, "\u9A7E\u9A76\u8231"),
                        h("div", { class: "item" }, "\u4EA7\u54C1\u4E2D\u5FC3"))))),
        h("div", { class: "lang" }, "React"),
        h("nb-code-highlight", { code: `
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
      ` })
    ],
    /**
     * 分页
     */
    'nb-pagination': [
        h("div", { class: "wrapper" },
            h("nb-pagination", { current: 1, pagesize: 10, total: 100, onChange: ({ detail }) => console.log(`触发转到第${detail.to}页`) })),
        h("div", { class: "lang" }, "React"),
        h("nb-code-highlight", { code: `
  <nb-pagination
    current={1}
    pagesize={10}
    total={100}
    onChange={({ detail }) => console.log(\`触发转到第\${detail.to}页\`)}
  />
    ` }),
        h("div", { class: "lang" }, "Vue"),
        h("nb-code-highlight", { code: `
  <nb-pagination
    :current="1"
    :pagesize="10"
    :total="100"
    @change="..."
  />
    ` }),
        h("div", { class: "lang" }, "HTML"),
        h("nb-code-highlight", { code: `
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
    ` })
    ],
    /**
     * 动作面板
     */
    'nb-actionsheet': [
        h("nb-actionsheet", { headTitle: "\u9762\u677F\u6807\u9898", mask: true, ref: ev => (refTarget.actionsheet = ev) },
            h("div", { slot: "container" },
                h("ul", null,
                    h("li", null, "\u9009\u98791")))),
        h("div", { class: "wrapper" },
            h("button", { onClick: () => refTarget.actionsheet.show() }, "\u6253\u5F00\u9762\u677F")),
        h("div", { class: "lang" }, "React"),
        h("nb-code-highlight", { code: `
  <nb-actionsheet headTitle="面板标题" mask={true} ref={ev => refTarget = ev}>
    <div slot="container">
      <ul>
        <li>选项1</li>
      </ul>
    </div>
  </nb-actionsheet>
  <button onClick={() => refTarget.show()}>打开面板</button>
    ` }),
        h("div", { class: "lang" }, "Vue"),
        h("nb-code-highlight", { code: `
  <nb-actionsheet head-title="面板标题" :mask="true" ref="actionsheet">
    <div slot="container">
      <ul>
        <li>选项1</li>
      </ul>
    </div>
  </nb-actionsheet>
  <button @click="$refs.actionsheet.show()">打开面板</button>
    ` }),
        h("div", { class: "lang" }, "HTML"),
        h("nb-code-highlight", { code: `
  <nb-actionsheet head-title="面板标题" mask="true">
    <div slot="container">
      <ul>
        <li>选项1</li>
      </ul>
    </div>
  </nb-actionsheet>
  <button onclick="document.querySelector('nb-actionsheet').show()">打开面板</button>
    ` })
    ]
};
