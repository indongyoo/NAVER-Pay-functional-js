import * as $ from "../modules/$.js";
import { go, tap } from "../node_modules/fxjs2/index.js";
import * as GroupPayment from "../modules/GroupPayment/index.js";

go(
  $.qsa('table td button.pay'),
  $.on('click', ({target}) => go(
    target,
    $.closest('tr'),
    $.find('.amount'),
    $.html,
    parseInt,
    amount => ({ amount }),
    GroupPayment.main
  )));