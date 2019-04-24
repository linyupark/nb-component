# nb-upload-simple-image



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description  | Type     | Default  |
| ------------- | -------------- | ------------ | -------- | -------- |
| `imageSize`   | `image-size`   | 图片最大尺寸单位（KB） | `number` | `10240`  |
| `maxLength`   | `max-length`   | 最多能上传几张      | `number` | `4`      |
| `previewSize` | `preview-size` | 预览图的尺寸       | `number` | `175`    |
| `uploadText`  | `upload-text`  | 提示上传按钮的文案    | `string` | `'上传截图'` |


## Events

| Event    | Description | Type                |
| -------- | ----------- | ------------------- |
| `change` | 触发图片选择改动    | `CustomEvent<void>` |
| `error`  | 当发生错误       | `CustomEvent<void>` |


## Methods

### `getImages() => Promise<any[]>`

获取预览图片合集

#### Returns

Type: `Promise<any[]>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
