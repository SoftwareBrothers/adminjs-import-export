"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundleComponents = void 0;
const tslib_1 = require("tslib");
const adminjs_1 = tslib_1.__importDefault(require("adminjs"));
const bundleComponents = () => {
    const EXPORT_COMPONENT = adminjs_1.default.bundle('../../src/components/ExportComponent');
    const IMPORT_COMPONENT = adminjs_1.default.bundle('../../src/components/ImportComponent');
    return { EXPORT_COMPONENT, IMPORT_COMPONENT };
};
exports.bundleComponents = bundleComponents;
