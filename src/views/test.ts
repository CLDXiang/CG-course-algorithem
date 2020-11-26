import { drawCoordinateSystem, drawPoint } from '@/utils/canvas';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/utils/config';
import { createNumberInputWithCallback, render } from '@/utils/dom';

const navButton = document.createElement('button');
navButton.innerText = 'test';

const defaultPageState = {
  xRange: 7,
  yRange: 7,
  xScaleRatio: Math.floor(CANVAS_WIDTH / 8),
  yScaleRatio: Math.floor(CANVAS_HEIGHT / 8),
  testPointX: 2,
  testPointY: 2,
};

let pageState = { ...defaultPageState };

const drawView = () => {
  const ctx = drawCoordinateSystem(pageState);
  if (ctx) {
    drawPoint(ctx,
      [pageState.testPointX * pageState.xScaleRatio, pageState.testPointY * pageState.yScaleRatio]);
  }
};

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
    const intValue = parseInt(value, 10);
    pageState.xRange = intValue;
    pageState.xScaleRatio = Math.floor(CANVAS_WIDTH / (intValue + 1));
    drawView();
  }, { init: pageState.xRange, min: 1 });
  const yRangeInput = createNumberInputWithCallback((value: string) => {
    const intValue = parseInt(value, 10);
    pageState.yRange = intValue;
    pageState.yScaleRatio = Math.floor(CANVAS_HEIGHT / (intValue + 1));
    drawView();
  }, { init: pageState.yRange, min: 1 });
  const testPointXInput = createNumberInputWithCallback((value: string) => {
    const intValue = parseInt(value, 10);
    pageState.testPointX = intValue;
    drawView();
  }, { init: pageState.testPointX, min: 1 });
  const testPointYInput = createNumberInputWithCallback((value: string) => {
    const intValue = parseInt(value, 10);
    pageState.testPointY = intValue;
    drawView();
  }, { init: pageState.testPointY, min: 1 });
  const resetButton = document.createElement('button');
  resetButton.addEventListener('click', () => {
    pageState = { ...defaultPageState };
    xRangeInput.value = pageState.xRange.toString();
    yRangeInput.value = pageState.yRange.toString();
    testPointXInput.value = pageState.testPointX.toString();
    testPointYInput.value = pageState.testPointY.toString();
    drawView();
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
    render('span', {}, [
      'testPointX: ',
      testPointXInput,
    ]),
    render('span', {}, [
      'testPointY: ',
      testPointYInput,
    ]),
    resetButton,
  );

  drawView();
};

navButton.addEventListener('click', renderView);

export default navButton;
