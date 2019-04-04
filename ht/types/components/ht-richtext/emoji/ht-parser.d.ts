import '../../../stencil.core';
export declare class Emoji {
    /**
     * 表情名称
     * @type {String}
     */
    type: string;
    /**
     * 表情分组
     * @type {String}
     */
    group: string;
    /**
     * 转换成最终可显示的src地址
     * @return {String}
     */
    readonly transform: any;
    render(): JSX.Element;
}
