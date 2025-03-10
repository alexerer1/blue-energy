// helpers/parse-log-file.ts

import { customValueMapping } from './custom-value-mapping';

/**
 * Data about one reading
 */
export interface ParsedReading {
  timestamp: Date; // The precise minute of the reading
  statusRaw: number; // e.g. a status byte
  headtankLevel: number; // mapped
  temperatureLevel: number; // mapped
  batteryLevel: number; // mapped
  ACvoltLevel: number; // mapped
  enabledLoads: number; // mapped
  balast: number; // mapped
}

/**
 * Parse a single file content (the lines) into an array of `ParsedReading`.
 *
 * Example of lines:
 *   0:29
 *   00ff98c8a10199c8a1019ac8a1019b...0000a10195c8a10196c8a10197c8a101
 *   1:08
 *   00ffc0c8a101c1c8a101c2c8a101...
 *
 * For each line we have a HH:MM and then the buffer hex data.
 *
 */
export function parseLogFile(fileContent: string, fileDate: Date): ParsedReading[] {
  // Example assumption: the date is known from the filename. We will combine
  // that date with the HH:MM from each line to build a full timestamp.

  const lines = fileContent
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const results: ParsedReading[] = [];

  for (let i = 0; i < lines.length; i += 2) {
    // Lines come in pairs:
    //   line 1: "0:29" (the time)
    //   line 2: "00ff98c8a10199c8a1..." (the buffer)
    // Adjust if your file format is slightly different.
    const timeLine = lines[i];
    const bufferLine = lines[i + 1] || '';

    // Parse the time. Example: "0:29" -> combine with fileDate
    // We assume "H:MM" or "HH:MM".
    const [hrStr, minStr] = timeLine.split(':');
    const hour = parseInt(hrStr, 10) || 0;
    const minute = parseInt(minStr, 10) || 0;

    // Construct a base date for this buffer line:
    const baseDate = new Date(
      fileDate.getFullYear(),
      fileDate.getMonth(),
      fileDate.getDate(),
      hour,
      minute
    );

    // The buffer typically starts with "00ff" or something similar
    // and includes multiple 8-hex-chunk readings. The "0000" marks
    // the "split" in the ring buffer.
    //
    // Each 8-hex chunk is something like: 98c8a101
    // That might break down as 4 bytes:
    //   [ 98, c8, a1, 01 ]
    //
    // The JS code basically searches for "0000" in the hex string
    // to know how to walk backward in time.
    // Below is a simpler approach: we just locate "0000" and interpret
    // the data on either side. Each reading is 8 hex digits => 4 bytes.
    //
    const chunkSize = 8;
    // Example: remove whitespace, ensure everything is lower-case, etc.
    const cleanedBuffer = bufferLine.replace(/\s+/g, '').toLowerCase();

    // We find the index of "0000" in the buffer.
    // That indicates how far the ring has advanced.
    // There's typically only 1 occurrence.
    let ringIndex = cleanedBuffer.indexOf('0000');
    if (ringIndex < 0) {
      // no "0000" found -> treat the entire line as one "full" buffer or something
      ringIndex = cleanedBuffer.length; // or -1 indicates we didn't find it
    }

    // We'll read the ring in two passes:
    //   1) from ringIndex backwards to 0
    //   2) from the end of the buffer to ringIndex+4 (since '0000' is 4 hex digits)
    //
    // Each reading is 8 hex characters => chunkSize=8 => 4 bytes
    // Each reading is done once a minute, going backwards in time from the baseDate.
    // The JS does minute steps for each chunk moving backward.
    //
    // We'll step backward from the ringIndex in increments of chunkSize.
    // Then we do the "wrap around" from the end.
    //
    let currentTimestamp = new Date(baseDate);

    // 1) Move backward from ringIndex
    let pointer = ringIndex - chunkSize;
    while (pointer >= 0) {
      const chunk = cleanedBuffer.slice(pointer, pointer + chunkSize);
      const reading = parseChunk(chunk, currentTimestamp);
      results.push(reading);

      // Move pointer and time back 1 minute
      pointer -= chunkSize;
      currentTimestamp = new Date(currentTimestamp.getTime() - 60_000);
    }

    // 2) If the ring is full, proceed from the end of buffer down to ringIndex+4
    //    (the '4' because "0000" is 4 hex digits, so the actual reading restarts after that)
    if (ringIndex + 4 < cleanedBuffer.length) {
      // ringIndex + 4 => skip the '0000'
      pointer = cleanedBuffer.length - chunkSize;
      while (pointer >= ringIndex + 4) {
        const chunk = cleanedBuffer.slice(pointer, pointer + chunkSize);
        const reading = parseChunk(chunk, currentTimestamp);
        results.push(reading);

        pointer -= chunkSize;
        currentTimestamp = new Date(currentTimestamp.getTime() - 60_000);
      }
    }
  }

  // We reversed them in time, so final results are from newest to oldest in each line.
  // If you prefer chronological order, reverse it:
  results.reverse();
  return results;
}

/**
 * Interpret a chunk of 8 hex digits into a reading.
 *  - The first byte might be a status code.
 *  - The second nibble is e.g. headtank
 *  - etc...
 * For demonstration, we match the logic from the JS:
 *   [statusByte, nibble1, nibble2, nibble3]
 * The JS code effectively does parseInt(datalist[ logsWrittenToFileIndex ][ j ],16)
 * plus customValueMapping on each nibble.
 */
function parseChunk(hexChunk: string, timestamp: Date): ParsedReading {
  // hexChunk: e.g. "98c8a101"
  // break into 4 bytes => [ "98", "c8", "a1", "01" ]
  const matchArray = hexChunk.match(/.{1,2}/g) ?? [];

  // Convert it into a normal mutable array
  const bytes = [...matchArray]; // now type is string[], not read-only

  // If fewer than 4 matches, push '00' until we have 4 elements
  while (bytes.length < 4) {
    bytes.push('00');
  }

  // Because `bytes[0]` could still be `undefined` (if the string is empty),
  // provide a fallback '00':
  const statusRaw = parseInt(bytes[0] ?? '00', 16);

  // The JS parted each byte into nibbles. e.g. byte 0 => nibble hi/lo
  // But your data might differ. Adjust as needed.
  // Suppose from JS:
  //   parseInt(datalist[ ... ][ j ], 16) => status
  //   Then the next byte's hi nibble => headtank, lo nibble => temperature, etc
  //
  // As a simpler approach, let's replicate “datalist[...][j+1].slice(0,1)” in JS:
  //   means the high nibble of byte #2. We'll do that with bit-shifts or string slicing.

  // For demonstration, let's interpret each byte’s high nibble and low nibble:
  const headtankNibble = highNibble(bytes[1]);
  const temperatureNibble = lowNibble(bytes[1]);
  const batteryNibble = highNibble(bytes[2]);
  const ACvoltNibble = lowNibble(bytes[2]);
  const enabledLoadsNibble = highNibble(bytes[3]);
  const balastNibble = lowNibble(bytes[3]);

  return {
    timestamp,
    statusRaw,
    headtankLevel: customValueMapping(headtankNibble, 'headtank_level'),
    temperatureLevel: customValueMapping(temperatureNibble, 'temperature_level'),
    batteryLevel: customValueMapping(batteryNibble, 'batery_level'),
    ACvoltLevel: customValueMapping(ACvoltNibble, 'ACvolt_level'),
    enabledLoads: customValueMapping(enabledLoadsNibble, 'enabled_loads'),
    balast: customValueMapping(balastNibble, 'balast'),
  };
}

/**
 * Get the high nibble of a byte (passed as a two-char hex string).
 * E.g. 'c8' -> 0xC -> decimal 12.
 */
function highNibble(byteStr: string): number {
  // 'c8' => parseInt('c',16) => 12
  return parseInt(byteStr[0], 16);
}

/**
 * Get the low nibble of a byte.
 * E.g. 'c8' -> 0x8 -> decimal 8.
 */
function lowNibble(byteStr: string): number {
  return parseInt(byteStr[1], 16);
}
