import { go, strMap, each, tap, L, map, delay, reject } from "../../node_modules/fxjs2/index.js";
import * as $ from "../../modules/$.js";
import UI from "../UI/index.js";

const tmpl = images => `
  <div class="images">
    ${strMap(img => `
      <div class="image">
        <div class="box"><img src="" lazy-src="${img.url}" alt=""></div>
        <div class="name">${img.name}</div>
        <div class="remove">x</div>
      </div>
    `, images)}
  </div>
`;

// export const main = async () => {
//   if (await UI.confirm('정말 삭제하시겠습니까?')) {
//     console.log('hi~~')
//   } else {
//     console.log('hi~~222')
//   }
// };

export const main = () => go(
  fetch('/api/images'),
  res => res.ok ? res.json() : res.json().then(e => Promise.reject(e)),
  tmpl,
  $.el,
  $.append($.qs('body')),
  tap($.findAll('.remove'),
    $.on('click', async ({target}) =>
      await UI.confirm('정말 삭제하시겠습니까?') &&
      go(
        target,
        $.closest('.image'),
        $.remove))),
  $.findAll('img'),
  L.map(img => new Promise(resolve => {
    img.onload = _ => resolve(delay(200, img));
    img.src = img.getAttribute('lazy-src');
  })),
  L.takeAllC(4),
  each(img => img.classList.add('fade-in'))
);