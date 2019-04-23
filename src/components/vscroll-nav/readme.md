# nb-vscroll-nav



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                                                              | Type       | Default      |
| ---------- | ----------- | ------------------------------------------------------------------------ | ---------- | ------------ |
| `idPrefix` | `id-prefix` | 定义滚动元素 id 的前置与选中的keyword 合并成完整的 id eg：'vscroll-' + 'A' -> id='vscroll-A' | `string`   | `'vscroll-'` |
| `keywords` | --          | 可用于导航滑动的关键字数组                                                            | `string[]` | `['A', 'B']` |
| `scroller` | `scroller`  | 包裹可滚动的容器，不填写的话默认为window级别滚动                                              | `string`   | `null`       |


## Methods

### `scrollToId(id: string) => Promise<any>`

滚动列表到指定id位置

#### Parameters

| Name | Type     | Description |
| ---- | -------- | ----------- |
| `id` | `string` | ID名称        |

#### Returns

Type: `Promise<any>`




## Slots

| Slot          | Description |
| ------------- | ----------- |
| `"用于定位的内容列表"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
