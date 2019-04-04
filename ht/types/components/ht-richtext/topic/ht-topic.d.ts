import '../../../stencil.core';
export declare class Topic {
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
     * 对应跳转地址
     */
    readonly link: string;
    render(): JSX.Element[];
}
