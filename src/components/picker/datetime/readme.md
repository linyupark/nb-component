# nb-datetime-picker



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Type     | Default              |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------- |
| `date`        | `date`         | 当前选中时间 new Date(2048, 9, 24, 5, 12) or '2048-10-24 05:12'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `any`    | `null`               |
| `for`         | `for`          | 触发选择显示开关的对象，一般是 input 框，可以是选择器字符串                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `string` | `null`               |
| `format`      | `format`       | 日期时间格式设置 YYYY: 4 digits year with leading zero YYY: 3 digits year with leading zero YY: 2 digits year with leading zero and be converted to a year near 2000 Y: Years with any number of digits and sign MMMM: Month name MMM: Short month name MM: Month number with leading zero M: Month number DD: Day of month with leading zero D: Day of month HH: Hours with leading zero H: Hours mm: Minutes with leading zero m: Minutes ss: Seconds with leading zero s: Seconds SSS: Milliseconds with leading zero SS: Milliseconds with leading zero S: Milliseconds | `string` | `'YYYY-MM-DD HH:mm'` |
| `rows`        | `rows`         | 每个选项上是否显示提示性文字 选项可见行数                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `number` | `7`                  |
| `textCancel`  | `text-cancel`  | 取消按钮文案                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `string` | `'取消'`               |
| `textConfirm` | `text-confirm` | 确定按钮文案                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `string` | `'确定'`               |
| `textTitle`   | `text-title`   | 标题内容                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `string` | `'选择日期时间'`           |


## Events

| Event   | Description | Type                |
| ------- | ----------- | ------------------- |
| `ready` |             | `CustomEvent<void>` |


## Methods

### `getPicker() => Promise<any>`

获取实例化选择器
之后可以使用API中对应的方法
show() how the picker.
hide() Hide the picker.
pick() Pick the current date to the target element.
getDate([formatted: 是否使用格式化]) Get the current date.
setDate(date: Date) Override the current date with a new date.
update() Update the picker with the current the element value / text.
reset() Reset the picker and the element value / text.
parseDate(date) @return {Date} Parse a date string with the set date format.
formatDate(date) @return {String} Format a date object to a string with the set date format.
destroy() Destroy the picker and remove the instance from the target element.

#### Returns

Type: `Promise<any>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
