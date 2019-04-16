# nb-modal



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                   | Type                   | Default              |
| ----------- | ------------ | ----------------------------- | ---------------------- | -------------------- |
| `headTitle` | `head-title` | 标题（不填则去掉头部区域）                 | `string`               | `''`                 |
| `noText`    | `no-text`    | 当弹窗类型是 confirm 时取消按钮文案        | `string`               | `'取消'`               |
| `okText`    | `ok-text`    | 当弹窗类型是 alert, confirm 时确认按钮文案 | `string`               | `'确定'`               |
| `onNo`      | --           | 点击取消按钮对应的操作                   | `Function`             | `() => this.close()` |
| `onOk`      | --           | 点击确认按钮对应的操作                   | `Function`             | `() => this.close()` |
| `position`  | `position`   | 显示位置                          | `"center"`             | `'center'`           |
| `theme`     | `theme`      | 样式定义                          | `string`               | `'default'`          |
| `type`      | `type`       | 弹窗类型                          | `"alert" \| "confirm"` | `'alert'`            |
| `visible`   | `visible`    | 可见开关                          | `boolean`              | `false`              |


## Methods

### `show(type: any, opts?: {}) => Promise<any>`

显示

#### Parameters

| Name   | Type  | Description |
| ------ | ----- | ----------- |
| `type` | `any` | modal 类型    |
| `opts` | `{}`  | 配置参数        |

#### Returns

Type: `Promise<any>`

可手动关闭的方法


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
