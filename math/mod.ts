
export const Match = {
  isPositive: (n: number) => n > 0,
  isNegative: (n: number) => n < 0,
  isNullOrPositive: (n: number) => n >= 0,
  isNullOrNegative: (n: number) => n <= 0,
  isZero: (n: number) => n === 0,
  isNotZero: (n: number) => n !== 0,
  isPair: (n: number) => n % 2 === 0,
  isUnpair: (n: number) => n % 2 !== 0,
  isInteger: (n: number) => Number.isInteger(n),
  isFloat: (n: number) => !Number.isInteger(n),
  isDivisible: (n: number, d: number) => n % d === 0,
  isNotDivisible: (n: number, d: number) => n % d !== 0,
  isBetween: (n: number, min: number, max: number) => n >= min && n <= max,
  isNotBetween: (n: number, min: number, max: number) => n < min || n > max,
  isUpper: (x: number, y: number) => x > y,
  isLower: (x: number, y: number) => x < y,
  isUpperOrEqual: (x: number, y: number) => x >= y,
  isLowerOrEqual: (x: number, y: number) => x <= y,
  isEqual: (x: number, y: number) => x === y,
  isNotEqual: (x: number, y: number) => x !== y,
  nand: (x: boolean, y: boolean) => !(x && y),
  nor: (x: boolean, y: boolean) => !(x || y),
  xor: (x: boolean, y: boolean) => (x || y) && !(x && y),
  xnor: (x: boolean, y: boolean) => (x && y) || !(x || y),
};

export const Mathx = {
  round: (n: number, d: number) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d),
  ceil: (n: number, d: number) => Math.ceil(n * Math.pow(10, d)) / Math.pow(10, d),
  floor: (n: number, d: number) => Math.floor(n * Math.pow(10, d)) / Math.pow(10, d),
  powerOf: (x: number, y: number) => Math.pow(x, y),
};
