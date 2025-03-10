"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customValueMapping = void 0;
function customValueMapping(data, mapping) {
    let newValue = 0;
    const headtankBase = 50, headtankMax = 100;
    const ACBaseline = 200, ACMax = 260;
    const tempBase = 23, tempMax = 68;
    const batteryBase = 10.3, batteryMax = 14.4;
    const enabledLoadsBase = 0, enabledLoadsMax = 15;
    const balastBase = 2.6, balastMax = 38.4;
    switch (mapping) {
        case 'enabled_loads':
            newValue = enabledLoadsBase + Math.round((data * (enabledLoadsMax - enabledLoadsBase)) / 16);
            break;
        case 'balast':
            newValue = balastBase + Math.round((data * (balastMax - balastBase)) / 15);
            break;
        case 'headtank_level':
            newValue = headtankBase + Math.round((data * (headtankMax - headtankBase)) / 16);
            break;
        case 'ACvolt_level':
            newValue = ACBaseline + Math.round(((data - 1) * (ACMax - ACBaseline)) / 15);
            break;
        case 'temperature_level':
            newValue = tempBase + Math.round(((data - 1) * (tempMax - tempBase)) / 15);
            break;
        case 'batery_level':
            newValue = Number((batteryBase + (data * (batteryMax - batteryBase)) / 16).toFixed(1));
            break;
        default:
            newValue = data;
            break;
    }
    return newValue;
}
exports.customValueMapping = customValueMapping;
