import { go, tap, strMap, map, indexBy } from "../../node_modules/fxjs2/index.js";
import * as $ from "../../modules/$.js";
import UI from "../UI/index.js";

const toPayments = (users, amount) =>
  map(user => ({
    _: { user },
    user_id: user.id,
    amount: amount / users.length
  }), users);

const tmpl = p => `
  <tr class="payment">
    <td class="name">${p._.user.name}</td>
    <td class="amount">${p.amount}</td>
  </tr>
`;

export const open = async ({amount}) => {
  const me = await go(
    fetch('/api/me'),
    res => res.json());

  let States = {
    payments: toPayments([me], amount)
  };

  const el = $.el(`
    <div class="page" page-name="payment" style="top: 100%;">
      <div class="header">
        <h1>결제하기</h1>
        <div class="buttons">
          <button type="button" class="right done">확인</button>
        </div>
      </div>
      <div class="body">
        <div class="amount">${amount}</div>
        <table class="payments">
          ${strMap(tmpl, States.payments)}
        </table>
        <div class="invite">
          <button type="button" class="invite">친구초대</button>
        </div>
      </div>
    </div>
  `);

  go(
    el,
    $.append($.qs('body')),
    tap(
      $.find('button.done'),
      $.on('click', e => go(
        { amount, payments: States.payments },
        JSON.stringify,
        body => fetch('/api/group_payments', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body
        }),
        res => res.json(),
        id => location.href = `/group_payments/${id}`
      )),
    ),
    tap(
      $.find('button.invite'),
      $.on('click', e => go(
        openInvite(),
        users => toPayments([me, ...users], amount),
        tap(payments => States.payments = payments),
        strMap(tmpl),
        html => $.find('.payments', el).innerHTML = html
      ))
    ),
    $.animate({ attrs: { top: 0 }, opts: { duration: 400 } })
  )
};

const openInvite = () => new Promise(async resolve => {
  const users = await go(
    fetch('/api/friends'),
    res => res.json());

  const indexdUsers = indexBy(u => u.id, users);

  go(`
    <div class="page" page-name="invite" style="top: 100%;">
      <div class="header">
        <h1>친구초대</h1>
        <div class="buttons">
          <button type="button" class="right done">확인</button>
        </div>
      </div>
      <div class="body">
        <table class="users">
          ${strMap(u => `
            <tr class="user" data-id="${u.id}">
              <td>${u.name}</td>
              <td>
                <input type="checkbox">
              </td>
            </tr>
          `, users)}
        </table>
      </div>
    </div>`,
    $.el,
    $.append($.qs('body')),
    tap(
      $.find('.done'),
      $.on('click', e => go(
        e.target,
        $.closest('.page'),
        $.animate({ attrs: { top: '100%' }, opts: { duration: 400 } }),
        $.remove,
        $.findAll('input[type="checkbox"]:checked'),
        map($.closest('.user')),
        map(el => el.getAttribute('data-id')),
        map(id => indexdUsers[id]),
        resolve
      ))
    ),
    $.animate({ attrs: { top: 0 }, opts: { duration: 400 } }),
  )
});
