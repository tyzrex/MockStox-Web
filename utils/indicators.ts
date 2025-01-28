import { SMA, RSI } from "technicalindicators";

export function calculateSMA(data: number[], period: number): number[] {
  const sma: number[] = [];
  for (let i = period - 1; i < data.length; i++) {
    const sum = data
      .slice(i - period + 1, i + 1)
      .reduce((acc, val) => acc + val, 0);
    sma.push(sum / period);
  }
  return sma;
}

export function calculateRSI(data: number[], period = 14): number[] {
  const rsi = new RSI({ period, values: data });
  return rsi.getResult();
}

interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
}

function isBullishEngulfing(prev: Candle, current: Candle): boolean {
  return (
    prev.close < prev.open &&
    current.close > current.open &&
    current.close > prev.open &&
    current.open < prev.close
  );
}

function isBearishEngulfing(prev: Candle, current: Candle): boolean {
  return (
    prev.close > prev.open &&
    current.close < current.open &&
    current.close < prev.open &&
    current.open > prev.close
  );
}

function isDoji(candle: Candle): boolean {
  const bodySize = Math.abs(candle.open - candle.close);
  const totalSize = candle.high - candle.low;
  return bodySize / totalSize < 0.1;
}

function isHammer(candle: Candle): boolean {
  const bodySize = Math.abs(candle.open - candle.close);
  const lowerShadow = Math.min(candle.open, candle.close) - candle.low;
  const upperShadow = candle.high - Math.max(candle.open, candle.close);
  return lowerShadow > 2 * bodySize && upperShadow < bodySize;
}

function isInvertedHammer(candle: Candle): boolean {
  const bodySize = Math.abs(candle.open - candle.close);
  const lowerShadow = Math.min(candle.open, candle.close) - candle.low;
  const upperShadow = candle.high - Math.max(candle.open, candle.close);
  return upperShadow > 2 * bodySize && lowerShadow < bodySize;
}

function isMorningStar(first: Candle, second: Candle, third: Candle): boolean {
  return (
    first.close < first.open &&
    Math.abs(second.open - second.close) <
      Math.abs(first.open - first.close) * 0.3 &&
    third.close > third.open &&
    third.close > (first.open + first.close) / 2
  );
}

function isEveningStar(first: Candle, second: Candle, third: Candle): boolean {
  return (
    first.close > first.open &&
    Math.abs(second.open - second.close) <
      Math.abs(first.open - first.close) * 0.3 &&
    third.close < third.open &&
    third.close < (first.open + first.close) / 2
  );
}

export function identifyPatterns(
  data: Candle[]
): { pattern: string; index: number }[] {
  const patterns = [];

  for (let i = 2; i < data.length; i++) {
    if (isBullishEngulfing(data[i - 1], data[i])) {
      patterns.push({ pattern: "Bullish Engulfing", index: i });
    }
    if (isBearishEngulfing(data[i - 1], data[i])) {
      patterns.push({ pattern: "Bearish Engulfing", index: i });
    }
    if (isDoji(data[i])) {
      patterns.push({ pattern: "Doji", index: i });
    }
    if (isHammer(data[i])) {
      patterns.push({ pattern: "Hammer", index: i });
    }
    if (isInvertedHammer(data[i])) {
      patterns.push({ pattern: "Inverted Hammer", index: i });
    }
    if (isMorningStar(data[i - 2], data[i - 1], data[i])) {
      patterns.push({ pattern: "Morning Star", index: i });
    }
    if (isEveningStar(data[i - 2], data[i - 1], data[i])) {
      patterns.push({ pattern: "Evening Star", index: i });
    }
  }

  return patterns;
}
