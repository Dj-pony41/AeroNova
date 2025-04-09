// src/common/utils/time.util.ts
export function appendTimezoneToEpoch(epochMs: number, tzOffset: number): number {
    const sign = tzOffset < 0 ? 1 : 0;
    const abs = Math.abs(tzOffset).toString().padStart(2, '0'); // ej: 04
    const suffix = `${sign}${abs}`; // ej: 104 o 003
    return Number(`${epochMs}${suffix}`);
  }
  
  export function extractTimezoneFromEpoch(encoded: number): {
    epoch: number;
    tzOffset: number;
  } {
    const raw = encoded.toString();
    const base = Number(raw.slice(0, -3));
    const sign = raw.charAt(raw.length - 3) === '1' ? -1 : 1;
    const offset = Number(raw.slice(-2));
    return {
      epoch: base,
      tzOffset: sign * offset,
    };
  }
  