import { open } from "../modules/GroupPayment/index.js";
import { go } from "../node_modules/fxjs2/index.js";
import * as $ from "../modules/$.js";

go(
  $.qsa('button'),
  $.on('click', e => go(
    e.target,
    $.closest('tr'),
    $.find('.amount'),
    el => el.innerHTML,
    amount => open({amount})
  ))
);