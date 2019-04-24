import { Component, Prop, State, Event, EventEmitter, Method } from '@stencil/core';
// 引入读取图片exif，处理一些自己颠倒的照片
import EXIF from './exif';

// 图标
const ICONS = {
  qingchu: `<svg class="icon icon-qingchu" viewBox="0 0 1024 1024"><path d="M512 896C299.936 896 128 724.064 128 512S299.936 128 512 128s384 171.936 384 384-171.936 384-384 384z m45.248-384l90.528-90.496a32 32 0 0 0-45.28-45.28L512 466.752l-90.496-90.528a32 32 0 0 0-45.28 45.28L466.752 512l-90.528 90.496a32 32 0 0 0 45.28 45.28L512 557.248l90.496 90.528a32 32 0 0 0 45.28-45.28L557.248 512z"  ></path></svg>`
};

/**
 * 简单的 H5实现图片选择上传，可设置最大上传几张
 */
@Component({
  tag: 'nb-upload-simple-image',
  styleUrl: 'simple-image.h5.styl',
  shadow: true
})
export class UploadSimpleImage {
  /**
   * 最多能上传几张
   */
  @Prop() maxLength: number = 4;

  /**
   * 图片最大尺寸单位（KB）
   */
  @Prop() imageSize: number = 10240;

  /**
   * 预览图的尺寸
   */
  @Prop() previewSize: number = 175;

  /**
   * 提示上传按钮的文案
   */
  @Prop() uploadText: string = '上传截图';

  /**
   * 已经选中的图片
   */
  @State() previewImages: any[] = [];

  /**
   * 各种异步加载状态
   */
  @State() loading: boolean = false;

  /**
   * 当发生错误
   */
  @Event() error: EventEmitter;

  /**
   * 触发图片选择改动
   */
  @Event() change: EventEmitter;

  /**
   * 获取预览图片合集
   */
  @Method()
  async getImages() {
    return this.previewImages;
  }

  /**
   * 上传 input
   */
  private uploader: HTMLInputElement;

  /**
   * 触发选择图片上传
   */
  private selectImage() {
    if (this.loading) return;
    this.uploader.click();
  }

  /**
   * 移除图片
   */
  private removeImage(image) {
    this.previewImages.splice(this.previewImages.indexOf(image), 1);
    this.previewImages = [...this.previewImages];
    // 触发图片改动
    this.change.emit();
  }

  /**
   * 当选择的图片发生变化处理上传图片
   */
  private upload(ev) {
    // 放大倍数
    let rate = 1.5;
    // 选中的文件
    let files = ev.target.files;
    // 总文件数
    let fileLen = files.length;
    // 处理完毕的文件数
    let fileDone = 0;
    // 没有文件忽略
    if (fileLen === 0) return;
    // 超过最大数，提示
    if (fileLen + this.previewImages.length > this.maxLength) {
      this.error.emit({
        info: `不能上传超过${this.maxLength}张`
      });
      return;
    }
    // 触发图片改动
    this.change.emit();
    try {
      
      this.loading = true;

      // 循环显示
      for (let i = 0; i < files.length; i++) {
        let canvas = document.createElement('canvas');
        let rCanvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let rctx = rCanvas.getContext('2d');
        let reader = new FileReader();
        let image = new Image();

        reader.onload = () => {
          let url = reader.result;
          image.src = String(url);
        };

        image.onload = () => {
          let w = image.naturalWidth;
          let h = image.naturalHeight;
          let rW = 0;
          let rH = 0;

          // 过大裁切
          if (w > 750 * rate) {
            rW = 750 * rate;
            rH = h * ((750 * rate) / w);
          } else {
            rW = w;
            rH = h;
          }

          // 正常宽高
          canvas.width = w;
          canvas.height = h;
          rCanvas.width = rW;
          rCanvas.height = rH;

          //旋转图片操作
          EXIF.getData(image, function() {
            let orientation = EXIF.getTag(this, 'Orientation');
            switch (orientation) {
              //正常状态
              case 1:
                console.log('旋转0°');
                ctx.rotate((0 * Math.PI) / 180);
                ctx.drawImage(image, 0, 0);
                rctx.drawImage(
                  canvas,
                  0,
                  0,
                  w,
                  h,
                  0,
                  0,
                  rCanvas.width,
                  rCanvas.height
                );
                break;
              //旋转90度
              case 6:
                console.log('旋转90°');
                canvas.width = h;
                canvas.height = w;
                ctx.rotate((90 * Math.PI) / 180);
                ctx.translate(0, -h);
                ctx.drawImage(image, 0, 0);
                rCanvas.width = rH;
                rCanvas.height = rW;
                rctx.drawImage(
                  canvas,
                  0,
                  0,
                  h,
                  w,
                  0,
                  0,
                  rCanvas.width,
                  rCanvas.height
                );
                break;
              //旋转180°
              case 3:
                console.log('旋转180°');
                ctx.rotate((180 * Math.PI) / 180);
                ctx.translate(-w, -h);
                ctx.drawImage(image, 0, 0);
                rctx.drawImage(
                  canvas,
                  0,
                  0,
                  w,
                  h,
                  0,
                  0,
                  rCanvas.width,
                  rCanvas.height
                );
                break;
              //旋转270°
              case 8:
                console.log('旋转270°');
                canvas.width = h;
                canvas.height = w;
                ctx.rotate((270 * Math.PI) / 180);
                ctx.translate(-w, 0);
                ctx.drawImage(image, 0, 0);
                rCanvas.width = rH;
                rCanvas.height = rW;
                rctx.drawImage(
                  canvas,
                  0,
                  0,
                  h,
                  w,
                  0,
                  0,
                  rCanvas.width,
                  rCanvas.height
                );
                break;
              //undefined时不旋转
              case undefined:
                console.log('undefined  不旋转');
                ctx.rotate((0 * Math.PI) / 180);
                ctx.drawImage(image, 0, 0);
                rctx.drawImage(
                  canvas,
                  0,
                  0,
                  w,
                  h,
                  0,
                  0,
                  rCanvas.width,
                  rCanvas.height
                );
                break;
            }
          });

          fileDone++;

          // 插入本地预览
          this.previewImages.push({
            base64: rCanvas.toDataURL(files[i].type)
          });
          this.previewImages = [...this.previewImages];

          // 都处理完了就重置上传控件
          if (fileLen === fileDone) {
            this.uploader.value = '';
            this.loading = false;
          }
        };

        reader.readAsDataURL(files[i]);
      }
    } catch (e) {
      this.error.emit({
        info: e.message
      });
    }
  }

  /**
   * 预览样式
   */
  get previewStyles() {
    return {
      width: `${this.previewSize / 75}rem`,
      height: `${this.previewSize / 75}rem`,
      borderRadius: `${7 / 75}rem`
    };
  }

  render() {
    return [
      <div class="upload-images">
        {this.previewImages.map(img => {
          return (
            <div
              class="preview"
              style={{
                ...this.previewStyles,
                backgroundImage: `url(${img.url || img.base64})`
              }}
            >
              <i
                innerHTML={ICONS.qingchu}
                onClick={this.removeImage.bind(this, img)}
              />
            </div>
          );
        })}
        {this.previewImages.length < this.maxLength && (
          <div class="up-btn" style={{
            ...this.previewStyles
          }} onClick={this.selectImage.bind(this)}>
            {this.loading && <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}
            {!this.loading && <div class="cross-x"></div>}
            {!this.loading && <div class="cross-y"></div>}
            {!this.loading && <span class="text">{this.uploadText}</span>}
          </div>
        )}
      </div>,
      <input
        onChange={this.upload.bind(this)}
        ref={el => (this.uploader = el)}
        style={{
          display: 'none'
        }}
        type="file"
        accept="image/jpeg, image/jpg, image/png, image/bmp, image/gif"
        multiple
      />
    ];
  }
}
