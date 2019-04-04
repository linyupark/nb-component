import '../../../stencil.core';
export declare class RichtextParser {
    $el: HTMLElement;
    /**
     * 调试模式
     */
    debug?: false;
    componentDidLoad(): void;
    /**
     * 将标签内的内容进行正则筛选出符合模板规则的内容
     * @return {String} 过滤后的html
     */
    parseReg(str: any): void;
    render(): JSX.Element;
}
