import React, { FC, useState } from 'react';
import { ActionProps, ApiClient, useNotice } from 'adminjs';
import {
  DropZoneItem,
  Loader,
  Box,
  Button,
  DropZone,
} from '@adminjs/design-system';

const ImportComponent: FC<ActionProps> = ({ resource }) => {
  const [file, setFile] = useState<null | File>(null);
  const sendNotice = useNotice();
  const [isFetching, setFetching] = useState<boolean>();

  const onUpload = (uploadedFile: File[]) => {
    setFile(uploadedFile?.[0] ?? null);
  };

  const onSubmit = async () => {
    if (!file) {
      return;
    }

    setFetching(true);
    try {
      const importData = new FormData();
      importData.append('file', file, file?.name);
      await new ApiClient().resourceAction({
        method: 'post',
        resourceId: resource.id,
        actionName: 'import',
        data: importData,
      });

      sendNotice({ message: 'Imported successfully', type: 'success' });
    } catch (e) {
      sendNotice({ message: e.message, type: 'error' });
    }
    setFetching(false);
  };

  if (isFetching) {
    return <Loader />;
  }

  return (
    <Box
      margin="auto"
      maxWidth={600}
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <DropZone files={[]} onChange={onUpload} multiple={false} />
      {file && (
        <DropZoneItem
          file={file}
          filename={file.name}
          onRemove={() => setFile(null)}
        />
      )}
      <Box display="flex" justifyContent="center" m={10}>
        <Button onClick={onSubmit} disabled={!file || isFetching}>
          Upload
        </Button>
      </Box>
    </Box>
  );
};

export default ImportComponent;
