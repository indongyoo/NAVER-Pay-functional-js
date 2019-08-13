import { curry, each, isIterable, extend } from "../node_modules/fxjs2/index.js";

export const qs = sel => document.querySelector(sel);

export const qsa = sel => document.querySelectorAll(sel);

export const find = curry((sel, parent) => parent.querySelector(sel));

export const findAll = curry((sel, parent) => parent.querySelectorAll(sel));

export const append = curry((parent, child) => parent.appendChild(child));

export const closest = curry((sel, el) => el.closest(sel));

export const animate = curry(({attrs, opts = {}}, el) =>
  new Promise(resolve =>
    Velocity(el, attrs, extend(opts, { complete: _ => resolve(el) }))));

export const remove = el => el.parentNode.removeChild(el);

export const el = html => {
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  return wrap.children[0];
};

export const on = (eventName, f) => els =>
  each(el => el.addEventListener(eventName, f), isIterable(els) ? els : [els]);