// helpers/custom-value-mapping.ts

/**
 * Replicates the logic of customValueMapping from the JS.
 * Converts raw hex (as an integer) into domain-specific values.
 */
export function customValueMapping(data: number, mapping: string): number {
  let newValue = 0;

  const headtankBase = 50,
    headtankMax = 100;
  const ACBaseline = 200,
    ACMax = 260;
  const tempBase = 23,
    tempMax = 68;
  const batteryBase = 10.3,
    batteryMax = 14.4;
  const enabledLoadsBase = 0,
    enabledLoadsMax = 15;
  const balastBase = 2.6,
    balastMax = 38.4;

  switch (mapping) {
    case 'enabled_loads':
      // 0–16 -> 0–15 (approx)
      newValue = enabledLoadsBase + Math.round((data * (enabledLoadsMax - enabledLoadsBase)) / 16);
      break;

    case 'balast':
      // 0–15 -> 2.6–38.4
      newValue = balastBase + Math.round((data * (balastMax - balastBase)) / 15);
      break;

    case 'headtank_level':
      // 0–16 -> 50–100
      newValue = headtankBase + Math.round((data * (headtankMax - headtankBase)) / 16);
      break;

    case 'ACvolt_level':
      // 0–15 -> 200–260
      // (data - 1) used in the original logic to scale from 1..15
      newValue = ACBaseline + Math.round(((data - 1) * (ACMax - ACBaseline)) / 15);
      break;

    case 'temperature_level':
      // 0–15 -> 23–68
      newValue = tempBase + Math.round(((data - 1) * (tempMax - tempBase)) / 15);
      break;

    case 'batery_level':
      // 0–16 -> 10.3–14.4
      newValue = Number((batteryBase + (data * (batteryMax - batteryBase)) / 16).toFixed(1));
      break;

    default:
      newValue = data;
      break;
  }

  return newValue;
}
