### 海通社区富文本交互展示模板

* parser (ht-richtext-parser) 解析器, 作用： 模板语法 -> html标准组件标签
* emoji (ht-emoji) 表情模板

### 引入方法

```html
<ht-richtext-parser>
包含模板内容的文本
</ht-richtext-parser>
```

### 模板规则 {[类型|参数1|参数2...]}

1. 表情

```
{[emoji|分组id|表情id]} -> <ht-emoji group="分组id" type="表情id" /> -> <img src="....gif" />
```