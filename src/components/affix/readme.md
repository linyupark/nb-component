# nb-affix



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description           | Type     | Default     |
| ------------------ | ------------------- | --------------------- | -------- | ----------- |
| `offset`           | `offset`            | 距离偏移量后触发（正数举例上沿，负数下沿） | `number` | `undefined` |
| `relativeSelector` | `relative-selector` | 计算举例的参照dom            | `string` | `undefined` |
| `zIndex`           | `z-index`           | 固定时候zindex值           | `number` | `2`         |


## Events

| Event    | Description     | Type                |
| -------- | --------------- | ------------------- |
| `change` | 当固定状态发生变化对外发送事件 | `CustomEvent<void>` |


## Methods

### `getStartFixedScrollTop() => Promise<number>`



#### Returns

Type: `Promise<number>`



### `isFixed() => Promise<boolean>`

直接返回是否处于固定状态

#### Returns

Type: `Promise<boolean>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
