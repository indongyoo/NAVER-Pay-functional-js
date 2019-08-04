import { curry, pipe, isIterable, each, extend, tap } from '../node_modules/fxjs2/index.js';

export const el = html => {
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  return wrap.children[0];
};

export const qs = sel => document.querySelector(sel);

export const qsa = sel => document.querySelectorAll(sel);

export const find = curry((sel, parent) => parent.querySelector(sel));

export const findAll = curry((sel, parent) => parent.querySelectorAll(sel));

export const append = curry((parent, child) => parent.appendChild(child));

const toJSON = res => res.ok ? res.json() : res.json().then(e => Promise.reject(e));

export const get = curry(pipe(fetch, toJSON));

export const post = curry(pipe(
  (url, body) => fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }),
  toJSON));

export const on = (eventName, f) => tap(els =>
  each(el => el.addEventListener(eventName, f), isIterable(els) ? els : [els]));

export const closest = curry((sel, el) => el.closest(sel));

export const attr = curry((k, el) => el.getAttribute(k));

export const val = el => el.value;

export const html = el => el.innerHTML;

export const setHTML = curry(tap((el, html) => el.innerHTML = html));

export const focus = el => el.focus();

export const remove = el => el.parentNode.removeChild(el);

export const animate = curry(({attrs, opts = {}}, el) => new Promise(resolve =>
  Velocity(el, attrs, extend(opts, { complete: _ => resolve(el) }))));

export const fadeIn = animate({ attrs: { opacity: 1 }, opts: { duration: 200 } });

export const fadeOut = animate({ attrs: { opacity: 0 }, opts: { duration: 200 } });

