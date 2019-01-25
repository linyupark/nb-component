import { Component, Prop } from '@stencil/core';
import Prism from 'prismjs';

@Component({
  tag: 'nb-code-highlight',
  styleUrl: '../../../node_modules/prismjs/themes/prism.css'
})
export class CodeHighlight {

  /**
   * 代码内容
   */
  @Prop() code: string = '';

  /**
   * 代码类型
   */
  @Prop() lang: string = 'html';

  componentDidLoad() {
    console.log();
  }

  render() {
    return <pre>
<code class="language-html" innerHTML={Prism.highlight(this.code, Prism.languages[this.lang], this.lang)}></code>
    </pre>
  }

}