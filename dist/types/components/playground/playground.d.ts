import '../../stencil.core';
export declare class Playground {
    el: HTMLElement;
    /**
     * 内嵌的展示组件tag名称
     */
    tag: string;
    /**
     * 开启h5模式
     */
    h5: boolean;
    /**
     * 需要演示的组件列表
     */
    demoList: {
        key: string;
        text: string;
        mobile: boolean;
        tag: string;
    }[];
    /**
     * 当前展示的demo
     */
    demo: any;
    /**
     * 从hash来得到需要展示的组件
     */
    componentWillLoad(): void;
    render(): JSX.Element;
}
