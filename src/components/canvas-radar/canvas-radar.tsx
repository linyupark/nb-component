import { Component, Prop } from '@stencil/core';

/**
 * canvas - 雷达图
 */
@Component({
  tag: 'nb-canvas-radar'
})
export class CanvasRadar {
  /**
   * 画布
   */
  canvas: any;

  /**
   * 画布宽高
   */
  @Prop() wh: [number, number] = [400, 400];

  /**
   * 雷达线颜色
   */
  @Prop() borderColor: string = '#2E3F63';

  /**
   * 半径间隔数
   */
  @Prop() unit: number = 5;

  /**
   * 角顶文案
   */
  @Prop() labelDataList: string[] = [
    '选时',
    '选股',
    '配置',
    '日内交易',
    '风格把控',
    '风控能力'
  ];

  /**
   * 背景色以及分值
   */
  @Prop() points: any = [
    {
      bgcolor: 'RGBA(18, 105, 191, 0.5)',
      data: [30, 50, 60, 70, 80, 90]
    },
    {
      bgcolor: 'RGBA(102, 56, 240, 0.8)',
      data: [40, 40, 30, 70, 60, 100]
    }
  ];

  /**
   * 字体大小
   */
  @Prop() fontSize: number = 14;

  /**
   * 边数
   */
  get countNumber() {
    return this.labelDataList.length;
  }

  /**
   * 中心位置
   */
  get centerLen() {
    return this.wh[0] / 2;
  }

  /**
   * 绘图半径
   */
  get radius() {
    return this.centerLen - 50;
  }

  /**
   * 角度
   */
  get angle() {
    return (Math.PI * 2) / this.countNumber;
  }

  /**
   * 绘制半径折线
   */
  drawPolygon() {
    const centerLen = this.centerLen;
    const radius = this.radius;
    const angle = this.angle;
    this.canvas.save();
    this.canvas.strokeStyle = this.borderColor;
    const r = radius / this.unit;
    for (let i = 0; i < this.unit; i++) {
      this.canvas.beginPath();
      const currR = r * (i + 1); //当前半径
      //画6条边
      for (let j = 0; j < this.countNumber; j++) {
        const x = centerLen + currR * Math.cos(angle * j);
        const y = centerLen + currR * Math.sin(angle * j);
        this.canvas.lineTo(y, x);
      }
      this.canvas.closePath();
      this.canvas.stroke();
    }
    this.canvas.restore();
  }

  /**
   * 绘制顶线
   */
  drawLines() {
    this.canvas.save();
    this.canvas.beginPath();
    this.canvas.strokeStyle = this.borderColor;
    for (let i = 0; i < this.countNumber; i++) {
      const x = this.centerLen + this.radius * Math.cos(this.angle * i);
      const y = this.centerLen + this.radius * Math.sin(this.angle * i);

      this.canvas.moveTo(this.centerLen, this.centerLen);
      this.canvas.lineTo(y, x);
    }
    this.canvas.stroke();
    this.canvas.restore();
  }

  /**
   * 绘制文字
   */
  drawText() {
    this.canvas.save();
    this.canvas.font = `${this.fontSize}px Arial`;
    this.canvas.fillStyle = '#444';

    for (let i = 0; i < this.countNumber; i++) {
      const y = this.centerLen + this.radius * Math.cos(this.angle * i);
      const x = this.centerLen + this.radius * Math.sin(this.angle * i);
      const label = this.labelDataList[i];
      const textWidth = this.canvas.measureText(label).width;

      if (this.angle * i >= 0 && this.angle * i <= Math.PI / 2) {
        this.canvas.fillText(
          label,
          x - textWidth / 2 + (i * textWidth) / 2,
          y + this.fontSize
        );
      } else if (this.angle * i > Math.PI / 2 && this.angle * i <= Math.PI) {
        this.canvas.fillText(
          label,
          x - ((i % 2) * textWidth) / 2,
          y - this.fontSize / 2
        );
      } else if (
        this.angle * i > Math.PI &&
        this.angle * i <= (Math.PI * 3) / 2
      ) {
        this.canvas.fillText(label, x - textWidth, y - this.fontSize / 2);
      } else {
        this.canvas.fillText(label, x - textWidth, y + this.fontSize);
      }
    }

    this.canvas.restore();
  }

  /**
   * 绘制得分区块
   */
  drawRegion(index: number) {
    this.canvas.save();

    this.canvas.beginPath();
    for (var i = 0; i < this.centerLen; i++) {
      var x =
        this.centerLen +
        (this.radius * Math.cos(this.angle * i) * this.points[index].data[i]) /
          100;
      var y =
        this.centerLen +
        (this.radius * Math.sin(this.angle * i) * this.points[index].data[i]) /
          100;

      this.canvas.lineTo(y, x);
    }
    this.canvas.closePath();
    this.canvas.fillStyle = this.points[index].bgcolor;
    this.canvas.fill();

    this.canvas.restore();
  }

  componentDidLoad() {
    this.canvas = this.canvas.getContext('2d');
    this.drawPolygon();
    this.drawLines();
    this.drawText();
    for (let index in this.points) {
      this.drawRegion(Number(index));
    }
  }

  render() {
    return (
      <div class="radar">
        <canvas
          ref={ev => (this.canvas = ev)}
          width={this.wh[0]}
          height={this.wh[1]}
        />
      </div>
    );
  }
}
