import Layout from "../modules/Layout/index.js";
import { map, pick, go, indexBy, each, strMap } from "fxjs2";

app.get('/group_payment_test', (req, res) =>
  res.send(Layout.main({
    title: '함께 결제',
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
    script: '<script type="module" src="/example/group_payment.js"></script>'
  })));

app.get('/api/me', async (req, res) => {
  res.json(await QUERY1 `
    SELECT * FROM users WHERE id = ${req.session.user.id}
  `);
});

app.get('/api/friends', async (req, res) => {
  res.json(await QUERY `
    SELECT * FROM users WHERE id != ${req.session.user.id}
  `);
});

app.post('/api/group_payments', async ({session: {user: {id: user_id}}, body: {amount, payments}}, res) => {
  const { QUERY1, COMMIT, ROLLBACK } = await TRANSACTION();
  try {
    const {id: group_payment_id} = await QUERY1 `
      INSERT INTO group_payments ${VALUES({
        amount,
        user_id,
        created_at: new Date()
      })} RETURNING id`;

    await go(
      payments,
      map(pick(['amount', 'user_id'])),
      map(p => ({...p, group_payment_id})),
      values => QUERY1 `INSERT INTO payments ${VALUES(values)}`);

    await COMMIT();
    res.json(group_payment_id);
  } catch (e) {
    await ROLLBACK();
    res.json(null);
  }
});

app.get('/group_payments/:id', async (req, res) => {
  const group_payment = await ASSOCIATE1 `
    group_payments ${SQL `WHERE id = ${req.params.id}`}
      < payments 
        - user
  `;

  // const [group_payment, payments] = await Promise.all([
  //   QUERY1 `SELECT * FROM group_payments WHERE id = ${req.params.id}`,
  //   ASSOCIATE `
  //     payments ${SQL `WHERE group_payment_id = ${req.params.id}`}
  //       - user
  //   `]);

  // console.log(payments);

  // const [group_payment, payments] = await Promise.all([
  //   QUERY1 `SELECT * FROM group_payments WHERE id = ${req.params.id}`,
  //   go(
  //     QUERY `
  //       SELECT * FROM payments WHERE group_payment_id = ${req.params.id}`,
  //     async payments => [
  //       payments,
  //       await indexBy(u => u.id, await QUERY `
  //         SELECT * FROM users WHERE ${IN('id', map(p => p.user_id, payments))}
  //       `)],
  //     ([payments, users]) => each(p => p._ = { user: users[p.user_id] }, payments)
  //   )]);

  // const group_payment = await QUERY1 `
  //   SELECT * FROM group_payments WHERE id = ${req.params.id}`;
  //
  // const payments = await QUERY `
  //   SELECT * FROM payments WHERE group_payment_id = ${req.params.id}`;
  // const users = indexBy(u => u.id, await QUERY `
  //   SELECT * FROM users WHERE ${IN('id', map(p => p.user_id, payments))}
  // `);
  // each(p => p._ = { user: users[p.user_id] }, payments);

  res.send(Layout.main({
    title: '결제 완료',
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
              `, group_payment._.payments)}
            </table>
          </td>
        </tr>
      </table>
      <a href="/group_payment_test">첫 페이지로</a>
    `
  }));
});









