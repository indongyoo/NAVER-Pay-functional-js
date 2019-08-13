import { go, tap } from "../../node_modules/fxjs2/index.js";
import * as $ from "../../modules/$.js";

const remover = (buttonSel, targetSel, complete) => tap(
  $.find(buttonSel),
  $.on('click', ({target}) => go(
    target,
    $.closest(targetSel),
    $.remove,
    complete
  )));

export const confirm = msg => new Promise(resolve => go(
  `
    <div class="message">
      <div class="body">
        <div class="msg">${msg}</div>
        <div class="buttons">
          <button type="button" class="cancel">취소</button>
          <button type="button" class="ok">확인</button>
        </div>
      </div>
    </div>
  `,
  $.el,
  $.append($.qs('body')),
  remover('button.cancel', '.message', _ => resolve(false)),
  remover('button.ok', '.message', _ => resolve(true))
));

const UI = {
  confirm
};

export default UI;