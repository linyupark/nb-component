# nb-refresh



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute          | Description                                                                                                                                                                                                                                                                                                                            | Type      | Default |
| ------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `autoScrollLoad`    | `auto-scroll-load` | 自动执行一次上拉加载                                                                                                                                                                                                                                                                                                                             | `boolean` | `false` |
| `lockRefresh`       | `lock-refresh`     | 禁用下拉刷新                                                                                                                                                                                                                                                                                                                                 | `boolean` | `false` |
| `lockScrollLoad`    | `lock-scroll-load` | 禁用上拉加载更多                                                                                                                                                                                                                                                                                                                               | `boolean` | `false` |
| `offset`            | `offset`           | 上下拉动的阀值                                                                                                                                                                                                                                                                                                                                | `number`  | `60`    |
| `refreshOptions`    | --                 | 下拉刷新文案方面的配置 参数	参数类型	默认值	说明 isWrapCssTranslate	Boolean	false	是否下拉时wrap（下拉区域不是内容区域，与scroll区分开）会跟随css translate contentdown	String	'下拉刷新'	下拉刷新默认提示 contentover	String	'释放刷新'	在超过阈值后的提示 contentrefresh	String	'加载中...'	正在刷新中的提示 contentsuccess	String	'刷新成功'	刷新成功后，结束前，成功状态的提示 contenterror	String	'刷新失败'	刷新成功后，结束前，失败状态的提示                | `object`  | `{}`    |
| `scrollLoadOptions` | --                 | 下拉刷新文案方面的配置 参数	参数类型	默认值	说明 contentdown	String	'上拉显示更多'	上拉加载默认提示，一般默认情况会隐藏用不到它 contentrefresh	String	'加载中...'	上拉加载时的提示 contentnomore	String	'没有更多数据了'	没有更多数据时的提示 toTop	Object	默认配置	滚动到顶部的相关配置，图片的话请在css中修改 toTop.isEnable	Boolean	true	是否开启自动滚动到顶部 toTop.duration	Number	300	滚动到顶部的过渡时间 toTop.offset	Number	800	阈值，滚动超过多少距离后才会显示滚动到顶部按钮 | `object`  | `{}`    |


## Events

| Event        | Description | Type                |
| ------------ | ----------- | ------------------- |
| `refresh`    | 下拉刷新事件      | `CustomEvent<void>` |
| `scrollLoad` | 上拉加载事件      | `CustomEvent<void>` |


## Methods

### `getRefresh() => Promise<any>`

获取 refresh 实例化对象

#### Returns

Type: `Promise<any>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
