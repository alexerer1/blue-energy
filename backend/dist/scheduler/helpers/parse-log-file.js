"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLogFile = void 0;
const custom_value_mapping_1 = require("./custom-value-mapping");
function parseLogFile(fileContent, fileDate) {
    const lines = fileContent
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);
    const results = [];
    for (let i = 0; i < lines.length; i += 2) {
        const timeLine = lines[i];
        const bufferLine = lines[i + 1] || '';
        const [hrStr, minStr] = timeLine.split(':');
        const hour = parseInt(hrStr, 10) || 0;
        const minute = parseInt(minStr, 10) || 0;
        const baseDate = new Date(fileDate.getFullYear(), fileDate.getMonth(), fileDate.getDate(), hour, minute);
        const chunkSize = 8;
        const cleanedBuffer = bufferLine.replace(/\s+/g, '').toLowerCase();
        let ringIndex = cleanedBuffer.indexOf('0000');
        if (ringIndex < 0) {
            ringIndex = cleanedBuffer.length;
        }
        let currentTimestamp = new Date(baseDate);
        let pointer = ringIndex - chunkSize;
        while (pointer >= 0) {
            const chunk = cleanedBuffer.slice(pointer, pointer + chunkSize);
            const reading = parseChunk(chunk, currentTimestamp);
            results.push(reading);
            pointer -= chunkSize;
            currentTimestamp = new Date(currentTimestamp.getTime() - 60000);
        }
        if (ringIndex + 4 < cleanedBuffer.length) {
            pointer = cleanedBuffer.length - chunkSize;
            while (pointer >= ringIndex + 4) {
                const chunk = cleanedBuffer.slice(pointer, pointer + chunkSize);
                const reading = parseChunk(chunk, currentTimestamp);
                results.push(reading);
                pointer -= chunkSize;
                currentTimestamp = new Date(currentTimestamp.getTime() - 60000);
            }
        }
    }
    results.reverse();
    return results;
}
exports.parseLogFile = parseLogFile;
function parseChunk(hexChunk, timestamp) {
    const matchArray = hexChunk.match(/.{1,2}/g) ?? [];
    const bytes = [...matchArray];
    while (bytes.length < 4) {
        bytes.push('00');
    }
    const statusRaw = parseInt(bytes[0] ?? '00', 16);
    const headtankNibble = highNibble(bytes[1]);
    const temperatureNibble = lowNibble(bytes[1]);
    const batteryNibble = highNibble(bytes[2]);
    const ACvoltNibble = lowNibble(bytes[2]);
    const enabledLoadsNibble = highNibble(bytes[3]);
    const balastNibble = lowNibble(bytes[3]);
    return {
        timestamp,
        statusRaw,
        headtankLevel: (0, custom_value_mapping_1.customValueMapping)(headtankNibble, 'headtank_level'),
        temperatureLevel: (0, custom_value_mapping_1.customValueMapping)(temperatureNibble, 'temperature_level'),
        batteryLevel: (0, custom_value_mapping_1.customValueMapping)(batteryNibble, 'batery_level'),
        ACvoltLevel: (0, custom_value_mapping_1.customValueMapping)(ACvoltNibble, 'ACvolt_level'),
        enabledLoads: (0, custom_value_mapping_1.customValueMapping)(enabledLoadsNibble, 'enabled_loads'),
        balast: (0, custom_value_mapping_1.customValueMapping)(balastNibble, 'balast'),
    };
}
function highNibble(byteStr) {
    return parseInt(byteStr[0], 16);
}
function lowNibble(byteStr) {
    return parseInt(byteStr[1], 16);
}
