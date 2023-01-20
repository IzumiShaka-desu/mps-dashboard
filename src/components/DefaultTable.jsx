// create DetaultTable component with props for data and columns
//
import React from "react";
import DataTable from "react-data-table-component";

const DefaultTable = ({ data, columns, title }) => {
    return (
        <DataTable
            title={title}
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            pointerOnHover
            responsive
        />
    );
}

export default DefaultTable;
