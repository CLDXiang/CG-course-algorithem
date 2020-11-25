import './index.less';
import { addClass } from '@/utils/dom';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/utils/config';

const loadPage = () => {
  const container = document.createElement('div');
  addClass(container, 'container');

  const sideNav = document.createElement('span');
  addClass(sideNav, 'side-nav');
  container.appendChild(sideNav);

  const content = document.createElement('span');
  addClass(content, 'content');
  container.appendChild(content);

  const canvasContainer = document.createElement('div');
  addClass(canvasContainer, 'canvas-container');
  content.appendChild(canvasContainer);

  const canvas = document.createElement('canvas');
  canvas.innerText = 'Hello World!';
  canvas.height = CANVAS_HEIGHT;
  canvas.width = CANVAS_WIDTH;
  canvasContainer.appendChild(canvas);

  const activeBar = document.createElement('div');
  addClass(activeBar, 'active-bar');
  content.appendChild(activeBar);

  document.body.appendChild(container);
};

const draw = () => {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas');
  if (!canvas) {
    return;
  }
  // const canvasHeight = canvas.clientHeight;
  // console.log(canvasHeight);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }
  ctx.fillRect(1, 1, 1, 1);
};

loadPage();
draw();
