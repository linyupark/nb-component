import '../../../stencil.core';
export declare class Subject {
    /**
     * 详情对应id
     * @type {String}
     */
    detailId: string;
    /**
     * 头部标题
     * @type {String}
     */
    headTitle: string;
    /**
     * 摘要
     * @type {String}
     */
    summary: string;
    /**
     * 对应跳转地址
     */
    readonly link: string;
    render(): JSX.Element[];
}
