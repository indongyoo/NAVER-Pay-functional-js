const {log, clear, dir} = console;

const curry = f => (a, ..._) =>
  _.length ? f(a, ..._) : (..._) => f(a, ..._);

const isIterable = iter => iter && iter[Symbol.iterator];

const add = (a, b) => a + b;

const identity = a => a;

const or = (a, b) => a || b;

const and = (a, b) => a && b;

const not = a => !a;

function* empty() {}

function toIer(iter) {
  return iter && iter[Symbol.iterator] ? iter[Symbol.iterator]() : empty();
}

const reduce = curry(function(f, acc, iter) {
  if (arguments.length == 2) {
    iter = toIer(acc);
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

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

L.take = curry(function* (l, iter) {
  for (const a of iter) {
    yield a;
    if (--l == 0) break;
  }
});

L.takeUntil = curry(function* (f, iter) {
  for (const a of iter) {
    yield a;
    if (f(a)) break;
  }
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

const takeAll = iter => {
   return [...iter];
};

const map = curry(pipe(L.map, takeAll));

const filter = curry(pipe(L.filter, takeAll));

const take = curry(pipe(L.take, takeAll));

const range = pipe(L.range, takeAll);

const flat = pipe(L.flat, takeAll);

const head = pipe(L.take(1), reduce(identity));

const find = curry(pipe(L.filter, head));

const baseBoolAll = (f1, f2) => curry(pipe(
  L.map,
  L.takeUntil(f1),
  reduce(f2),
  Boolean));

const every = baseBoolAll(not, and);

const some = baseBoolAll(Boolean, or);

const keys = pipe(L.keys, takeAll);

const values = pipe(L.values, takeAll);

const entries = pipe(L.entries, takeAll);

const fromEntries = entries =>
  reduce((obj, [k, v]) => (obj[k] = v, obj), {}, entries);

const pick = (ks, obj) =>
  reduce((obj2, k) => (obj2[k] = obj[k], obj2), {}, ks);