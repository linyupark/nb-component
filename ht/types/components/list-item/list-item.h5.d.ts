import '../../stencil.core';
/**
 * 区块项目
 */
export declare class ListItem {
    /**
     * 下边框, 0则不显示
     */
    border: number;
    /**
     * 线条颜色
     */
    color: string;
    /**
     * 短线条方向
     */
    short?: 'left' | 'right' | 'both';
    /**
     * 设置单元高度
     */
    height?: number;
    /**
     * 设置横线左右间距
     */
    sideSpace?: number;
    /**
     * 像素转为rem
     */
    px2rem(px: any): number | "auto";
    /**
     * 是否要某一边缩进
     * @param side 方向
     */
    isShort(side: any): boolean;
    render(): JSX.Element;
}
