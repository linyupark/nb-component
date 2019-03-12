# nb-pull-to-do



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                        | Type                  | Default     |
| ----------------- | ------------------ | ---------------------------------- | --------------------- | ----------- |
| `contentSelector` | `content-selector` | 展示内容选择器                            | `string`              | `undefined` |
| `dampHeight`      | `damp-height`      | 拉动限制高度                             | `number`              | `30`        |
| `disable`         | `disable`          | 禁用哪项功能 refresh: 下拉刷新 \| more: 加载更多 | `"more" \| "refresh"` | `undefined` |
| `loading`         | `loading`          | 加载状态                               | `boolean`             | `false`     |
| `noMore`          | `no-more`          | 没有更多数据了                            | `boolean`             | `false`     |
| `positionSave`    | `position-save`    | 当浏览器是返回状态是否尝试回到上一次的位置              | `boolean`             | `true`      |
| `wrapperSelector` | `wrapper-selector` | 实际滚动显示区块选择器                        | `string`              | `undefined` |


## Events

| Event     | Description | Type                |
| --------- | ----------- | ------------------- |
| `more`    | 当上拉触发加载更多   | `CustomEvent<void>` |
| `refresh` | 当下拉成立触发事件   | `CustomEvent<void>` |


## Methods

### `done() => void`

加载完毕

#### Returns

Type: `void`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
