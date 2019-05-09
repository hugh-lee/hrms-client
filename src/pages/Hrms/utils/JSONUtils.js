export const getValue = (actions, action) => {
  for (var key in actions) {
    if (actions[key] == action) return key;
  }
  return null;
};

export const getValueString = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
