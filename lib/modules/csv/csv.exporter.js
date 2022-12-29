"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvExporter = void 0;
const json2csv_1 = require("json2csv");
const csvExporter = (records) => {
    return (0, json2csv_1.parse)(records.map(r => r.params));
};
exports.csvExporter = csvExporter;
