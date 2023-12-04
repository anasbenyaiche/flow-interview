import React from "react";

import { ITrade } from "../types/allTypes";
import { StyledTable, customStyles } from "./table.styes";

interface ITableProps {
  columns: any;
  data: ITrade[];
}

const MarketDataTable: React.FC<ITableProps> = ({ data, columns }) => {
  const paginationOptions = {
    rowsPerPageText: "Rows per page:",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  return (
    <StyledTable
      theme="solarized"
      columns={columns}
      customStyles={customStyles}
      data={data}
      pagination
      paginationPerPage={10}
      paginationRowsPerPageOptions={[10, 20, 30]}
      paginationComponentOptions={paginationOptions}
    />
  );
};

export default MarketDataTable;
