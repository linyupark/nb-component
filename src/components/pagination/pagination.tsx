import { Component, Prop, Event, EventEmitter, Watch } from '@stencil/core';
import Icon from './svg-icon';

/**
 * 分页组件
 */
@Component({
  tag: 'nb-pagination',
  styleUrl: 'pagination.styl'
})
export class Pagination {

  /**
   * 当前页发生变化
   */
  @Event() change: EventEmitter;

  /**
   * 当前页面
   */
  @Prop({ mutable: true }) current: number = 1;
  
  /**
   * 观察页数变化
   * @param to 前往页面
   * @param from 来自页面
   */
  @Watch('current') onCurrentPageChange(to, from) {
    this.change.emit({
      to, from
    });
  }

  /**
   * 每页条数
   */
  @Prop() pagesize: number = 10;

  /**
   * 总数据条数
   */
  @Prop() total: number = 0;

  /**
   * 当只有一页的时候自动隐藏
   */
  @Prop() autoHide: boolean = true;

  /**
   * 当分页太多时候限制前后显示页数
   */
  @Prop() limitPage: 4 | 6 | 8 = 4;

  /**
   * 计算出一共有几页
   */
  get totalPages() {
    return Math.ceil(this.total / this.pagesize);
  }

  /**
   * 是否上一页可用
   */
  get hasPrev() {
    return this.current != 1;
  }

  /**
   * 是否下一页可用
   */
  get hasNext() {
    return this.totalPages > this.current;
  }

  /**
   * 判断是否可以显示分页
   */
  get showPagination() {
    return this.totalPages > 1 || !this.autoHide;
  }

  /**
   * 数字页数列表（实际中间展示的页码）
   */
  get numberPageList() {
    let list = [];
    // 左侧页起始未知
    const leftOffset = this.current - this.limitPage / 2;
    const leftStartAt = leftOffset < 1 ? 1 : leftOffset;
    // 右侧
    const rightOffset = this.current + this.limitPage / 2;
    const rightEndAt =
      rightOffset > this.totalPages ? this.totalPages : rightOffset;
    for (let n = leftStartAt; n <= rightEndAt; n++) {
      list.push(n);
    }
    // 添加第一页
    const prefixSpan = list[0] - 1;
    if (prefixSpan >= 2) {
      list.unshift('<<');
    }
    if (prefixSpan >= 1) {
      list.unshift(1);
    }
    // 添加末页
    const suffixSpan = this.totalPages - list.slice(-1)[0];
    if (suffixSpan >= 2) {
      list.push('>>');
    }
    if (suffixSpan >= 1) {
      list.push(this.totalPages);
    }
    return list;
  }

  render() {
    return [
      this.showPagination && <div class="pagination">
        <ul>
          <li
            title="上一页"
            class={this.hasPrev ? '' : 'disabled'}
            onClick={() => this.hasPrev && this.current--}
          >
            <a>
              <i>{Icon.prev}</i>
            </a>
          </li>

          {this.numberPageList.map(n => {
            if (n === '<<')
              return (
                <li onClick={() => this.current -= this.limitPage / 2}>
                  <span class="ellipsis">•••</span>
                </li>
              );
            else if (n === '>>')
              return (
                <li onClick={() => this.current += this.limitPage / 2}>
                  <span class="ellipsis">•••</span>
                </li>
              );
            else
              return (
                <li title={`第${n}页`} onClick={() => (this.current = n)}>
                  <a class={this.current == n ? 'active' : ''}>{n}</a>
                </li>
              );
          })}

          <li
            title="下一页"
            class={this.hasNext ? '' : 'disabled'}
            onClick={() => this.hasNext && this.current++}
          >
            <a>
              <i>{Icon.next}</i>
            </a>
          </li>
        </ul>
      </div>
    ];
  }
}
