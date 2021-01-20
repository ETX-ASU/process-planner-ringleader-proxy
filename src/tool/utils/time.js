const HOUR = 3600; // seconds
const DAY = 24 * HOUR;

export const calculateTimeDiff = (now, date) => {
  const suffix = now > date ? " ago" : "";
  const biggerDate = now > date ? now : date;
  const smallerDate = now > date ? date : now;

  const difference = Math.floor((biggerDate - smallerDate) / 1000);
  const days = Math.floor(difference / DAY);
  const hours = Math.round((difference - days * DAY) / HOUR);

  if (days === 0 && hours === 0) {
    return "0h";
  }

  return `${days}d ${hours}h${suffix}`;
};
