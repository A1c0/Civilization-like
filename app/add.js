const add = (...args) => {
  return args.reduce((a, b) => Number(a) + Number(b));
};

module.exports = {add};
