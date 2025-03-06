/**
 * Plain interface describing a parsed reading from a log file.
 * If more fields are needed, just add them here.
 */
export interface ParsedReading {
  timestamp: Date;
  statusRaw: number;
  headtankLevel: number;
  temperatureLevel: number;
  batteryLevel: number;
  ACvoltLevel: number;
  enabledLoads: number;
  balast: number;
}
