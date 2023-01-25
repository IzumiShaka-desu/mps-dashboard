import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
//import api service
import DefaultTable from "../components/DefaultTable";
import ReactLoading from "react-loading";
import DefaultLoading from "../components/DefaultLoading";
import { getDetailWo } from "../api/ApiService";


function DetailWo() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [title, setTitle] = useState("");
    const [tableContent, setTableContent] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    let date = searchParams.get('date');
    let type = searchParams.get('type');
    let line = searchParams.get('line');
    let isFilterValid = date != null && type != null && line != null;
    useEffect(() => {
        const fetchData = async () => {
            if (isFilterValid) {
                setLoading(true);
                try {
                    let result = await getDetailWo({ date: date, type: type, line: line });
                    console.log(result.data);
                    setTitle(result.data.title);
                    setErrorMessage(null);
                    let rows = result.data.items;
                    // create array of columns based on rows keys
                    let columns = Object.keys(rows[0]).map((key) => {
                        let name = key;
                        // format name to be more readable (ex: "id" to "ID")
                        name = name.charAt(0).toUpperCase() + name.slice(1);
                        name = name.replace(/_/g, " ");



                        return {
                            // Header: key,
                            // accessor: key,
                            name: name,
                            selector: key,
                            sortable: true,

                            // width: "150px",
                        };
                    }
                    );
                    setTableContent({ columns: columns, rows: rows });
                    console.log({ columns: columns, rows: rows });

                } catch (error) {

                    setErrorMessage(error.message);
                }
                setLoading(false);




            } else {
                setErrorMessage("Filter tidak valid");
            }
        }
        fetchData();
    }, []);
    return loading ? (
        <DefaultLoading />
    ) : errorMessage == null ? (



        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Detail Wo</h1>
                    {/* <h1>{title}</h1> */}
                    {tableContent !== null ?
                        // <h6>{JSON.stringify(tableContent)}</h6>
                        <DefaultTable columns={tableContent.columns} data={tableContent.rows} title={title} enableFilter={false} />
                        :
                        <h6>sjakdj</h6>

                    }

                    {/* show {data.data.length} as paragraph react component*/}
                    {/* {tablesOfLines.map((tableOfLines) => {
                        console.log(tableOfLines);
                        return (
                            <div>
                                <DefaultTable key={tableOfLines.line} footer={tableOfLines.footer} columns={tableOfLines.columns} data={tableOfLines.rows.concat(tableOfLines.footer)} title={`Line ${tableOfLines.line}`} />
                            </div>
                        )

                    }
                    )} */}
                </div>
            </div>
        </div>
    ) : (
        <div className="container">
            <div className="row">
                <div className="col d-flex align-items-center justify-content-center text-center not-found-container">
                    <h1>{errorMessage}</h1>
                </div>
            </div>
        </div>
    );

}

export default DetailWo;
