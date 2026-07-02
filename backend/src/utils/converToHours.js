const convertToHours = (workHours) => {
  if (!workHours) return 0;

  const hourMatch = workHours.match(/(\d+)h/);
  const minuteMatch = workHours.match(/(\d+)m/);

  const hours = hourMatch ? Number(hourMatch[1]) : 0;
  const minutes = minuteMatch ? Number(minuteMatch[1]) : 0;

  return +(hours + minutes / 60).toFixed(2);
};

export default convertToHours;
