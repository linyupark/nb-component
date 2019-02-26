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
    'headTitle': string;
    /**
    * 是否需要遮罩
    */
    'mask': boolean;
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
    * 是否需要遮罩
    */
    'mask'?: boolean;
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
    * 短线条方向
    */
    'short'?: 'left' | 'right' | 'both';
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
    * 短线条方向
    */
    'short'?: 'left' | 'right' | 'both';
  }

  interface NbList {
    /**
    * List之间的间距
    */
    'topSpace': 's' | 'm' | 'l' | 'none';
  }
  interface NbListAttributes extends StencilHTMLAttributes {
    /**
    * List之间的间距
    */
    'topSpace'?: 's' | 'm' | 'l' | 'none';
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
    'done': () => void;
    /**
    * 启用功能
    */
    'enable': boolean;
    /**
    * 当浏览器是返回状态是否尝试回到上一次的位置
    */
    'positionSave': boolean;
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
    * 启用功能
    */
    'enable'?: boolean;
    /**
    * 当上拉触发加载更多
    */
    'onMore'?: (event: CustomEvent) => void;
    /**
    * 当下拉成立触发事件
    */
    'onRefresh'?: (event: CustomEvent) => void;
    /**
    * 当浏览器是返回状态是否尝试回到上一次的位置
    */
    'positionSave'?: boolean;
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
    * 当状态发生改变
    */
    'onChange'?: (event: CustomEvent) => void;
  }
}

declare global {
  interface StencilElementInterfaces {
    'NbActionsheet': Components.NbActionsheet;
    'NbAffix': Components.NbAffix;
    'NbBadge': Components.NbBadge;
    'NbCanvasRadar': Components.NbCanvasRadar;
    'NbListItem': Components.NbListItem;
    'NbList': Components.NbList;
    'NbPagination': Components.NbPagination;
    'NbPullToDo': Components.NbPullToDo;
    'NbRollPicker': Components.NbRollPicker;
    'NbSvgIcon': Components.NbSvgIcon;
    'NbSwitch': Components.NbSwitch;
  }

  interface StencilIntrinsicElements {
    'nb-actionsheet': Components.NbActionsheetAttributes;
    'nb-affix': Components.NbAffixAttributes;
    'nb-badge': Components.NbBadgeAttributes;
    'nb-canvas-radar': Components.NbCanvasRadarAttributes;
    'nb-list-item': Components.NbListItemAttributes;
    'nb-list': Components.NbListAttributes;
    'nb-pagination': Components.NbPaginationAttributes;
    'nb-pull-to-do': Components.NbPullToDoAttributes;
    'nb-roll-picker': Components.NbRollPickerAttributes;
    'nb-svg-icon': Components.NbSvgIconAttributes;
    'nb-switch': Components.NbSwitchAttributes;
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

  interface HTMLNbPaginationElement extends Components.NbPagination, HTMLStencilElement {}
  var HTMLNbPaginationElement: {
    prototype: HTMLNbPaginationElement;
    new (): HTMLNbPaginationElement;
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

  interface HTMLElementTagNameMap {
    'nb-actionsheet': HTMLNbActionsheetElement
    'nb-affix': HTMLNbAffixElement
    'nb-badge': HTMLNbBadgeElement
    'nb-canvas-radar': HTMLNbCanvasRadarElement
    'nb-list-item': HTMLNbListItemElement
    'nb-list': HTMLNbListElement
    'nb-pagination': HTMLNbPaginationElement
    'nb-pull-to-do': HTMLNbPullToDoElement
    'nb-roll-picker': HTMLNbRollPickerElement
    'nb-svg-icon': HTMLNbSvgIconElement
    'nb-switch': HTMLNbSwitchElement
  }

  interface ElementTagNameMap {
    'nb-actionsheet': HTMLNbActionsheetElement;
    'nb-affix': HTMLNbAffixElement;
    'nb-badge': HTMLNbBadgeElement;
    'nb-canvas-radar': HTMLNbCanvasRadarElement;
    'nb-list-item': HTMLNbListItemElement;
    'nb-list': HTMLNbListElement;
    'nb-pagination': HTMLNbPaginationElement;
    'nb-pull-to-do': HTMLNbPullToDoElement;
    'nb-roll-picker': HTMLNbRollPickerElement;
    'nb-svg-icon': HTMLNbSvgIconElement;
    'nb-switch': HTMLNbSwitchElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
