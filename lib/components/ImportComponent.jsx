"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const adminjs_1 = require("adminjs");
const design_system_1 = require("@adminjs/design-system");
const ImportComponent = ({ resource }) => {
    const [file, setFile] = (0, react_1.useState)(null);
    const sendNotice = (0, adminjs_1.useNotice)();
    const [isFetching, setFetching] = (0, react_1.useState)();
    const onUpload = (uploadedFile) => {
        var _a;
        setFile((_a = uploadedFile === null || uploadedFile === void 0 ? void 0 : uploadedFile[0]) !== null && _a !== void 0 ? _a : null);
    };
    const onSubmit = async () => {
        if (!file) {
            return;
        }
        setFetching(true);
        try {
            const importData = new FormData();
            importData.append('file', file, file === null || file === void 0 ? void 0 : file.name);
            await new adminjs_1.ApiClient().resourceAction({
                method: 'post',
                resourceId: resource.id,
                actionName: 'import',
                data: importData,
            });
            sendNotice({ message: 'Imported successfully', type: 'success' });
        }
        catch (e) {
            sendNotice({ message: e.message, type: 'error' });
        }
        setFetching(false);
    };
    if (isFetching) {
        return <design_system_1.Loader />;
    }
    return (<design_system_1.Box margin="auto" maxWidth={600} display="flex" justifyContent="center" flexDirection="column">
      <design_system_1.DropZone files={[]} onChange={onUpload} multiple={false}/>
      {file && (<design_system_1.DropZoneItem file={file} filename={file.name} onRemove={() => setFile(null)}/>)}
      <design_system_1.Box display="flex" justifyContent="center" m={10}>
        <design_system_1.Button onClick={onSubmit} disabled={!file || isFetching}>
          Upload
        </design_system_1.Button>
      </design_system_1.Box>
    </design_system_1.Box>);
};
exports.default = ImportComponent;
