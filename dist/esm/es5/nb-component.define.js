
// NbComponent: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './nb-component.core.js';
import { COMPONENTS } from './nb-component.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, COMPONENTS, opts);
}
