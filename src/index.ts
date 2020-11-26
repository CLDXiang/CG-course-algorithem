import './index.less';
import { render } from '@/utils/dom';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/utils/config';
import { testNav } from '@/views';

const loadPage = () => {
  const container = render('div', { className: 'container' });

  const sideNav = render('span', { className: 'side-nav' }, [testNav]);
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
  testNav.click();
};

loadPage();
