import { go, goS, stopIf, not, tap, strMap, match, curry, L, C, each, pipe, filter, takeAll, reject, delay } from '../../node_modules/fxjs2/index.js';
import * as $ from "../$.js";

export const remover = (
  triggerSelector,
  targetSelector,
  confirm = _ => true,
  before = a => a,
  after = () => ({}),
) => tap(
  $.findAll(triggerSelector),
  $.on('click', ({currentTarget: ct}) => goS(
    confirm(),
    stopIf(not),
    _ => ct,
    $.closest(targetSelector),
    before,
    $.remove,
    after))
);

const createMessageEl = ({middle = '', buttons, msg, resolve}) => go(
  `
    <div class="message" style="opacity: 0;">
      <div class="body">
        <div class="msg">${msg}</div>
        ${middle}
        <div class="buttons">
          ${strMap(b => `<button type="button" class="${b.type}">${b.name}</button>`, buttons)}
        </div>
      </div>
    </div>
  `,
  $.el,
  ...L.map(b => remover(
    `.${b.type}`,
    '.message',
    undefined,
    $.fadeOut,
    el => resolve(b.resolve(el))), buttons)
);

const render = pipe(
  $.append($.qs('body')),
  $.fadeIn);

export const message = curry((buttons, msg) => new Promise(resolve => go(
  createMessageEl({buttons, msg, resolve}),
  render
)));

export const alert = message([
  {type: 'ok', name: '확인', resolve: _ => true}
]);

export const confirm = message([
  {type: 'cancel', name: '취소', resolve: _ => false},
  {type: 'ok', name: '확인', resolve: _ => true}
]);

export const prompt = go([
  {type: 'cancel', name: '취소', resolve: _ => null},
  {type: 'ok', name: '확인', resolve: pipe($.find('input'), $.val)}
], buttons => msg => new Promise(resolve => go(
  createMessageEl({
    middle: '<div class="input"><input type="text"></div>',
    buttons, msg, resolve
  }),
  tap(el => go(
    el,
    $.find('input'),
    $.on('keyup', e => e.code == 'Enter' && go(
      el,
      $.fadeOut,
      $.remove,
      _ => resolve($.val(e.target))))
  )),
  render,
  tap($.find('input'), $.focus)
)));

export const imageLoader = n => pipe(
  L.map(img => new Promise(resolve => {
    img.onload = _ => resolve(delay(0, img));
    img.src = img.getAttribute('lazy-src');
  })),
  L.takeAllC(n),
  each(img => img.classList.add('fade-in')));

export { default as page } from './page.js';
