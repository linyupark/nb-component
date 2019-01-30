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
    render(): JSX.Element;
}
