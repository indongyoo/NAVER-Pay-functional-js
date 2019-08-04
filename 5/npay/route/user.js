
app.get('/api/me', async (req, res) =>
  res.json(await QUERY1 `SELECT * FROM users WHERE id = ${req.session.user.id}`)
);

app.get('/api/friends', async (req, res) =>
  res.json(await QUERY `SELECT * FROM users WHERE id != ${req.session.user.id}`)
);