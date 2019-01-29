import '../../stencil.core';
/**
 * 徽标数
 */
export declare class Badge {
    /**
     * 展示数字，0为隐藏
     */
    count: number;
    /**
     * count的封顶数值超出则显示 maxCount+
     */
    maxCount: number;
    /**
     * 不展示数字，显示点
     */
    dot: boolean;
    /**
     * 当count为0的时候也显示
     */
    showZero: boolean;
    /**
     * 徽标底色
     */
    bgColor: string;
    /**
     * 徽标 classList
     */
    readonly dotCountClassNames: string;
    /**
     * 实际展示的数字
     */
    readonly displayCount: string | number;
    render(): JSX.Element;
}
