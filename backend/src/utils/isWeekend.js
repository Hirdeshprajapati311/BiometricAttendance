export const isWeekend = (date = new Date()) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};
