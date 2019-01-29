import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
/**
 * 固钉组件
 * @description 根据滑动来切换固定跟原始状态的组件
 */
export declare class Affix {
    /**
     * 当固定状态发生变化对外发送事件
     */
    change: EventEmitter;
    /**
     * 观察固定状态变化
     * @param isFixed
     */
    onCurrentPageChange(isFixed: any): void;
    /**
     * 组件自身
     */
    el: HTMLElement;
    /**
     * 距离偏移量后触发（正数举例上沿，负数下沿）
     */
    offset: number;
    /**
     * 计算举例的参照dom
     */
    toTarget: any;
    /**
     * 是否处于固定状态
     */
    fixed: boolean;
    /**
     * 根据设置来切换固定状态
     */
    handleFix(): void;
    componentDidLoad(): void;
    componentDidUnload(): Promise<void>;
    render(): JSX.Element;
}
