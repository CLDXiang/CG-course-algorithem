import { drawCoordinateSystem } from '@/utils/canvas';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/utils/config';
import { createNumberInputWithCallback, render } from '@/utils/dom';

const navButton = document.createElement('button');
navButton.innerText = 'test';

const defaultPageState = {
  xRange: 7,
  yRange: 7,
  xScaleRatio: Math.floor(CANVAS_WIDTH / 8),
  yScaleRatio: Math.floor(CANVAS_HEIGHT / 8),
};

let pageState = { ...defaultPageState };

const renderView = () => {
  const activeBar = document.querySelector('.active-bar');
  if (!activeBar) {
    return;
  }
  /** remove existing children */
  while (activeBar.firstChild) {
    activeBar.removeChild(activeBar.firstChild);
  }

  /** add */
  const xRangeInput = createNumberInputWithCallback((value: string) => {
    const newXRange = parseInt(value, 10);
    pageState.xRange = newXRange;
    pageState.xScaleRatio = Math.floor(CANVAS_WIDTH / (newXRange + 1));
    drawCoordinateSystem(pageState);
  }, { init: pageState.xRange, min: 1 });
  const yRangeInput = createNumberInputWithCallback((value: string) => {
    const newYRange = parseInt(value, 10);
    pageState.yRange = parseInt(value, 10);
    pageState.yScaleRatio = Math.floor(CANVAS_HEIGHT / (newYRange + 1));
    drawCoordinateSystem(pageState);
  }, { init: pageState.yRange, min: 1 });
  const resetButton = document.createElement('button');
  resetButton.addEventListener('click', () => {
    pageState = { ...defaultPageState };
    xRangeInput.value = pageState.xRange.toString();
    yRangeInput.value = pageState.yRange.toString();
    drawCoordinateSystem(pageState);
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

  drawCoordinateSystem(pageState);
};

navButton.addEventListener('click', renderView);

export default navButton;
