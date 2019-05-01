export const getValue = (actions, action) => {
  for (var key in actions) {
    if (actions[key] == action) return key;
  }
  return null;
};
