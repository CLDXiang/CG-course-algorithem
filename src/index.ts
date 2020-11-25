import './index.less';
import { addClass } from '@/utils/dom';

const loadPage = () => {
  const container = document.createElement('div');
  addClass(container, 'container');
  const canvas = document.createElement('canvas');
  canvas.innerText = 'Hello World!';
  container.appendChild(canvas);
  document.body.appendChild(container);
};

loadPage();
