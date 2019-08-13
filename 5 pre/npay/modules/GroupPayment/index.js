import * as $ from '../$.js';
import * as UI from '../UI/index.js';
import { go, strMap, curry, map, pipe, tap, omit } from '../../node_modules/fxjs2/index.js';
import Invite from "../Invite/index.js";

const PaymentItem = {};

PaymentItem.tmpl = p => `
  <tr class="payment">
    <td class="user_name">${p._.user.name}</td>
    <td class="amount"><input type="text" value="${p.amount}"></td>
  </tr>`;

const usersToPayments = curry((amount, users) => map(user => ({
  _: { user },
  user_id: user.id,
  amount: amount / users.length
}), users));

const open = async ({amount}) => {
  const me = await $.get('/api/me', undefined);

  let States = {
    payments: usersToPayments(amount, [me])
  };

  const page = await UI.page.open({
    title: '함께 결제',
    done: '결제하기',
    name: 'payment',
    body: `
      <div class="amount">${amount}</div>
      <table class="payments">
        ${strMap(PaymentItem.tmpl, States.payments)}
      </table>
      <div class="buttons">
        <button type="button" class="invite">친구 선택</button>
      </div>
    `
  });

  go(page,
    $.find('.header button.done'),
    $.on('click', _ => go(
      { amount, _: { payments: map(omit(['_']), States.payments) } },
      $.post('/api/payments'),
      id => id ?
        (location.href = `/group_payments/${id}`) :
        UI.alert('결제를 실패했습니다.')
    )));

  go(page,
    $.find('button.invite'),
    $.on('click', e => go(
      void 0,
      Invite.open,
      users => [me, ...users],
      usersToPayments(amount),
      tap(payments => States.payments = payments),
      strMap(PaymentItem.tmpl),
      $.setHTML($.find('.payments', page))
    )));
};

export const main = ({amount}) => go(
  {amount},
  open
);