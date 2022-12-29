"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonImporter = void 0;
const utils_1 = require("../../utils");
const jsonImporter = async (jsonString, resource) => {
    const records = JSON.parse(jsonString);
    return (0, utils_1.saveRecords)(records, resource);
};
exports.jsonImporter = jsonImporter;
