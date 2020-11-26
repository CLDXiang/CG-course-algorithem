import './index.less';
import { render } from '@/utils/dom';
import { CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_MARGIN } from '@/utils/config';
import { drawLine, drawXMarkLine, drawYMarkLine } from '@/utils/canvas';

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

  document.body.appendChild(container);
};

const draw = () => {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas');
  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }
  /** x 轴 */
  drawLine(ctx, [0, 0], [CANVAS_WIDTH - CANVAS_MARGIN * 2, 0]);
  /** y 轴 */
  drawLine(ctx, [0, 0], [0, CANVAS_HEIGHT - CANVAS_MARGIN * 2]);

  for (let x = 1; x < 8; x += 1) {
    drawXMarkLine(ctx, 50 * x, x.toString(), { lineDash: [5, 5], color: '#bbb' });
  }
  for (let y = 1; y < 8; y += 1) {
    drawYMarkLine(ctx, 50 * y, y.toString(), { lineDash: [5, 5], color: '#bbb' });
  }
};

loadPage();
draw();
