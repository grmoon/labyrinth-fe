export default ({ name, props }) => {
  const _enum = {
    [name]() {
      throw new Error(`${name} is an enum, it cannot instantiated.`);
    }
  }[name];

  _enum[Symbol.iterator] = () => {
    return props[Symbol.iterator]();
  };

  props.forEach(prop => {
    _enum[prop] = prop;
  });

  return _enum;
};
