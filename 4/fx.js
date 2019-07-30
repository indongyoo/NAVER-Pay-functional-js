const {log, clear, dir} = console;

const curry = f => (a, ..._) =>
  _.length ? f(a, ..._) : (..._) => f(a, ..._);

const isIterable = iter => iter && iter[Symbol.iterator];

const add = (a, b) => a + b;

const or = (a, b) => a || b;

const not = a => !a;

const and = (a, b) => a && b;

function* empty() {}

function toIter(iter) {
  return iter && iter[Symbol.iterator] ? iter[Symbol.iterator]() : empty();
}

const go1 = (a, f) =>
  a instanceof Promise ?
    a.then(f) :
    f(a);

const reduce = curry(function(f, acc, iter) {
  if (arguments.length == 2) {
    iter = toIter(acc);
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = go1(acc, acc => f(acc, a));
  }
  return acc;
});

const takeAll = iter => [...iter];

const incKey = (obj, key) => {
  obj[key] = (obj[key] || 0) + 1;
  return obj;
};

const countBy = (f, iter) =>
  reduce((obj, v) => incKey(obj, f(v)), {}, iter);

const groupBy = (f, iter) => reduce((group, v) => {
  const k = f(v);
  group[k] = group[k] || [];
  group[k].push(v);
  return group;
}, {}, iter);

const go = (a, ...fs) =>
  reduce((a, f) => f(a), a, fs);

const pipe = (f, ...fs) =>
  (...args) =>
    go(f(...args), ...fs);

const L = {};

L.takeWhile = curry(function* (f, iter) {
  iter = toIter(iter);
  while (true) {
    const { value: a, done } = iter.next();
    if (done) break;
    if (!f(a)) break;
    yield a;
  }
});

L.takeUntil = curry(function* (f, iter) {
  iter = toIter(iter);
  while (true) {
    const { value: a, done } = iter.next();
    if (done) break;
    yield a;
    if (f(a)) break;
  }
});

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield f(a);
  }
});

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

L.range = curry(function* (start, stop, step = 1) {
  while (start < stop) {
    yield start;
    start += step;
  }
});

L.take = curry(function (l, iter) {
  return l == 0 ? empty() : L.takeUntil(_ => --l == 0, iter);
});

L.flat = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      yield* a;
    } else {
      yield a;
    }
  }
};

L.keys = function* (obj) {
  for (const k in obj) yield k;
};

L.values = obj => L.map(k => obj[k], L.keys(obj));
L.entries = obj => L.map(k => [k, obj[k]], L.keys(obj));

const map = curry(pipe(L.map, takeAll));

const filter = curry(pipe(L.filter, takeAll));

const take = curry(pipe(L.take, takeAll));

const range = pipe(L.range, takeAll);

const flat = pipe(L.flat, takeAll);

const identity = a => a;

const head = pipe(L.take(1), reduce(identity));

const find = curry(pipe(L.filter, head));

const some = curry(pipe(
  L.map,
  L.takeUntil(Boolean),
  reduce(or),
  Boolean));

const every = curry(pipe(
  map,
  L.takeUntil(not),
  reduce(and),
  Boolean));

const fromEntries = pipe(
  L.map(([k, v]) => ({[k]: v})),
  reduce(Object.assign));

const sum = reduce(add);

const sumMap = curry(pipe(L.map, sum));