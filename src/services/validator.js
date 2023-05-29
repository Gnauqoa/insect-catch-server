const isMinute = (value) => {
  return value >= 0 && value <= 60;
};
const isHour = (value) => {
  return value >= 0 && value <= 24;
};

export { isMinute, isHour };
