const formReducer = (state, target) => {
  const { name, value, type, checked } = target;
  let finalValue;
  switch (type) {
    case 'checkbox':
      finalValue = checked;
      break;
    default:
      finalValue = value;
      break;
  }
  return {
    ...state,
    [name]: finalValue,
  };
};

export default formReducer;
