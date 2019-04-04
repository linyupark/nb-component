import {
  Component,
  Element,
  Prop,
} from '@stencil/core';

@Component({
  tag: 'ht-richtext-parser',
  shadow: true
})

/**
 * 解析器 模板语法 -> html标准组件标签
 */
export class RichtextParser {

  @Element() $el: HTMLElement;
	
	/**
	 * 调试模式
	 */
  @Prop() debug ?: false;

  componentDidLoad() {
    this.parseReg(this.$el.innerHTML);
  }

  /**
   * 将标签内的内容进行正则筛选出符合模板规则的内容
   * @return {String} 过滤后的html
   */
  parseReg(str) {
    let tags = str.match(/\{\[([^\]])+\]\}/g);
    let outputHTML = str;
    this.debug && console.log(tags);
    (tags || []).map(tag => {
    	// 根据第一个参数类型来决定后面参数的key值
    	let params = tag.match(/{\[([^\]]+)\]}/)[1].split('|');
    	// 表情包
    	if (params[0] === 'emoji') {
    		outputHTML = outputHTML.replace(tag, `<ht-emoji group="${params[1]}" type="${params[2]}"></ht-emoji>`);
    	}
      // 专题
      if (params[0] === 'subject') {
        outputHTML = outputHTML.replace(tag, `<ht-subject detail-id="${params[1]}" head-title="${params[2]}" summary="${params[3]||''}"></ht-subject>`);
      }
      // 话题
      if (params[0] === 'topic') {
        outputHTML = outputHTML.replace(tag, `<ht-topic detail-id="${params[1]}" head-title="${params[2]}"></ht-topic>`);
      }
      // 股票
      if (params[0] === 'stock') {
        outputHTML = outputHTML.replace(tag, `<ht-stock detail-id="${params[1]}" head-title="${params[2]}"></ht-stock>`);
      }
    });
    this.$el.innerHTML = outputHTML;
    this.debug && console.log(outputHTML);
  }

  render() {
    return (
      <div class="richtext-parser">
				<slot />
			</div>
    )
  }

}
