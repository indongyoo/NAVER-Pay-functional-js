const {log, clear, dir} = console;

const curry = f => (a, ..._) =>
  _.length ? f(a, ..._) : (..._) => f(a, ..._);

const isIterable = iter => iter && iter[Symbol.iterator];

const add = (a, b) => a + b;

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

L.flat = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      yield* a;
    } else {
      yield a;
    }
  }
};

const map = curry(function (..._) {
  return [...L.map(..._)];
});

const filter = curry(function (..._) {
  return [...L.filter(..._)];
});

const take = curry(function(..._) {
  return [...L.take(..._)];
});

const range = function(..._) {
  return [...L.range(..._)];
};

const flat = function (iter) {
  return [...L.flat(iter)];
};