import { go, pipe } from '../../node_modules/fxjs2/index.js';
import * as $ from "../$.js";

export const open = ({title, done, body, name}) => go(
  `
    <div class="page" page-name="${name}" style="top: 100%">
      <div class="header">
        <h1>${title}</h1>
        <button type="button" class="right done">${done}</button>
      </div>
      <div class="body">
        ${body}
      </div>
    </div>
  `,
  $.el,
  $.append($.qs('body')),
  $.animate({ attrs: { top: 0 }, opts: { duration: 400 } })
);

const close = pipe(
  $.animate({ attrs: { top: '100%' }, opts: { duration: 400 } }),
  $.remove
);

export default {
  open,
  close
}