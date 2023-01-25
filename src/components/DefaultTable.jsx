// create DetaultTable component with props for data and columns
//
import React from "react";
import DataTable from "react-data-table-component";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const DefaultTable = ({ data, columns, title, footer, enableFilter = true, disableBottomRow = false }) => {

    const conditionalRowStyles = disableBottomRow ? [] : [
        {
            when: row => {
                try {
                    return row.type.toLowerCase().includes("plan")
                } catch (error) {
                    console.log(error);
                    return false;
                }
            },
            style: {
                backgroundColor: "#30C5FF",
                userSelect: "none",
                color: "white",
            }
        }
    ];
    const handleScroll = (state) => {
        console.log(state);
    }
    const [rangeFilter, setRangeFilter] = React.useState([1, columns.length - 2]);

    const handleSliderChange = (event, newValue) => {
        setRangeFilter(newValue);
        console.log(newValue);
    };



    return (
        <div onScroll={handleScroll}>
            {enableFilter ? <Box sx={{ width: 300 }}>

                <Slider
                    size="small"
                    min={1}
                    value={rangeFilter}
                    max={columns.length - 2}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    onChange={handleSliderChange}
                />
            </Box> : <div></div>}
            <DataTable
                title={title}
                columns={enableFilter ? columns.map((column, index) => {
                    if ((index >= rangeFilter[0] && index <= rangeFilter[1]) || (index == 0 || index == columns.length - 1)) {
                        return column;
                    }
                    return null;
                }).filter((column) => column != null) : columns
                }
                data={data}
                footer={footer}
                striped={true}
                pagination
                paginationPerPage={100}
                highlightOnHover
                conditionalRowStyles={conditionalRowStyles}
                pointerOnHover
                responsive
            />
        </div>
    );
}

export default DefaultTable;
