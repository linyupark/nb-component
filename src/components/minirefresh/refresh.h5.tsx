import { Component, Prop, Element, Method, Event, EventEmitter } from '@stencil/core';
import MiniRefreshTools from 'minirefresh';

/**
 * miniRefresh封装，API地址：
 * http://www.minirefresh.com/minirefresh-doc/api/api_minirefresh.html
 */

/**
 * @slot 滚动框的具体内容 
 */
@Component({
  tag: 'nb-refresh',
  styleUrl: 'refresh.h5.styl',
  shadow: true
})
export class Refresh {
	
	/**
	 * 根元素
	 */
  @Element() el: HTMLElement;

	/**
	 * 禁用下拉刷新
	 */
  @Prop() lockRefresh: boolean = false;
	
	/**
	 * 禁用上拉加载更多
	 */
  @Prop() lockScrollLoad: boolean = false;
	
	/**
	 * 自动执行一次上拉加载
	 */
  @Prop() autoScrollLoad: boolean = false;

  /**
   * 上下拉动的阀值
   */
	@Prop() offset: number = 60;
	
	/**
	 * 下拉刷新文案方面的配置
	 * 参数	参数类型	默认值	说明
		isWrapCssTranslate	Boolean	false	是否下拉时wrap（下拉区域不是内容区域，与scroll区分开）会跟随css translate
		contentdown	String	'下拉刷新'	下拉刷新默认提示
		contentover	String	'释放刷新'	在超过阈值后的提示
		contentrefresh	String	'加载中...'	正在刷新中的提示
		contentsuccess	String	'刷新成功'	刷新成功后，结束前，成功状态的提示
		contenterror	String	'刷新失败'	刷新成功后，结束前，失败状态的提示
	 */
	@Prop() refreshOptions: object = {};

	/**
	 * 下拉刷新文案方面的配置
	 * 参数	参数类型	默认值	说明
		contentdown	String	'上拉显示更多'	上拉加载默认提示，一般默认情况会隐藏用不到它
		contentrefresh	String	'加载中...'	上拉加载时的提示
		contentnomore	String	'没有更多数据了'	没有更多数据时的提示
		toTop	Object	默认配置	滚动到顶部的相关配置，图片的话请在css中修改
		toTop.isEnable	Boolean	true	是否开启自动滚动到顶部
		toTop.duration	Number	300	滚动到顶部的过渡时间
		toTop.offset	Number	800	阈值，滚动超过多少距离后才会显示滚动到顶部按钮
	 */
	@Prop() scrollLoadOptions: object = {};
	
	/**
	 * 获取 refresh 实例化对象
	 */
  @Method()
  async getRefresh() {
    return this.MiniRefresh;
  }
	
	/**
	 * refresh 实例化对象
	 */
  private MiniRefresh: any;
	
	/**
	 * 下拉刷新事件
	 */
  @Event() refresh: EventEmitter;

  /**
   * 上拉加载事件
   */
  @Event() scrollLoad: EventEmitter;
	
  componentDidLoad() {
  	// 获取容器
    const container = this.el.shadowRoot.querySelector('.minirefresh-wrap');
    // 定义皮肤
    const MiniRefresh = MiniRefreshTools.theme.defaults;
    // 刷新配置
   	const refreshOptions = {
			isWrapCssTranslate: false,
			contentdown: '下拉刷新',
			contentover: '释放刷新',
			contentrefresh: '加载中...',
			contentsuccess: '刷新成功',
			contenterror: '刷新失败',
			...this.refreshOptions
   	};
   	// 上拉配置
   	const scrollLoadOptions = {
   		contentdown: '上拉显示更多',
			contentrefresh: '加载中...',
			contentnomore: '没有更多了',
			toTop: {
				isEnable: false,
				duration: 300,
				offset: 800
			},
			...this.scrollLoadOptions
   	};
    // 实例化
    this.MiniRefresh = new MiniRefresh({
      container,
      down: {
      	isLock: this.lockRefresh,
      	offset: this.offset,
        callback: async () => {
        	const refresh = await this.getRefresh();
        	this.refresh.emit({
        		finish: refresh.endDownLoading.bind(refresh)
        	});
        },
        ...refreshOptions
      },
      up: {
      	isLock: this.lockScrollLoad,
      	isAuto: this.autoScrollLoad,
      	offset: this.offset,
      	callback: async () => {
      		const refresh = await this.getRefresh();
        	this.scrollLoad.emit({
        		noMore: refresh.endUpLoading.bind(refresh)
        	});
      	},
      	...scrollLoadOptions
      }
    });
  }

  render() {
    return (
      <div class="minirefresh-wrap">
				<div class="minirefresh-scroll">
					<slot />
				</div>
			</div>
    )
  }

}
