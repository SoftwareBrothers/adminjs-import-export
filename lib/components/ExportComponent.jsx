"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExportedFileName = exports.mimeTypes = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const adminjs_1 = require("adminjs");
const design_system_1 = require("@adminjs/design-system");
const file_saver_1 = require("file-saver");
const exporter_type_1 = require("../exporter.type");
const format_1 = tslib_1.__importDefault(require("date-fns/format"));
exports.mimeTypes = {
    json: 'application/json',
    csv: 'text/csv',
    xml: 'text/xml',
};
const getExportedFileName = (extension) => `export-${(0, format_1.default)(Date.now(), 'yyyy-MM-dd_HH-mm')}.${extension}`;
exports.getExportedFileName = getExportedFileName;
const ExportComponent = ({ resource }) => {
    var _a;
    const filter = {};
    const prevPage = JSON.parse((_a = localStorage.getItem("prevPage")) !== null && _a !== void 0 ? _a : "{}");
    const prevFilter = new URLSearchParams(prevPage.search);
    let query = prevFilter !== null && prevFilter !== void 0 ? prevFilter : new URLSearchParams(location.search);
    for (const entry of query.entries()) {
        const [key, value] = entry;
        if (key.match('filters.')) {
            filter[key.replace('filters.', '')] = value;
        }
    }
    const [isFetching, setFetching] = (0, react_1.useState)();
    const sendNotice = (0, adminjs_1.useNotice)();
    const exportData = async (type) => {
        setFetching(true);
        try {
            const { data: { exportedData }, } = await new adminjs_1.ApiClient().resourceAction({
                method: 'post',
                resourceId: resource.id,
                actionName: 'export',
                params: {
                    type,
                    filter,
                },
            });
            const blob = new Blob([exportedData], { type: exports.mimeTypes[type] });
            (0, file_saver_1.saveAs)(blob, (0, exports.getExportedFileName)(type));
            sendNotice({ message: 'Exported successfully', type: 'success' });
        }
        catch (e) {
            sendNotice({ message: e.message, type: 'error' });
        }
        setFetching(false);
    };
    if (isFetching) {
        return <design_system_1.Loader />;
    }
    return (<design_system_1.Box>
      <design_system_1.Box display="flex" justifyContent="center">
        <design_system_1.Text variant="lg">Choose export format:</design_system_1.Text>
      </design_system_1.Box>
      <design_system_1.Box display="flex" justifyContent="center">
        {exporter_type_1.Exporters.map(parserType => (<design_system_1.Box key={parserType} m={2}>
            <design_system_1.Button onClick={() => exportData(parserType)} disabled={isFetching}>
              {parserType.toUpperCase()}
            </design_system_1.Button>
          </design_system_1.Box>))}
      </design_system_1.Box>
    </design_system_1.Box>);
};
exports.default = ExportComponent;
