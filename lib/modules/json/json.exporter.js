"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonExporter = void 0;
const jsonExporter = (records) => {
    return JSON.stringify(records.map(r => r.params));
};
exports.jsonExporter = jsonExporter;
