/* eslint-disable no-param-reassign */
import { Properties } from 'csstype';

/** add class to element */
export const addClass = (ele: HTMLElement, className: string | string[]) => {
  if (typeof className === 'string') {
    ele.classList.add(className);
  } else {
    className.forEach((c) => {
      ele.classList.add(c);
    });
  }
};

/** add style to element */
export const addStyle = (
  ele: HTMLElement,
  style: Properties<string | number>,
) => {
  Object.entries(style).forEach(([key, value]) => {
    ele.style[key as any] = value;
  });
};

/** render a DOM Element */
export const render = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  styleSheet: {
    className?: string | string[];
    style?: Properties<string | number>;
  },
  children?: (HTMLElement | string)[],
): HTMLElementTagNameMap[K] => {
  const ele = document.createElement(tagName);
  const { className, style } = styleSheet;
  if (className) {
    addClass(ele, className);
  }
  if (style) {
    addStyle(ele, style);
  }
  if (children) {
    ele.append(...children);
  }
  return ele;
};

/** create an number input element with oninput event callback */
export const createNumberInputWithCallback = (
  callback: ((value: string) => void) | (() => void),
  config?: {
    init?: number;
    step?: number;
    min?: number;
    max?: number;
  },
) => {
  const input = document.createElement('input');
  input.type = 'number';
  if (config) {
    const {
      init, step, min, max,
    } = config;
    if (init !== undefined) {
      input.value = init.toString();
    }
    if (step !== undefined) {
      input.step = step.toString();
    }
    if (min !== undefined) {
      input.min = min.toString();
    }
    if (max !== undefined) {
      input.max = max.toString();
    }
  }
  input.addEventListener('input', () => {
    callback(input.value);
  });
  return input;
};
