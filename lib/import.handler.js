"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importHandler = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const util_1 = tslib_1.__importDefault(require("util"));
const utils_1 = require("./utils");
const readFile = util_1.default.promisify(fs_1.default.readFile);
const importHandler = async (request, response, context) => {
    const file = (0, utils_1.getFileFromRequest)(request);
    const importer = (0, utils_1.getImporterByFileName)(file.name);
    const fileContent = await readFile(file.path);
    await importer(fileContent.toString(), context.resource);
    return {};
};
exports.importHandler = importHandler;
