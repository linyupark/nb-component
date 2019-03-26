import { Component, Prop, State } from '@stencil/core';


/**
 * 跑马灯H5
 */
@Component({
  tag: 'nb-marquee',
  styleUrl: 'marquee.h5.styl',
  shadow: true,
})
export class Marquee {

	/**
	 * 跑动计时器
	 */
	timer: any;

	/**
	 * 跑马灯预设样式
	 */
	@Prop() styleId: 'tow-row-66h' = 'tow-row-66h';

	/**
	 * 跑动内容列表
	 */
	@Prop({ mutable: true }) items?: {
		key: number,
		text: string,
		time?: string,
		link: string
	}[] = [];

	/**
	 * 多少间隔动一次
	 */
	@Prop() speed: number = 3000;

	/**
	 * 上移样式名
	 */
	@State() rollupClassName: string = '';

	/**
	 * 滚动操作
	 */
	rollup = () => {
		// 首先将第一条数据复制到底部
		this.items.push(this.items.slice(0, 1)[0]);
		// 给第一个item加上消失的class
		this.rollupClassName = 'fadeOut';
		// 在动画结束后干掉
		setTimeout(() => {
			this.items.splice(0, 1);
			this.rollupClassName = '';
		}, 180);
	}

	render() {
		return <div class={`marquee ${this.styleId}`}>
			{this.items.map((item, i) => {
				return <a href={item.link} class={`item ${i === 0 ? this.rollupClassName : ''} l-${this.items.length}`}>
					{this.styleId === 'tow-row-66h' && [<div class="text">
						{item.text}
					</div>, <div class="time">{item.time}</div>]}
				</a>
			})}
		</div>
	}

	componentDidLoad() {
		if (this.styleId == 'tow-row-66h' && this.items.length > 2) {
			this.timer = setInterval(this.rollup, this.speed);
		}
	}

	componentDidUnload() {
		clearInterval(this.timer);
	}
}