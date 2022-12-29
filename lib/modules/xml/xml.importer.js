"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xmlImporter = void 0;
const tslib_1 = require("tslib");
const xml2js_1 = tslib_1.__importDefault(require("xml2js"));
const utils_1 = require("../../utils");
const xmlImporter = async (xmlString, resource) => {
    const parser = new xml2js_1.default.Parser({ explicitArray: false });
    const { records: { record }, } = await parser.parseStringPromise(xmlString);
    return (0, utils_1.saveRecords)(record, resource);
};
exports.xmlImporter = xmlImporter;
