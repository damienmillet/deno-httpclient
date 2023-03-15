export const minNeededByMonth = (amount: number): number => {
  return amount / 43800;
};

export const minNeededByDay = (amount: number): number => {
  return minNeededByMonth(amount) * 60 * 24;
};

export const minNeededByHour = (amount: number): number => {
  return minNeededByDay(amount) / 60;
};

export const minNeededByMinute = (amount: number): number => {
  return minNeededByHour(amount) / 60;
};

export const average = (items: number[], count?: number): number => {
  items = count && items.length > count ? items.slice(-count) : items;
  return sum(items) / items.length;
};

export const sum = (items: number[]): number => {
  return items.reduce((a, b) => a + b);
};

export const min = (items: number[]): number => {
  return items.reduce((a, b) => Math.min(a, b));
};

export const max = (items: number[]): number => {
  return items.reduce((a, b) => Math.max(a, b));
};

export const median = (items: number[]): number => {
  const sorted = items.sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
};
