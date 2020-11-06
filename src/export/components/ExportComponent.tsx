import React, { FC, useState } from 'react';
import { ActionProps, ApiClient } from 'admin-bro';
import { Box, Button, Loader } from '@admin-bro/design-system';
import { Parsers } from '../parsers/export.parser';
import { saveAs } from 'file-saver';
import format from 'date-fns/format';

const mimeTypes = {
  json: 'application/json',
};

const getFileName = extension =>
  `export-${format(Date.now(), 'yyyy-MM-dd_HH-mm')}.${extension}`;

const ExportComponent: FC<ActionProps> = ({ resource }) => {
  const [isFetching, setFetching] = useState();
  const [error, setError] = useState();

  if (isFetching) {
    return <Loader />;
  }

  if (error) {
    return <Box>Error: {error}</Box>;
  }

  const exportData = async (type: keyof typeof Parsers) => {
    const {
      data: { exportedData },
    } = await new ApiClient().resourceAction({
      method: 'post',
      resourceId: resource.id,
      actionName: 'export',
      params: {
        type,
      },
    });

    const blob = new Blob([exportedData], { type: mimeTypes[type] });
    saveAs(blob, getFileName(type));
  };

  return (
    <Box>
      <Button onClick={() => exportData('json')}>JSON</Button>
    </Box>
  );
};

export default ExportComponent;
