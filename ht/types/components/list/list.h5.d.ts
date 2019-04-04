import '../../stencil.core';
/**
 * 列表区块
 */
export declare class List {
    /**
     * List之间的间距
     */
    topSpace?: number;
    /**
     * 像素转为rem
     */
    px2rem(px: any): number;
    render(): JSX.Element[];
}
