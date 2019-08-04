import { Layout } from "../modules/Layout/index.js";
import { omit, go, map, tap, each, find, strMap, indexBy } from "fxjs2";

app.get('/group_payment_test', (req, res) =>
  res.send(Layout.base({
    title: 'N Pay - 더치페이',
    body: `
      <table>
        <tr>
          <th class="name">중국집</th>
          <td class="amount">50000</td>
          <td><button type="button" class="pay">결제</button></td>
        </tr>
        <tr>
          <th class="name">파스타집</th>
          <td class="amount">60000</td>
          <td><button type="button" class="pay">결제</button></td>
        </tr>
        <tr>
          <th class="name">분식집</th>
          <td class="amount">30000</td>
          <td><button type="button" class="pay">결제</button></td>
        </tr>
        <tr>
          <th class="name">한식집</th>
          <td class="amount">40000</td>
          <td><button type="button" class="pay">결제</button></td>
        </tr>
        <tr>
          <th class="name">고기집</th>
          <td class="amount">100000</td>
          <td><button type="button" class="pay">결제</button></td>
        </tr>
      </table>
    `,
    scripts: `<script type="module" src="/example/group_payment_test.js"></script>`
  }))
);

app.get('/group_payments/:id', async ({params: {id}}, res) => {
  const [group_payment, payments] = await Promise.all([
    QUERY1 `
      SELECT * FROM group_payments WHERE id = ${id}`,
    ASSOCIATE `
      payments ${SQL `WHERE group_payment_id = ${id}`}
        - user`]);

  // const group_payment = await QUERY1 `
  //   SELECT * FROM group_payments WHERE id = ${id}
  // `;
  //
  // const payments = await ASSOCIATE `
  //   payments ${SQL `WHERE group_payment_id = ${id}`}
  //     - user`;

  // const payments = await QUERY `
  //   SELECT * FROM payments WHERE group_payment_id = ${id}
  // `;
  //
  // const users = indexBy(u => u.id, await QUERY `
  //   SELECT * FROM users WHERE ${IN('id', map(p => p.user_id, payments))}
  // `);
  //
  // go(payments,
  //   each(p => p._ = {}),
  //   each(p => p._.user = users[p.user_id]));

  res.send(Layout.base({
    title: 'N Pay - 더치페이',
    body: `
      <table class="group_payment">
        <tr>
          <th>결제 금액</th>
          <td class="amount">${group_payment.amount}</td>
        </tr>
        <tr>
          <th>결제 일시</th>
          <td class="created_at">${group_payment.created_at.toLocaleString()}</td>
        </tr>
        <tr>
          <th>결제자들</th>
          <td class="users">
            <table>
              ${strMap(p => `
                <tr>
                  <th>${p._.user.name}</th>
                  <td>${p.amount}</td>
                </tr>
              `, payments)}
            </table>
          </td>
        </tr>
      </table>
      <a href="/group_payment_test">첫 페이지로</a>
    `
  }))
});

app.post('/api/payments', async ({body: {amount, _: {payments}}, session: {user: {id: user_id}}}, res) => {
  const { QUERY, QUERY1, COMMIT, ROLLBACK } = await TRANSACTION();
  try {
    const {id: group_payment_id} = await QUERY1 `
      INSERT INTO group_payments ${VALUES({
        user_id,
        amount,
        created_at: new Date()
      })} RETURNING id`;

    await QUERY `
      INSERT INTO payments 
        ${VALUES(map(p => ({group_payment_id, ...p}), payments))}`;

    await COMMIT();
    res.json(group_payment_id);
  } catch (e) {
    console.log(e);
    await ROLLBACK();
    res.json(null);
  }
});