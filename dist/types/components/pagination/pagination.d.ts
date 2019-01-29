import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
/**
 * 分页组件
 */
export declare class Pagination {
    /**
     * 当前页发生变化
     */
    change: EventEmitter;
    /**
     * 当前页面
     */
    current: number;
    /**
     * 观察页数变化
     * @param to 前往页面
     * @param from 来自页面
     */
    onCurrentPageChange(to: any, from: any): void;
    /**
     * 每页条数
     */
    pagesize: number;
    /**
     * 总数据条数
     */
    total: number;
    /**
     * 当只有一页的时候自动隐藏
     */
    autoHide: boolean;
    /**
     * 当分页太多时候限制前后显示页数
     */
    limitPage: 4 | 6 | 8;
    /**
     * 计算出一共有几页
     */
    readonly totalPages: number;
    /**
     * 是否上一页可用
     */
    readonly hasPrev: boolean;
    /**
     * 是否下一页可用
     */
    readonly hasNext: boolean;
    /**
     * 判断是否可以显示分页
     */
    readonly showPagination: boolean;
    /**
     * 数字页数列表（实际中间展示的页码）
     */
    readonly numberPageList: any[];
    render(): JSX.Element[];
}
