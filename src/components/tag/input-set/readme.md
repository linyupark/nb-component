# nb-tag-input-set



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description  | Type     | Default   |
| ------------- | ------------- | ------------ | -------- | --------- |
| `placeholder` | `placeholder` | 输入框提示信息      | `string` | `'请输入标签'` |
| `tags`        | `tags`        | 当前选中的tag标签数组 | `any`    | `[]`      |


## Events

| Event    | Description | Type                |
| -------- | ----------- | ------------------- |
| `change` | 标签数据发生变化    | `CustomEvent<void>` |


## Methods

### `addTag(tagString: string) => Promise<void>`

手动添加标签

#### Parameters

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| `tagString` | `string` | 标签内容        |

#### Returns

Type: `Promise<void>`



### `getTags() => Promise<any>`

获取当前标签

#### Returns

Type: `Promise<any>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
