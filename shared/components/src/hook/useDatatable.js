import { useState, useCallback } from 'react';

const useDatatable = () => {
  const [gridApi, setGridApi] = useState(null);

  const getRowNodeId = useCallback((row) => row.id, []);
  const emptySource = {
    rowCount: null,
    getRows: (rowParams) => rowParams.successCallback([], 0),
  };
  const gridReadyHandler = useCallback((params) => {
    setGridApi(params.api);
    // params.api.setDatasource(emptySource);
  }, []);

  return {
    gridApi,
    setGridApi,
    getRowNodeId,
    onGridReady: gridReadyHandler,
    emptySource,
  };
};

export default useDatatable;
