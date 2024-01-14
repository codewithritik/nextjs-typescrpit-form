import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

interface Props {
  columns: GridColDef | any;
  rows:  GridRowsProp;
}

const DataGridBase: React.FC<Props> = ({ rows, columns }) => {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} getRowId={(row: any) =>  row._id}
/>
    </div>
  );
};

export default DataGridBase;
