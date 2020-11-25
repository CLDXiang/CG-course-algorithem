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
export const addStyle = (ele: HTMLElement, style: Properties<string | number>) => {
  Object.entries(style).forEach(([key, value]) => {
    ele.style[key as any] = value;
  });
};
