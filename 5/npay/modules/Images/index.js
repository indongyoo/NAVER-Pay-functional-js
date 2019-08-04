import { strMap, go } from '../../node_modules/fxjs2/index.js';
import * as $ from "../$.js";
import * as UI from "../UI/index.js";

const tmpl = imgs => `
  <div class="images">
    ${strMap(img => `
      <div class="image">
        <div class="box"><img src="" lazy-src="${img.url}" alt=""></div>
        <div class="name">${img.name}</div>
        <button class="remove">X</button>
      </div>
    `, imgs)}
  </div>
`;

export const main = () => go(
  void 0,
  $.get('/api/images'),
  tmpl,
  $.el,
  $.append($.qs('body')),
  UI.remover('.image .remove', '.image', _ => UI.confirm('정말 삭제하시겠습니까?')),
  $.findAll('.image img'),
  UI.imageLoader(4));