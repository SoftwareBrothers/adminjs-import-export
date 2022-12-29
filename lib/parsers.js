"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parsers = void 0;
const json_exporter_1 = require("./modules/json/json.exporter");
const json_importer_1 = require("./modules/json/json.importer");
const csv_exporter_1 = require("./modules/csv/csv.exporter");
const xml_exporter_1 = require("./modules/xml/xml.exporter");
const csv_importer_1 = require("./modules/csv/csv.importer");
const xml_importer_1 = require("./modules/xml/xml.importer");
exports.Parsers = {
    json: { export: json_exporter_1.jsonExporter, import: json_importer_1.jsonImporter },
    csv: { export: csv_exporter_1.csvExporter, import: csv_importer_1.csvImporter },
    xml: { export: xml_exporter_1.xmlExporter, import: xml_importer_1.xmlImporter },
};
