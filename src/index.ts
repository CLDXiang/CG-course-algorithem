import './index.less';
import { render, createNumberInputWithCallback } from '@/utils/dom';
import { CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_MARGIN } from '@/utils/config';
import {
  drawLine, drawXMarkLine, drawYMarkLine, drawPoint,
} from '@/utils/canvas';

const defaultPageState = {
  xRange: 7,
  yRange: 7,
  xScaleRatio: Math.floor(CANVAS_WIDTH / 8),
  yScaleRatio: Math.floor(CANVAS_HEIGHT / 8),
};

let pageState = { ...defaultPageState };

const draw = () => {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas');
  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  /** x 轴 */
  drawLine(ctx, [0, 0], [CANVAS_WIDTH - CANVAS_MARGIN * 2, 0]);
  /** y 轴 */
  drawLine(ctx, [0, 0], [0, CANVAS_HEIGHT - CANVAS_MARGIN * 2]);

  for (let x = 1; x <= pageState.xRange; x += 1) {
    drawXMarkLine(ctx, pageState.xScaleRatio * x, x.toString(), { lineDash: [5, 5], color: '#bbb' });
  }
  for (let y = 1; y <= pageState.yRange; y += 1) {
    drawYMarkLine(ctx, pageState.yScaleRatio * y, y.toString(), { lineDash: [5, 5], color: '#bbb' });
  }

  drawPoint(ctx, [2 * pageState.xScaleRatio, 2 * pageState.yScaleRatio]);
};

const loadPage = () => {
  const container = render('div', { className: 'container' });

  const sideNav = render('span', { className: 'side-nav' });
  const content = render('span', { className: 'content' });
  container.append(sideNav, content);

  const canvasContainer = render('div', { className: 'canvas-container' });
  const canvas = document.createElement('canvas');
  canvas.innerText = 'Hello World!';
  canvas.height = CANVAS_HEIGHT;
  canvas.width = CANVAS_WIDTH;
  canvasContainer.appendChild(canvas);

  const activeBar = render('div', { className: 'active-bar' });
  content.append(canvasContainer, activeBar);

  const xRangeInput = createNumberInputWithCallback((value: string) => {
    const newXRange = parseInt(value, 10);
    pageState.xRange = newXRange;
    pageState.xScaleRatio = Math.floor(CANVAS_WIDTH / (newXRange + 1));
    draw();
  }, { init: pageState.xRange, min: 1 });
  const yRangeInput = createNumberInputWithCallback((value: string) => {
    const newYRange = parseInt(value, 10);
    pageState.yRange = parseInt(value, 10);
    pageState.yScaleRatio = Math.floor(CANVAS_HEIGHT / (newYRange + 1));
    draw();
  }, { init: pageState.yRange, min: 1 });
  const resetButton = document.createElement('button');
  resetButton.addEventListener('click', () => {
    pageState = { ...defaultPageState };
    xRangeInput.value = pageState.xRange.toString();
    yRangeInput.value = pageState.yRange.toString();
    draw();
  });
  resetButton.innerText = 'reset';
  activeBar.append(
    render('span', {}, [
      'xRange: ',
      xRangeInput,
    ]),
    render('span', {}, [
      'yRange: ',
      yRangeInput,
    ]),
    resetButton,
  );

  document.body.appendChild(container);
};

loadPage();
draw();
