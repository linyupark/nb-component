/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface NbActionsheet {
    /**
    * 关闭显示
    */
    'close': () => void;
    /**
    * 展示标题内容 （不用title避免跟原生属性冲突）
    */
    'headTitle'?: string;
    /**
    * 是否需要遮罩 0 不需要，其他数字代表透明度
    */
    'mask': number;
    /**
    * 显示
    */
    'show': () => void;
  }
  interface NbActionsheetAttributes extends StencilHTMLAttributes {
    /**
    * 展示标题内容 （不用title避免跟原生属性冲突）
    */
    'headTitle'?: string;
    /**
    * 是否需要遮罩 0 不需要，其他数字代表透明度
    */
    'mask'?: number;
  }

  interface NbAffix {
    'getStartFixedScrollTop': () => Promise<number>;
    /**
    * 直接返回是否处于固定状态
    */
    'isFixed': () => Promise<boolean>;
    /**
    * 距离偏移量后触发（正数举例上沿，负数下沿）
    */
    'offset': number;
    /**
    * 计算举例的参照dom
    */
    'relativeSelector'?: string;
    /**
    * 固定时候zindex值
    */
    'zIndex': number;
  }
  interface NbAffixAttributes extends StencilHTMLAttributes {
    /**
    * 距离偏移量后触发（正数举例上沿，负数下沿）
    */
    'offset'?: number;
    /**
    * 当固定状态发生变化对外发送事件
    */
    'onChange'?: (event: CustomEvent) => void;
    /**
    * 计算举例的参照dom
    */
    'relativeSelector'?: string;
    /**
    * 固定时候zindex值
    */
    'zIndex'?: number;
  }

  interface NbBadge {
    /**
    * 徽标底色
    */
    'bgColor': string;
    /**
    * 展示数字，0为隐藏
    */
    'count': number;
    /**
    * 不展示数字，显示点
    */
    'dot': boolean;
    /**
    * count的封顶数值超出则显示 maxCount+
    */
    'maxCount': number;
    /**
    * 位置偏移量
    */
    'offset': number;
    /**
    * 当count为0的时候也显示
    */
    'showZero': boolean;
  }
  interface NbBadgeAttributes extends StencilHTMLAttributes {
    /**
    * 徽标底色
    */
    'bgColor'?: string;
    /**
    * 展示数字，0为隐藏
    */
    'count'?: number;
    /**
    * 不展示数字，显示点
    */
    'dot'?: boolean;
    /**
    * count的封顶数值超出则显示 maxCount+
    */
    'maxCount'?: number;
    /**
    * 位置偏移量
    */
    'offset'?: number;
    /**
    * 当count为0的时候也显示
    */
    'showZero'?: boolean;
  }

  interface NbCanvasRadar {
    /**
    * 雷达线颜色
    */
    'borderColor': string;
    /**
    * 字体大小
    */
    'fontSize': number;
    /**
    * 角顶文案
    */
    'labelDataList': string[];
    /**
    * 背景色以及分值
    */
    'points': any;
    /**
    * 半径间隔数
    */
    'unit': number;
    /**
    * 画布宽高
    */
    'wh': [number, number];
  }
  interface NbCanvasRadarAttributes extends StencilHTMLAttributes {
    /**
    * 雷达线颜色
    */
    'borderColor'?: string;
    /**
    * 字体大小
    */
    'fontSize'?: number;
    /**
    * 角顶文案
    */
    'labelDataList'?: string[];
    /**
    * 背景色以及分值
    */
    'points'?: any;
    /**
    * 半径间隔数
    */
    'unit'?: number;
    /**
    * 画布宽高
    */
    'wh'?: [number, number];
  }

  interface NbCodeHighlight {
    /**
    * 代码内容
    */
    'code': string;
    /**
    * 代码类型
    */
    'lang': string;
  }
  interface NbCodeHighlightAttributes extends StencilHTMLAttributes {
    /**
    * 代码内容
    */
    'code'?: string;
    /**
    * 代码类型
    */
    'lang'?: string;
  }

  interface HtEmoji {
    /**
    * 表情分组
    */
    'group': string;
    /**
    * 表情名称
    */
    'type': string;
  }
  interface HtEmojiAttributes extends StencilHTMLAttributes {
    /**
    * 表情分组
    */
    'group'?: string;
    /**
    * 表情名称
    */
    'type'?: string;
  }

  interface HtRichtextParser {
    /**
    * 调试模式
    */
    'debug'?: false;
  }
  interface HtRichtextParserAttributes extends StencilHTMLAttributes {
    /**
    * 调试模式
    */
    'debug'?: false;
  }

  interface HtStock {
    /**
    * 详情对应id
    */
    'detailId': string;
    /**
    * 跳转链接时阻止冒泡
    */
    'goLink': (event: any) => void;
    /**
    * 头部标题
    */
    'headTitle': string;
  }
  interface HtStockAttributes extends StencilHTMLAttributes {
    /**
    * 详情对应id
    */
    'detailId'?: string;
    /**
    * 头部标题
    */
    'headTitle'?: string;
  }

  interface HtSubject {
    /**
    * 详情对应id
    */
    'detailId': string;
    /**
    * 跳转链接时阻止冒泡
    */
    'goLink': (event: any) => void;
    /**
    * 头部标题
    */
    'headTitle': string;
    /**
    * 摘要
    */
    'summary': string;
    /**
    * 类型：subject1:专题/subject2:资讯
    */
    'type': string;
  }
  interface HtSubjectAttributes extends StencilHTMLAttributes {
    /**
    * 详情对应id
    */
    'detailId'?: string;
    /**
    * 头部标题
    */
    'headTitle'?: string;
    /**
    * 摘要
    */
    'summary'?: string;
    /**
    * 类型：subject1:专题/subject2:资讯
    */
    'type'?: string;
  }

  interface HtTopic {
    /**
    * 详情对应id
    */
    'detailId': string;
    /**
    * 跳转链接时阻止冒泡
    */
    'goLink': (event: any) => void;
    /**
    * 头部标题
    */
    'headTitle': string;
  }
  interface HtTopicAttributes extends StencilHTMLAttributes {
    /**
    * 详情对应id
    */
    'detailId'?: string;
    /**
    * 头部标题
    */
    'headTitle'?: string;
  }

  interface NbListItem {
    /**
    * 下边框, 0则不显示
    */
    'border': number;
    /**
    * 线条颜色
    */
    'color': string;
    /**
    * 设置单元高度
    */
    'height'?: number;
    /**
    * 短线条方向
    */
    'short'?: 'left' | 'right' | 'both';
    /**
    * 设置横线左右间距
    */
    'sideSpace'?: number;
    /**
    * 是否启用横滑操作开关
    */
    'slide': boolean;
  }
  interface NbListItemAttributes extends StencilHTMLAttributes {
    /**
    * 下边框, 0则不显示
    */
    'border'?: number;
    /**
    * 线条颜色
    */
    'color'?: string;
    /**
    * 设置单元高度
    */
    'height'?: number;
    /**
    * 短线条方向
    */
    'short'?: 'left' | 'right' | 'both';
    /**
    * 设置横线左右间距
    */
    'sideSpace'?: number;
    /**
    * 是否启用横滑操作开关
    */
    'slide'?: boolean;
  }

  interface NbList {
    /**
    * List之间的间距
    */
    'topSpace'?: number;
  }
  interface NbListAttributes extends StencilHTMLAttributes {
    /**
    * List之间的间距
    */
    'topSpace'?: number;
  }

  interface NbMarquee {
    /**
    * 跑动内容列表
    */
    'items'?: {
      key: number,
      text: string,
      time?: string,
      link: string
    }[];
    /**
    * 多少间隔动一次
    */
    'speed': number;
    /**
    * 跑马灯预设样式
    */
    'styleId': 'tow-row-66h';
  }
  interface NbMarqueeAttributes extends StencilHTMLAttributes {
    /**
    * 跑动内容列表
    */
    'items'?: {
      key: number,
      text: string,
      time?: string,
      link: string
    }[];
    /**
    * 多少间隔动一次
    */
    'speed'?: number;
    /**
    * 跑马灯预设样式
    */
    'styleId'?: 'tow-row-66h';
  }

  interface NbRefresh {
    /**
    * 自动执行一次上拉加载
    */
    'autoScrollLoad': boolean;
    /**
    * 获取 refresh 实例化对象
    */
    'getRefresh': () => Promise<any>;
    /**
    * 禁用下拉刷新
    */
    'lockRefresh': boolean;
    /**
    * 禁用上拉加载更多
    */
    'lockScrollLoad': boolean;
    /**
    * 上下拉动的阀值
    */
    'offset': number;
    /**
    * 下拉刷新文案方面的配置 参数	参数类型	默认值	说明 isWrapCssTranslate	Boolean	false	是否下拉时wrap（下拉区域不是内容区域，与scroll区分开）会跟随css translate contentdown	String	'下拉刷新'	下拉刷新默认提示 contentover	String	'释放刷新'	在超过阈值后的提示 contentrefresh	String	'加载中...'	正在刷新中的提示 contentsuccess	String	'刷新成功'	刷新成功后，结束前，成功状态的提示 contenterror	String	'刷新失败'	刷新成功后，结束前，失败状态的提示
    */
    'refreshOptions': object;
    /**
    * 下拉刷新文案方面的配置 参数	参数类型	默认值	说明 contentdown	String	'上拉显示更多'	上拉加载默认提示，一般默认情况会隐藏用不到它 contentrefresh	String	'加载中...'	上拉加载时的提示 contentnomore	String	'没有更多数据了'	没有更多数据时的提示 toTop	Object	默认配置	滚动到顶部的相关配置，图片的话请在css中修改 toTop.isEnable	Boolean	true	是否开启自动滚动到顶部 toTop.duration	Number	300	滚动到顶部的过渡时间 toTop.offset	Number	800	阈值，滚动超过多少距离后才会显示滚动到顶部按钮
    */
    'scrollLoadOptions': object;
  }
  interface NbRefreshAttributes extends StencilHTMLAttributes {
    /**
    * 自动执行一次上拉加载
    */
    'autoScrollLoad'?: boolean;
    /**
    * 禁用下拉刷新
    */
    'lockRefresh'?: boolean;
    /**
    * 禁用上拉加载更多
    */
    'lockScrollLoad'?: boolean;
    /**
    * 上下拉动的阀值
    */
    'offset'?: number;
    /**
    * 下拉刷新事件
    */
    'onRefresh'?: (event: CustomEvent) => void;
    /**
    * 上拉加载事件
    */
    'onScrollLoad'?: (event: CustomEvent) => void;
    /**
    * 下拉刷新文案方面的配置 参数	参数类型	默认值	说明 isWrapCssTranslate	Boolean	false	是否下拉时wrap（下拉区域不是内容区域，与scroll区分开）会跟随css translate contentdown	String	'下拉刷新'	下拉刷新默认提示 contentover	String	'释放刷新'	在超过阈值后的提示 contentrefresh	String	'加载中...'	正在刷新中的提示 contentsuccess	String	'刷新成功'	刷新成功后，结束前，成功状态的提示 contenterror	String	'刷新失败'	刷新成功后，结束前，失败状态的提示
    */
    'refreshOptions'?: object;
    /**
    * 下拉刷新文案方面的配置 参数	参数类型	默认值	说明 contentdown	String	'上拉显示更多'	上拉加载默认提示，一般默认情况会隐藏用不到它 contentrefresh	String	'加载中...'	上拉加载时的提示 contentnomore	String	'没有更多数据了'	没有更多数据时的提示 toTop	Object	默认配置	滚动到顶部的相关配置，图片的话请在css中修改 toTop.isEnable	Boolean	true	是否开启自动滚动到顶部 toTop.duration	Number	300	滚动到顶部的过渡时间 toTop.offset	Number	800	阈值，滚动超过多少距离后才会显示滚动到顶部按钮
    */
    'scrollLoadOptions'?: object;
  }

  interface NbModal {
    /**
    * 标题（不填则去掉头部区域）
    */
    'headTitle'?: string;
    /**
    * 当弹窗类型是 confirm 时取消按钮文案
    */
    'noText': string;
    /**
    * 当弹窗类型是 alert, confirm 时确认按钮文案
    */
    'okText': string;
    /**
    * 点击取消按钮对应的操作
    */
    'onNo': Function;
    /**
    * 点击确认按钮对应的操作
    */
    'onOk': Function;
    /**
    * 显示位置
    */
    'position': 'center';
    /**
    * 显示
    */
    'show': (type: any, opts?: {}) => Promise<any>;
    /**
    * 样式定义
    */
    'theme': string;
    /**
    * 弹窗类型
    */
    'type': 'alert' | 'confirm';
    /**
    * 可见开关
    */
    'visible': boolean;
  }
  interface NbModalAttributes extends StencilHTMLAttributes {
    /**
    * 标题（不填则去掉头部区域）
    */
    'headTitle'?: string;
    /**
    * 当弹窗类型是 confirm 时取消按钮文案
    */
    'noText'?: string;
    /**
    * 当弹窗类型是 alert, confirm 时确认按钮文案
    */
    'okText'?: string;
    /**
    * 点击取消按钮对应的操作
    */
    'onNo'?: Function;
    /**
    * 点击确认按钮对应的操作
    */
    'onOk'?: Function;
    /**
    * 显示位置
    */
    'position'?: 'center';
    /**
    * 样式定义
    */
    'theme'?: string;
    /**
    * 弹窗类型
    */
    'type'?: 'alert' | 'confirm';
    /**
    * 可见开关
    */
    'visible'?: boolean;
  }

  interface NbPagination {
    /**
    * 当只有一页的时候自动隐藏
    */
    'autoHide': boolean;
    /**
    * 当前页面
    */
    'current': number;
    /**
    * 当分页太多时候限制前后显示页数
    */
    'limitPage': 4 | 6 | 8;
    /**
    * 每页条数
    */
    'pagesize': number;
    /**
    * 总数据条数
    */
    'total': number;
  }
  interface NbPaginationAttributes extends StencilHTMLAttributes {
    /**
    * 当只有一页的时候自动隐藏
    */
    'autoHide'?: boolean;
    /**
    * 当前页面
    */
    'current'?: number;
    /**
    * 当分页太多时候限制前后显示页数
    */
    'limitPage'?: 4 | 6 | 8;
    /**
    * 当前页发生变化
    */
    'onChange'?: (event: CustomEvent) => void;
    /**
    * 每页条数
    */
    'pagesize'?: number;
    /**
    * 总数据条数
    */
    'total'?: number;
  }

  interface NbDatetimePicker {
    /**
    * 当前选中时间 new Date(2048, 9, 24, 5, 12) or '2048-10-24 05:12'
    */
    'date'?: any;
    /**
    * 触发选择显示开关的对象，一般是 input 框，可以是选择器字符串
    */
    'for': string;
    /**
    * 日期时间格式设置 YYYY: 4 digits year with leading zero YYY: 3 digits year with leading zero YY: 2 digits year with leading zero and be converted to a year near 2000 Y: Years with any number of digits and sign MMMM: Month name MMM: Short month name MM: Month number with leading zero M: Month number DD: Day of month with leading zero D: Day of month HH: Hours with leading zero H: Hours mm: Minutes with leading zero m: Minutes ss: Seconds with leading zero s: Seconds SSS: Milliseconds with leading zero SS: Milliseconds with leading zero S: Milliseconds
    */
    'format': string;
    /**
    * 获取实例化选择器 之后可以使用API中对应的方法 show() how the picker. hide() Hide the picker. pick() Pick the current date to the target element. getDate([formatted: 是否使用格式化]) Get the current date. setDate(date: Date) Override the current date with a new date. update() Update the picker with the current the element value / text. reset() Reset the picker and the element value / text. parseDate(date) @return {Date} Parse a date string with the set date format. formatDate(date) @return {String} Format a date object to a string with the set date format. destroy() Destroy the picker and remove the instance from the target element.
    */
    'getPicker': () => Promise<any>;
    /**
    * 每个选项上是否显示提示性文字 选项可见行数
    */
    'rows': number;
    /**
    * 取消按钮文案
    */
    'textCancel': string;
    /**
    * 确定按钮文案
    */
    'textConfirm': string;
    /**
    * 标题内容
    */
    'textTitle': string;
  }
  interface NbDatetimePickerAttributes extends StencilHTMLAttributes {
    /**
    * 当前选中时间 new Date(2048, 9, 24, 5, 12) or '2048-10-24 05:12'
    */
    'date'?: any;
    /**
    * 触发选择显示开关的对象，一般是 input 框，可以是选择器字符串
    */
    'for'?: string;
    /**
    * 日期时间格式设置 YYYY: 4 digits year with leading zero YYY: 3 digits year with leading zero YY: 2 digits year with leading zero and be converted to a year near 2000 Y: Years with any number of digits and sign MMMM: Month name MMM: Short month name MM: Month number with leading zero M: Month number DD: Day of month with leading zero D: Day of month HH: Hours with leading zero H: Hours mm: Minutes with leading zero m: Minutes ss: Seconds with leading zero s: Seconds SSS: Milliseconds with leading zero SS: Milliseconds with leading zero S: Milliseconds
    */
    'format'?: string;
    'onReady'?: (event: CustomEvent) => void;
    /**
    * 每个选项上是否显示提示性文字 选项可见行数
    */
    'rows'?: number;
    /**
    * 取消按钮文案
    */
    'textCancel'?: string;
    /**
    * 确定按钮文案
    */
    'textConfirm'?: string;
    /**
    * 标题内容
    */
    'textTitle'?: string;
  }

  interface NbPlayground {}
  interface NbPlaygroundAttributes extends StencilHTMLAttributes {}

  interface NbPullToDo {
    /**
    * 展示内容选择器
    */
    'contentSelector': string;
    /**
    * 拉动限制高度
    */
    'dampHeight': number;
    /**
    * 禁用哪项功能 refresh: 下拉刷新 | more: 加载更多
    */
    'disable'?: 'refresh' | 'more';
    /**
    * 加载完毕
    */
    'done': () => Promise<boolean>;
    /**
    * 加载状态
    */
    'loading': boolean;
    /**
    * 没有更多数据了
    */
    'noMore': boolean;
    /**
    * 当浏览器是返回状态是否尝试回到上一次的位置 ID
    */
    'positionSaveId'?: string;
    /**
    * 获取上次位置
    */
    'restoreLastPosition': () => Promise<any>;
    /**
    * 实际滚动显示区块选择器
    */
    'wrapperSelector': string;
  }
  interface NbPullToDoAttributes extends StencilHTMLAttributes {
    /**
    * 展示内容选择器
    */
    'contentSelector'?: string;
    /**
    * 拉动限制高度
    */
    'dampHeight'?: number;
    /**
    * 禁用哪项功能 refresh: 下拉刷新 | more: 加载更多
    */
    'disable'?: 'refresh' | 'more';
    /**
    * 加载状态
    */
    'loading'?: boolean;
    /**
    * 没有更多数据了
    */
    'noMore'?: boolean;
    /**
    * 当上拉触发加载更多
    */
    'onMore'?: (event: CustomEvent) => void;
    /**
    * 当下拉成立触发事件
    */
    'onRefresh'?: (event: CustomEvent) => void;
    /**
    * 当浏览器是返回状态是否尝试回到上一次的位置 ID
    */
    'positionSaveId'?: string;
    /**
    * 实际滚动显示区块选择器
    */
    'wrapperSelector'?: string;
  }

  interface NbRollPicker {
    /**
    * 选项内容对齐方向
    */
    'align': 'left' | 'center' | 'right';
    /**
    * 默认选中项目的key值
    */
    'defaultKey'?: number;
    /**
    * 获取当前选中的选项的数据
    */
    'getCurrentItem': () => Promise<any>;
    /**
    * 选项内容列表
    */
    'items': any[];
  }
  interface NbRollPickerAttributes extends StencilHTMLAttributes {
    /**
    * 选项内容对齐方向
    */
    'align'?: 'left' | 'center' | 'right';
    /**
    * 默认选中项目的key值
    */
    'defaultKey'?: number;
    /**
    * 选项内容列表
    */
    'items'?: any[];
  }

  interface NbSearchBar {
    /**
    * 取消搜索操作
    */
    'cancelSearch': () => Promise<boolean>;
    /**
    * 取消操作文案
    */
    'cancelText': string;
    /**
    * 输入框最大长度限制
    */
    'maxLength': number;
    /**
    * 搜索框内的提示文案
    */
    'placeholder': string;
    /**
    * 清除搜索框内容
    */
    'removeValue': () => Promise<boolean>;
    /**
    * 搜索触发延迟
    */
    'searchDelay': number;
    /**
    * 提交搜索框内容
    */
    'submitForm': (ev: any) => Promise<this>;
    /**
    * 输入框内的值（可变化反射）
    */
    'value': string;
  }
  interface NbSearchBarAttributes extends StencilHTMLAttributes {
    /**
    * 取消操作文案
    */
    'cancelText'?: string;
    /**
    * 输入框最大长度限制
    */
    'maxLength'?: number;
    /**
    * 当输入框发生变动时
    */
    'onFocusChange'?: (event: CustomEvent) => void;
    /**
    * 当输入框发生变动时
    */
    'onSearch'?: (event: CustomEvent) => void;
    /**
    * 当发生提交操作时
    */
    'onSubmit'?: (event: CustomEvent) => void;
    /**
    * 搜索框内的提示文案
    */
    'placeholder'?: string;
    /**
    * 搜索触发延迟
    */
    'searchDelay'?: number;
    /**
    * 输入框内的值（可变化反射）
    */
    'value'?: string;
  }

  interface NbStringLimit {
    /**
    * 选择限制长度的模式
    */
    'mode': 'line' | 'length';
    /**
    * 针对模式设置数值 line 代表行数， length 代表长度
    */
    'number': number;
  }
  interface NbStringLimitAttributes extends StencilHTMLAttributes {
    /**
    * 选择限制长度的模式
    */
    'mode'?: 'line' | 'length';
    /**
    * 针对模式设置数值 line 代表行数， length 代表长度
    */
    'number'?: number;
  }

  interface NbSvgIcon {
    /**
    * 加入动画名称
    */
    'anim': 'rotate' | '';
    /**
    * svg 大小
    */
    'size': 'xs' | 's' | 'm' | 'l' | 'xl';
    /**
    * type 图标类型，不使用内置的话不需要设置
    */
    'type'?: string;
  }
  interface NbSvgIconAttributes extends StencilHTMLAttributes {
    /**
    * 加入动画名称
    */
    'anim'?: 'rotate' | '';
    /**
    * svg 大小
    */
    'size'?: 'xs' | 's' | 'm' | 'l' | 'xl';
    /**
    * type 图标类型，不使用内置的话不需要设置
    */
    'type'?: string;
  }

  interface NbSwitch {
    /**
    * 是否默认选中
    */
    'checked': boolean;
    /**
    * 开关背景颜色
    */
    'color': string;
    /**
    * 是否不可修改
    */
    'disabled': boolean;
    /**
    * 高度
    */
    'h': number;
    /**
    * 宽度
    */
    'w': number;
  }
  interface NbSwitchAttributes extends StencilHTMLAttributes {
    /**
    * 是否默认选中
    */
    'checked'?: boolean;
    /**
    * 开关背景颜色
    */
    'color'?: string;
    /**
    * 是否不可修改
    */
    'disabled'?: boolean;
    /**
    * 高度
    */
    'h'?: number;
    /**
    * 当状态发生改变
    */
    'onChange'?: (event: CustomEvent) => void;
    /**
    * 宽度
    */
    'w'?: number;
  }

  interface NbTabSlide {
    /**
    * tab 高度
    */
    'height': number;
    /**
    * 当前选中的 index
    */
    'index': number;
    /**
    * 滑动块的位置，默认：底部
    */
    'position': 'bottom' | 'top';
    /**
    * tab 的宽度
    */
    'width': number;
  }
  interface NbTabSlideAttributes extends StencilHTMLAttributes {
    /**
    * tab 高度
    */
    'height'?: number;
    /**
    * 当前选中的 index
    */
    'index'?: number;
    /**
    * 当 tab 切换发生变化
    */
    'onChange'?: (event: CustomEvent) => void;
    /**
    * 滑动块的位置，默认：底部
    */
    'position'?: 'bottom' | 'top';
    /**
    * tab 的宽度
    */
    'width'?: number;
  }

  interface NbTagInputSet {
    /**
    * 手动添加标签
    */
    'addTag': (tagString: string) => Promise<void>;
    /**
    * 获取当前标签
    */
    'getTags': () => Promise<any>;
    /**
    * 输入框提示信息
    */
    'placeholder': string;
    /**
    * 当前选中的tag标签数组
    */
    'tags': any;
  }
  interface NbTagInputSetAttributes extends StencilHTMLAttributes {
    /**
    * 标签数据发生变化
    */
    'onChange'?: (event: CustomEvent) => void;
    /**
    * 输入框提示信息
    */
    'placeholder'?: string;
    /**
    * 当前选中的tag标签数组
    */
    'tags'?: any;
  }

  interface NbLimitTextarea {
    /**
    * 获取内容
    */
    'getContent': () => Promise<any>;
    /**
    * 输入框高度
    */
    'height': number;
    /**
    * 最大长度
    */
    'limit': number;
    /**
    * placeholder 提示信息
    */
    'placeholder': string;
  }
  interface NbLimitTextareaAttributes extends StencilHTMLAttributes {
    /**
    * 输入框高度
    */
    'height'?: number;
    /**
    * 最大长度
    */
    'limit'?: number;
    'onReady'?: (event: CustomEvent) => void;
    /**
    * placeholder 提示信息
    */
    'placeholder'?: string;
  }

  interface NbToast {
    /**
    * 消失延时时间 0 -> 不自动消失
    */
    'duration': number;
    /**
    * 最大显示宽度
    */
    'maxLength': number;
    /**
    * 显示位置
    */
    'position': 'center';
    /**
    * 显示
    */
    'show': (message?: string) => Promise<any>;
    /**
    * 样式定义
    */
    'theme': string;
    /**
    * 可见开关
    */
    'visible': boolean;
  }
  interface NbToastAttributes extends StencilHTMLAttributes {
    /**
    * 消失延时时间 0 -> 不自动消失
    */
    'duration'?: number;
    /**
    * 最大显示宽度
    */
    'maxLength'?: number;
    /**
    * 显示位置
    */
    'position'?: 'center';
    /**
    * 样式定义
    */
    'theme'?: string;
    /**
    * 可见开关
    */
    'visible'?: boolean;
  }

  interface NbUploadSimpleImage {
    /**
    * 获取预览图片合集
    */
    'getImages': () => Promise<any[]>;
    /**
    * 图片最大尺寸单位（KB）
    */
    'imageSize': number;
    /**
    * 最多能上传几张
    */
    'maxLength': number;
    /**
    * 预览图的尺寸
    */
    'previewSize': number;
    /**
    * 提示上传按钮的文案
    */
    'uploadText': string;
  }
  interface NbUploadSimpleImageAttributes extends StencilHTMLAttributes {
    /**
    * 图片最大尺寸单位（KB）
    */
    'imageSize'?: number;
    /**
    * 最多能上传几张
    */
    'maxLength'?: number;
    /**
    * 触发图片选择改动
    */
    'onChange'?: (event: CustomEvent) => void;
    /**
    * 当发生错误
    */
    'onError'?: (event: CustomEvent) => void;
    /**
    * 预览图的尺寸
    */
    'previewSize'?: number;
    /**
    * 提示上传按钮的文案
    */
    'uploadText'?: string;
  }

  interface NbVscrollNav {
    /**
    * 定义滚动元素 id 的前置与选中的keyword 合并成完整的 id eg：'vscroll-' + 'A' -> id='vscroll-A'
    */
    'idPrefix': string;
    /**
    * 可用于导航滑动的关键字数组
    */
    'keywords': string[];
    /**
    * 滚动列表到指定id位置
    */
    'scrollToId': (id: string) => Promise<any>;
    /**
    * 包裹可滚动的容器，不填写的话默认为window级别滚动
    */
    'scroller'?: string;
  }
  interface NbVscrollNavAttributes extends StencilHTMLAttributes {
    /**
    * 定义滚动元素 id 的前置与选中的keyword 合并成完整的 id eg：'vscroll-' + 'A' -> id='vscroll-A'
    */
    'idPrefix'?: string;
    /**
    * 可用于导航滑动的关键字数组
    */
    'keywords'?: string[];
    /**
    * 触发滚动
    */
    'onScrollTo'?: (event: CustomEvent) => void;
    /**
    * 包裹可滚动的容器，不填写的话默认为window级别滚动
    */
    'scroller'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'NbActionsheet': Components.NbActionsheet;
    'NbAffix': Components.NbAffix;
    'NbBadge': Components.NbBadge;
    'NbCanvasRadar': Components.NbCanvasRadar;
    'NbCodeHighlight': Components.NbCodeHighlight;
    'HtEmoji': Components.HtEmoji;
    'HtRichtextParser': Components.HtRichtextParser;
    'HtStock': Components.HtStock;
    'HtSubject': Components.HtSubject;
    'HtTopic': Components.HtTopic;
    'NbListItem': Components.NbListItem;
    'NbList': Components.NbList;
    'NbMarquee': Components.NbMarquee;
    'NbRefresh': Components.NbRefresh;
    'NbModal': Components.NbModal;
    'NbPagination': Components.NbPagination;
    'NbDatetimePicker': Components.NbDatetimePicker;
    'NbPlayground': Components.NbPlayground;
    'NbPullToDo': Components.NbPullToDo;
    'NbRollPicker': Components.NbRollPicker;
    'NbSearchBar': Components.NbSearchBar;
    'NbStringLimit': Components.NbStringLimit;
    'NbSvgIcon': Components.NbSvgIcon;
    'NbSwitch': Components.NbSwitch;
    'NbTabSlide': Components.NbTabSlide;
    'NbTagInputSet': Components.NbTagInputSet;
    'NbLimitTextarea': Components.NbLimitTextarea;
    'NbToast': Components.NbToast;
    'NbUploadSimpleImage': Components.NbUploadSimpleImage;
    'NbVscrollNav': Components.NbVscrollNav;
  }

  interface StencilIntrinsicElements {
    'nb-actionsheet': Components.NbActionsheetAttributes;
    'nb-affix': Components.NbAffixAttributes;
    'nb-badge': Components.NbBadgeAttributes;
    'nb-canvas-radar': Components.NbCanvasRadarAttributes;
    'nb-code-highlight': Components.NbCodeHighlightAttributes;
    'ht-emoji': Components.HtEmojiAttributes;
    'ht-richtext-parser': Components.HtRichtextParserAttributes;
    'ht-stock': Components.HtStockAttributes;
    'ht-subject': Components.HtSubjectAttributes;
    'ht-topic': Components.HtTopicAttributes;
    'nb-list-item': Components.NbListItemAttributes;
    'nb-list': Components.NbListAttributes;
    'nb-marquee': Components.NbMarqueeAttributes;
    'nb-refresh': Components.NbRefreshAttributes;
    'nb-modal': Components.NbModalAttributes;
    'nb-pagination': Components.NbPaginationAttributes;
    'nb-datetime-picker': Components.NbDatetimePickerAttributes;
    'nb-playground': Components.NbPlaygroundAttributes;
    'nb-pull-to-do': Components.NbPullToDoAttributes;
    'nb-roll-picker': Components.NbRollPickerAttributes;
    'nb-search-bar': Components.NbSearchBarAttributes;
    'nb-string-limit': Components.NbStringLimitAttributes;
    'nb-svg-icon': Components.NbSvgIconAttributes;
    'nb-switch': Components.NbSwitchAttributes;
    'nb-tab-slide': Components.NbTabSlideAttributes;
    'nb-tag-input-set': Components.NbTagInputSetAttributes;
    'nb-limit-textarea': Components.NbLimitTextareaAttributes;
    'nb-toast': Components.NbToastAttributes;
    'nb-upload-simple-image': Components.NbUploadSimpleImageAttributes;
    'nb-vscroll-nav': Components.NbVscrollNavAttributes;
  }


  interface HTMLNbActionsheetElement extends Components.NbActionsheet, HTMLStencilElement {}
  var HTMLNbActionsheetElement: {
    prototype: HTMLNbActionsheetElement;
    new (): HTMLNbActionsheetElement;
  };

  interface HTMLNbAffixElement extends Components.NbAffix, HTMLStencilElement {}
  var HTMLNbAffixElement: {
    prototype: HTMLNbAffixElement;
    new (): HTMLNbAffixElement;
  };

  interface HTMLNbBadgeElement extends Components.NbBadge, HTMLStencilElement {}
  var HTMLNbBadgeElement: {
    prototype: HTMLNbBadgeElement;
    new (): HTMLNbBadgeElement;
  };

  interface HTMLNbCanvasRadarElement extends Components.NbCanvasRadar, HTMLStencilElement {}
  var HTMLNbCanvasRadarElement: {
    prototype: HTMLNbCanvasRadarElement;
    new (): HTMLNbCanvasRadarElement;
  };

  interface HTMLNbCodeHighlightElement extends Components.NbCodeHighlight, HTMLStencilElement {}
  var HTMLNbCodeHighlightElement: {
    prototype: HTMLNbCodeHighlightElement;
    new (): HTMLNbCodeHighlightElement;
  };

  interface HTMLHtEmojiElement extends Components.HtEmoji, HTMLStencilElement {}
  var HTMLHtEmojiElement: {
    prototype: HTMLHtEmojiElement;
    new (): HTMLHtEmojiElement;
  };

  interface HTMLHtRichtextParserElement extends Components.HtRichtextParser, HTMLStencilElement {}
  var HTMLHtRichtextParserElement: {
    prototype: HTMLHtRichtextParserElement;
    new (): HTMLHtRichtextParserElement;
  };

  interface HTMLHtStockElement extends Components.HtStock, HTMLStencilElement {}
  var HTMLHtStockElement: {
    prototype: HTMLHtStockElement;
    new (): HTMLHtStockElement;
  };

  interface HTMLHtSubjectElement extends Components.HtSubject, HTMLStencilElement {}
  var HTMLHtSubjectElement: {
    prototype: HTMLHtSubjectElement;
    new (): HTMLHtSubjectElement;
  };

  interface HTMLHtTopicElement extends Components.HtTopic, HTMLStencilElement {}
  var HTMLHtTopicElement: {
    prototype: HTMLHtTopicElement;
    new (): HTMLHtTopicElement;
  };

  interface HTMLNbListItemElement extends Components.NbListItem, HTMLStencilElement {}
  var HTMLNbListItemElement: {
    prototype: HTMLNbListItemElement;
    new (): HTMLNbListItemElement;
  };

  interface HTMLNbListElement extends Components.NbList, HTMLStencilElement {}
  var HTMLNbListElement: {
    prototype: HTMLNbListElement;
    new (): HTMLNbListElement;
  };

  interface HTMLNbMarqueeElement extends Components.NbMarquee, HTMLStencilElement {}
  var HTMLNbMarqueeElement: {
    prototype: HTMLNbMarqueeElement;
    new (): HTMLNbMarqueeElement;
  };

  interface HTMLNbRefreshElement extends Components.NbRefresh, HTMLStencilElement {}
  var HTMLNbRefreshElement: {
    prototype: HTMLNbRefreshElement;
    new (): HTMLNbRefreshElement;
  };

  interface HTMLNbModalElement extends Components.NbModal, HTMLStencilElement {}
  var HTMLNbModalElement: {
    prototype: HTMLNbModalElement;
    new (): HTMLNbModalElement;
  };

  interface HTMLNbPaginationElement extends Components.NbPagination, HTMLStencilElement {}
  var HTMLNbPaginationElement: {
    prototype: HTMLNbPaginationElement;
    new (): HTMLNbPaginationElement;
  };

  interface HTMLNbDatetimePickerElement extends Components.NbDatetimePicker, HTMLStencilElement {}
  var HTMLNbDatetimePickerElement: {
    prototype: HTMLNbDatetimePickerElement;
    new (): HTMLNbDatetimePickerElement;
  };

  interface HTMLNbPlaygroundElement extends Components.NbPlayground, HTMLStencilElement {}
  var HTMLNbPlaygroundElement: {
    prototype: HTMLNbPlaygroundElement;
    new (): HTMLNbPlaygroundElement;
  };

  interface HTMLNbPullToDoElement extends Components.NbPullToDo, HTMLStencilElement {}
  var HTMLNbPullToDoElement: {
    prototype: HTMLNbPullToDoElement;
    new (): HTMLNbPullToDoElement;
  };

  interface HTMLNbRollPickerElement extends Components.NbRollPicker, HTMLStencilElement {}
  var HTMLNbRollPickerElement: {
    prototype: HTMLNbRollPickerElement;
    new (): HTMLNbRollPickerElement;
  };

  interface HTMLNbSearchBarElement extends Components.NbSearchBar, HTMLStencilElement {}
  var HTMLNbSearchBarElement: {
    prototype: HTMLNbSearchBarElement;
    new (): HTMLNbSearchBarElement;
  };

  interface HTMLNbStringLimitElement extends Components.NbStringLimit, HTMLStencilElement {}
  var HTMLNbStringLimitElement: {
    prototype: HTMLNbStringLimitElement;
    new (): HTMLNbStringLimitElement;
  };

  interface HTMLNbSvgIconElement extends Components.NbSvgIcon, HTMLStencilElement {}
  var HTMLNbSvgIconElement: {
    prototype: HTMLNbSvgIconElement;
    new (): HTMLNbSvgIconElement;
  };

  interface HTMLNbSwitchElement extends Components.NbSwitch, HTMLStencilElement {}
  var HTMLNbSwitchElement: {
    prototype: HTMLNbSwitchElement;
    new (): HTMLNbSwitchElement;
  };

  interface HTMLNbTabSlideElement extends Components.NbTabSlide, HTMLStencilElement {}
  var HTMLNbTabSlideElement: {
    prototype: HTMLNbTabSlideElement;
    new (): HTMLNbTabSlideElement;
  };

  interface HTMLNbTagInputSetElement extends Components.NbTagInputSet, HTMLStencilElement {}
  var HTMLNbTagInputSetElement: {
    prototype: HTMLNbTagInputSetElement;
    new (): HTMLNbTagInputSetElement;
  };

  interface HTMLNbLimitTextareaElement extends Components.NbLimitTextarea, HTMLStencilElement {}
  var HTMLNbLimitTextareaElement: {
    prototype: HTMLNbLimitTextareaElement;
    new (): HTMLNbLimitTextareaElement;
  };

  interface HTMLNbToastElement extends Components.NbToast, HTMLStencilElement {}
  var HTMLNbToastElement: {
    prototype: HTMLNbToastElement;
    new (): HTMLNbToastElement;
  };

  interface HTMLNbUploadSimpleImageElement extends Components.NbUploadSimpleImage, HTMLStencilElement {}
  var HTMLNbUploadSimpleImageElement: {
    prototype: HTMLNbUploadSimpleImageElement;
    new (): HTMLNbUploadSimpleImageElement;
  };

  interface HTMLNbVscrollNavElement extends Components.NbVscrollNav, HTMLStencilElement {}
  var HTMLNbVscrollNavElement: {
    prototype: HTMLNbVscrollNavElement;
    new (): HTMLNbVscrollNavElement;
  };

  interface HTMLElementTagNameMap {
    'nb-actionsheet': HTMLNbActionsheetElement
    'nb-affix': HTMLNbAffixElement
    'nb-badge': HTMLNbBadgeElement
    'nb-canvas-radar': HTMLNbCanvasRadarElement
    'nb-code-highlight': HTMLNbCodeHighlightElement
    'ht-emoji': HTMLHtEmojiElement
    'ht-richtext-parser': HTMLHtRichtextParserElement
    'ht-stock': HTMLHtStockElement
    'ht-subject': HTMLHtSubjectElement
    'ht-topic': HTMLHtTopicElement
    'nb-list-item': HTMLNbListItemElement
    'nb-list': HTMLNbListElement
    'nb-marquee': HTMLNbMarqueeElement
    'nb-refresh': HTMLNbRefreshElement
    'nb-modal': HTMLNbModalElement
    'nb-pagination': HTMLNbPaginationElement
    'nb-datetime-picker': HTMLNbDatetimePickerElement
    'nb-playground': HTMLNbPlaygroundElement
    'nb-pull-to-do': HTMLNbPullToDoElement
    'nb-roll-picker': HTMLNbRollPickerElement
    'nb-search-bar': HTMLNbSearchBarElement
    'nb-string-limit': HTMLNbStringLimitElement
    'nb-svg-icon': HTMLNbSvgIconElement
    'nb-switch': HTMLNbSwitchElement
    'nb-tab-slide': HTMLNbTabSlideElement
    'nb-tag-input-set': HTMLNbTagInputSetElement
    'nb-limit-textarea': HTMLNbLimitTextareaElement
    'nb-toast': HTMLNbToastElement
    'nb-upload-simple-image': HTMLNbUploadSimpleImageElement
    'nb-vscroll-nav': HTMLNbVscrollNavElement
  }

  interface ElementTagNameMap {
    'nb-actionsheet': HTMLNbActionsheetElement;
    'nb-affix': HTMLNbAffixElement;
    'nb-badge': HTMLNbBadgeElement;
    'nb-canvas-radar': HTMLNbCanvasRadarElement;
    'nb-code-highlight': HTMLNbCodeHighlightElement;
    'ht-emoji': HTMLHtEmojiElement;
    'ht-richtext-parser': HTMLHtRichtextParserElement;
    'ht-stock': HTMLHtStockElement;
    'ht-subject': HTMLHtSubjectElement;
    'ht-topic': HTMLHtTopicElement;
    'nb-list-item': HTMLNbListItemElement;
    'nb-list': HTMLNbListElement;
    'nb-marquee': HTMLNbMarqueeElement;
    'nb-refresh': HTMLNbRefreshElement;
    'nb-modal': HTMLNbModalElement;
    'nb-pagination': HTMLNbPaginationElement;
    'nb-datetime-picker': HTMLNbDatetimePickerElement;
    'nb-playground': HTMLNbPlaygroundElement;
    'nb-pull-to-do': HTMLNbPullToDoElement;
    'nb-roll-picker': HTMLNbRollPickerElement;
    'nb-search-bar': HTMLNbSearchBarElement;
    'nb-string-limit': HTMLNbStringLimitElement;
    'nb-svg-icon': HTMLNbSvgIconElement;
    'nb-switch': HTMLNbSwitchElement;
    'nb-tab-slide': HTMLNbTabSlideElement;
    'nb-tag-input-set': HTMLNbTagInputSetElement;
    'nb-limit-textarea': HTMLNbLimitTextareaElement;
    'nb-toast': HTMLNbToastElement;
    'nb-upload-simple-image': HTMLNbUploadSimpleImageElement;
    'nb-vscroll-nav': HTMLNbVscrollNavElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
