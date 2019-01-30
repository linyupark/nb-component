import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
/**
 * 下滑刷新
 */
export declare class PullToRefresh {
    /**
     * 当下拉成立触发事件
     */
    refresh: EventEmitter;
    /**
     * 当上拉触发加载更多
     */
    more: EventEmitter;
    /**
     * 组件自身
     */
    el: HTMLElement;
    /**
     * 禁用哪项功能 refresh: 下拉刷新 | more: 加载更多
     */
    disable?: 'refresh' | 'more';
    /**
     * 实际滚动显示区块选择器
     */
    wrapperSelector: string;
    /**
     * 展示内容选择器
     */
    contentSelector: string;
    /**
     * 下拉展示的提示
     */
    refreshHTML: string;
    /**
     * 上拉加载更多
     */
    moreHTML: string;
    /**
     * 加载中的内容
     */
    loadingHTML: string;
    /**
     * 拉动限制高度
     */
    dampHeight: number;
    /**
     * 当浏览器是返回状态是否尝试回到上一次的位置
     */
    positionSave: boolean;
    /**
     * 已经拉动的限制高度(正数为顶部，负数为底部)
     */
    dampingLen: number;
    /**
     * 加载状态
     */
    loading: boolean;
    /**
     * 加载完毕
     */
    done(): void;
    /**
     * 实际滚动显示区块
     */
    $wrapper: HTMLElement;
    /**
     * 展示内容
     */
    $content: HTMLElement;
    /**
     * touch 起点
     */
    startPageY: number;
    /**
     * touch 当前移动位置
     */
    movePageY: number;
    /**
     * 开始阻尼位置记录
     */
    startDampLen?: number;
    /**
     * 计算拉动距离
     */
    readonly pullLength: number;
    /**
     * 获取当前滚动位置
     * @return {Number}
     */
    protected getScrollTop(): number;
    /**
     * 滚动区域最多能到达的scrollTop值，判断是否到底部
     */
    protected getWrapperScrollTop(): number;
    /**
     * 记录阻尼开始位置
     */
    protected recordStartDampLen(): void;
    /**
     * 触摸开始操作
     * @param ev
     */
    protected handleTouchStart(ev: any): void;
    /**
     * 触摸滑动操作
     * @param ev
     */
    protected handleTouchMove(ev: any): void;
    protected handleTouchEnd(): void;
    /**
     * 对 touch动作监听绑定跟解绑
     * @param {Boolean} bind 绑定还是解绑？
     */
    protected bindTouchScroll(bind?: boolean): void;
    componentDidLoad(): void;
    render(): JSX.Element;
}
