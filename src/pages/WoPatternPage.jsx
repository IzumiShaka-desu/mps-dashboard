// create page with preload data get data from API if data is available show datatable
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import api service
import { getWo } from "../api/ApiService";
import { Row, Col, Container } from "react-bootstrap";
//import DefaultTable component
import DefaultTable from "../components/DefaultTable";


import ReactLoading from "react-loading";
import DefaultLoading from "../components/DefaultLoading";



//create WoPatternPage component with loading state
const WoPatternPage = () => {
    const [loading, setLoading] = useState(true);
    // const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [title, setTitle] = useState("");
    const [tablesOfLines, setTablesOfLines] = useState([]);


    //useEffect hook to fetch data from API using async await and if error show error message
    useEffect(() => {

        const fetchData = async () => {
            try {
                const result = await getWo();

                console.log(result.data);
                // setData(result.data);

                setTitle(result.data.title);
                setErrorMessage(null);
                let date = new Date()
                let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                // create array of Date(object) from first day of this month to last day of this month
                let dateOfThisMonth = Array.from(new Array(lastDay.getDate()), (val, index) => new Date(date.getFullYear(), date.getMonth(), index + 1));
                const getRowsArray = (lineData, dateOfThisMonth) => {
                    let typesOfThisLine = lineData.data.map((item) => {
                        return item.type;
                    });


                    let rowsArray = typesOfThisLine.map((type, index) => {
                        let data = lineData.data[index];
                        let obj = {
                            type: type,
                            ...data,
                        }
                        dateOfThisMonth.map((date) => {
                            let timeInMs = date.valueOf();
                            // Mengubah milidetik
                            timeInMs += 7 * 60 * 60 * 1000; // Tambahkan 7 jam
                            // let fixedDateStr = new Date(timeInMs).toISOString().split('T')[0];
                            let fixedDateStr = new Date(timeInMs).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });

                            let dateStr2 = new Date(date).toISOString().split('T')[0];
                            let indexItem = data.data.findIndex((item) => {
                                // console.log(item);
                                let dateStr = new Date(item.date).toISOString().split('T')[0];

                                return dateStr === dateStr2;
                            })

                            if (indexItem >= 0) {
                                // let dateStr = new Date(data.data[indexItem].date).toISOString().split('T')[0];
                                obj[fixedDateStr] = (`${data.data[indexItem].total}`)
                            } else {
                                obj[fixedDateStr] = ("-")
                            }
                            return 0;
                        });
                        obj["total"] = (data.total)


                        return obj;
                    });
                    return rowsArray;
                };
                //items is array of line
                let tablesOfLines = result.data.items.map((item) => {
                    // item is line object with line and data
                    var columns = [
                        //     {
                        //     name: "Line",
                        //     selector: "line",
                        //     sortable: true,

                        // },
                        {
                            name: "Type",
                            selector: "type",
                            sortable: true,
                            width: "150px",


                        },
                    ];
                    dateOfThisMonth.map((date) => {
                        let timeInMs = date.valueOf();
                        // Mengubah milidetik
                        timeInMs += 7 * 60 * 60 * 1000; // Tambahkan 7 jam
                        // let fixedDateStr = new Date(timeInMs).toISOString().split('T')[0];
                        //format to ex:22-Des
                        let fixedDateStr = new Date(timeInMs).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
                        // check if day is sunday or saturday
                        let day = new Date(timeInMs).getDay();
                        let isWeekend = day === 0 || day === 6;


                        let column = {
                            name: fixedDateStr,
                            selector: fixedDateStr,
                            sortable: false,
                            cell: (row, index, column, id) => {
                                console.log(row);
                                console.log(index);
                                console.log(item);

                                console.log(column);
                                return <Link style={{
                                    color: "#000",
                                    textDecoration: "none",
                                }} to={`/WO-Pattern/details?date=${date.toISOString()}&type=${row.type}&line=${item.line}`} preventScrollReset={true}>{row[column.selector]}</Link>
                            }
                        }
                        if (isWeekend) {
                            column["style"] = {
                                backgroundColor: "red",
                                color: "white",
                            }
                        }

                        columns.push(column);
                        return 0;
                    });
                    columns.push({
                        name: "Total",
                        selector: "total",
                        sortable: true,

                    });
                    // console.log(columns);
                    // var rows = item.data.map((lineData) => {
                    //     console.log(lineData);
                    //     // lineData is object with type, data, and total
                    //     // var row = getRowsArray(lineData, dateOfThisMonth);
                    //     let row = [];
                    //     return row;
                    // });
                    let bottomRow = {
                        type: "Plan",
                    }
                    let rows = getRowsArray(item, dateOfThisMonth);
                    dateOfThisMonth.map((date) => {
                        let timeInMs = date.valueOf();
                        // Mengubah milidetik
                        timeInMs += 7 * 60 * 60 * 1000; // Tambahkan 7 jam
                        // let fixedDateStr = new Date(timeInMs).toISOString().split('T')[0];
                        let fixedDateStr = new Date(timeInMs).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
                        let dataByDate = rows.filter((item) => {
                            return item[fixedDateStr] !== "-";
                        });
                        // assign count of dataByDate to bottomRow[fixedDateStr]
                        bottomRow[fixedDateStr] = dataByDate.length;

                        return 0;

                    });
                    bottomRow["total"] = rows.map((item) => { return item.total }).reduce((a, b) => a + b, 0);

                    console.log(rows);

                    return {
                        line: item.line,
                        columns: columns,
                        rows: rows,
                        footer: bottomRow,
                    }
                });
                console.log(tablesOfLines);
                setTablesOfLines(tablesOfLines);
                setLoading(false);

            } catch (error) {
                console.log(error);
                setErrorMessage(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);




    // if state is loading show loading animation else show DefaultTable component
    return loading ? (
        // show loading animation in center
        <DefaultLoading />
    ) : errorMessage == null ? (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>{title}</h1>
                    {/* show {data.data.length} as paragraph react component*/}
                    {tablesOfLines.map((tableOfLines) => {
                        console.log(tableOfLines);
                        return (
                            <div>
                                <DefaultTable key={tableOfLines.line} footer={tableOfLines.footer} columns={tableOfLines.columns} data={tableOfLines.rows.concat(tableOfLines.footer)} title={`Line ${tableOfLines.line}`} />
                            </div>
                        )

                    }
                    )}


                </div>
            </div>
        </div>
    ) : (
        // show error message if error occurs
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Wps</h1>
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                </div>
            </div>
        </div>
    )
        ;

};





export default WoPatternPage;