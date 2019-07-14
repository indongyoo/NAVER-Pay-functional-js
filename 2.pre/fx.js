const {log, clear, dir} = console;

const curry = f => (a, ..._) =>
  _.length ? f(a, ..._) : (..._) => f(a, ..._);

const reduce = curry(function(f, acc, iter) {
  if (arguments.length == 2) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

const go = (a, ...fs) => reduce((a, f) => f(a), a, fs);
const pipe = (f, ...fs) => (..._) => go(f(..._), ...fs);

const takeAll = iter => [...iter];

const add = (a, b) => a + b;

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

const baseIterF = f => curry(pipe(f, takeAll));
const take = baseIterF(L.take);
const map = baseIterF(L.map);
const filter = baseIterF(L.filter);
const range = pipe(L.range, takeAll);