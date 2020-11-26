import { CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_MARGIN } from '@/utils/config';

/** 将坐标系坐标映射到 canvas */
export const mapX = (x: number) => x + CANVAS_MARGIN;
export const mapY = (y: number) => CANVAS_HEIGHT - 20 - y;

/** 线样式 */
interface LineStyle extends Partial<CanvasPathDrawingStyles> {
  lineDash?: number[];
  color?: CanvasFillStrokeStyles['strokeStyle'];
}

/** 画线 */
export const drawLine = (
  ctx: CanvasRenderingContext2D,
  /** 起点坐标 */
  start: [number, number],
  /** 终点坐标 */
  end: [number, number],
  style?: LineStyle,
) => {
  ctx.save();
  if (style) {
    const {
      lineWidth,
      lineCap,
      lineJoin,
      miterLimit,
      lineDashOffset,
      lineDash,
      color,
    } = style;
    if (lineWidth) {
      ctx.lineWidth = lineWidth;
    }
    if (lineCap) {
      ctx.lineCap = lineCap;
    }
    if (lineJoin) {
      ctx.lineJoin = lineJoin;
    }
    if (miterLimit) {
      ctx.miterLimit = miterLimit;
    }
    if (lineDashOffset) {
      ctx.lineDashOffset = lineDashOffset;
    }
    if (lineDash) {
      ctx.setLineDash(lineDash);
    }
    if (color) {
      ctx.strokeStyle = color;
    }
  }
  ctx.beginPath();
  ctx.moveTo(mapX(start[0]), mapY(start[1]));
  ctx.lineTo(mapX(end[0]), mapY(end[1]));
  ctx.stroke();
  ctx.restore();
};

/** 画 x 轴标记线 */
export const drawXMarkLine = (
  ctx: CanvasRenderingContext2D,
  /** x 轴位置 */
  x: number,
  /** x 轴标记 */
  text: string = x.toString(),
  lineStyle?: LineStyle,
) => {
  ctx.save();

  // x 轴标记
  ctx.fillText(text, mapX(x), mapY(-10));

  // 画线
  drawLine(ctx, [x, 0], [x, CANVAS_HEIGHT - CANVAS_MARGIN * 2], lineStyle);

  ctx.restore();
};

/** 画 y 轴标记线 */
export const drawYMarkLine = (
  ctx: CanvasRenderingContext2D,
  /** y 轴位置 */
  y: number,
  /** y 轴标记 */
  text: string = y.toString(),
  lineStyle?: LineStyle,
) => {
  ctx.save();

  // x 轴标记
  ctx.fillText(text, mapX(-15), mapY(y));

  // 画线
  drawLine(ctx, [0, y], [CANVAS_WIDTH - CANVAS_MARGIN * 2, y], lineStyle);

  ctx.restore();
};

/** 画点 */
export const drawPoint = (
  ctx: CanvasRenderingContext2D,
  point: [number, number],
  color: string = '#ef755a',
) => {
  ctx.save();

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(mapX(point[0]), mapY(point[1]), 5, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
};
