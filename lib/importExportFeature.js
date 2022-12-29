"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminjs_1 = require("adminjs");
const bundleComponents_1 = require("./components/bundleComponents");
const utils_1 = require("./utils");
const export_handler_1 = require("./export.handler");
const import_handler_1 = require("./import.handler");
const { EXPORT_COMPONENT, IMPORT_COMPONENT } = (0, bundleComponents_1.bundleComponents)();
const importExportFeature = () => {
    return (0, adminjs_1.buildFeature)({
        actions: {
            export: {
                handler: (0, utils_1.postActionHandler)(export_handler_1.exportHandler),
                component: EXPORT_COMPONENT,
                actionType: 'resource',
                showFilter: true
            },
            import: {
                handler: (0, utils_1.postActionHandler)(import_handler_1.importHandler),
                component: IMPORT_COMPONENT,
                actionType: 'resource',
                showFilter: true
            },
        },
    });
};
exports.default = importExportFeature;
