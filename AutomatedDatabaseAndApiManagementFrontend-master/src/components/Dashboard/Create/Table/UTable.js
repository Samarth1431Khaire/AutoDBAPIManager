import axios from "axios";
import MaterialTable from "material-table";
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const UTable = () => {
    // const got = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: 'Saslu', age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    //     { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    //     { id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    //     { id: 12, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    //     { id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    //     { id: 14, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    //     { id: 15, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // ]

    // const columns=[
    //     {title: 'ID', field: 'id'},
    //     {title: 'First Name', field: 'firstName'},
    //     {title: 'Last Name', field: 'lastName'},
    //     {title: 'Age', field: 'age'},
    // ];


    const [data, setData] = useState([]);
    const [name,changeName]= useState("");
    const [selectedRows, setSelectedRows] = useState([]);

    const [columns, changeColumn] = useState([]);

    // In above I have added the columns


    const handleBulkDelete = () => {
        const updatedData = data.filter(row => !selectedRows.includes(row))
        setData(updatedData);
    }

    useEffect(() => {
        console.log('hello');
        const did = localStorage.getItem('databaseid');
        const tid = localStorage.getItem('tableid');
        console.log(did);
        console.log(tid);
        axios.post("https://backend-fyp.herokuapp.com/api/frontend/getTableData", {
            "id": localStorage.getItem("id"),
            'tableId': tid,
            'dbId': did
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(
            response => {
                console.log(response);
                var a = response.data.data.tableColumns;
                var col = [];
                a.forEach((item) => {
                    col.push({ 'title': item.columnName, 'field': item.columnName, 'id': item._id })
                })
                console.log(col);
                changeColumn(col);
                setData(response.data.data.tableData);
                changeName(response.data.data.tableName);
            }
        ).catch(error => { console.log(error) });
    }, [])

    return (
        <div>
            <h4>User Table</h4>
            <MaterialTable
                title={name}
                data={data}
                columns={columns}
                options={{
                    selection: true
                }}
                onSelectionChange={(rows) => setSelectedRows(rows)}
                actions={
                    [
                        {
                            icon: 'delete',
                            tooltip: "Delete all selected..",
                            onClick: () => handleBulkDelete()
                        }
                    ]
                }

                editable={{
                    onRowAdd: (newRow) => new Promise((resolve, reject) => {
                        const updatedRows = [...data, newRow];
                        axios.post("https://backend-fyp.herokuapp.com/api/frontend/updateData", {
                            "id": localStorage.getItem("id"),
                            'tableId': localStorage.getItem('tableid'),
                            'dbId': localStorage.getItem('databaseid'),
                            'tableData':updatedRows
                        }, {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        }).then(
                            response => {
                                setTimeout(() => {
                                    setData(updatedRows)
                                    resolve()
                                }, 2000)
                                console.log(newRow)
                            }
                        ).catch(error => { console.log(error) });
                        
                    }),
                    onRowDelete: selectedRow => new Promise((resolve, reject) => {
                        console.log(selectedRow.tableData.id);
                        const index = selectedRow.tableData.id;
                        const updateRows = [...data]
                        updateRows.splice(index, 1)
                        
                        setTimeout(() => {
                            setData(updateRows)
                            resolve()
                        }, 2000)
                        //console.log(updateRows)
                    }),
                    onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
                        const index = oldRow.tableData.id
                        const updatedRows = [...data]
                        updatedRows[index] = updatedRow;

                        axios.post("https://backend-fyp.herokuapp.com/api/frontend/updateData", {
                            "id": localStorage.getItem("id"),
                            'tableId': localStorage.getItem('tableid'),
                            'dbId': localStorage.getItem('databaseid'),
                            'tableData':updatedRows
                        }, {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        }).then(
                            response => {
                                setTimeout(() => {
                                    setData(updatedRows)
                                    resolve()
                                }, 2000)
                            }
                        ).catch(error => { console.log(error) });
                        //console.log("updated row: ", newRow)
                    }),
                    onBulkUpdate: selectedRows => new Promise((resolve, reject) => {
                        const rows = Object.values(selectedRows)
                        const updatedRows = [...data]
                        let index;
                        rows.map(emp => {
                            index = emp.oldData.tableData.id;
                            updatedRows[index] = emp.newData;
                        })

                        axios.post("https://backend-fyp.herokuapp.com/api/frontend/updateData", {
                            "id": localStorage.getItem("id"),
                            'tableId': localStorage.getItem('tableid'),
                            'dbId': localStorage.getItem('databaseid'),
                            'tableData':updatedRows
                        }, {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        }).then(
                            response => {
                                setTimeout(() => {
                                    setData(updatedRows)
                                    resolve()
                                }, 2000)
                            }
                        ).catch(error => { console.log(error) });

                    })
                }}

            />
        </div>



    );
}

export default UTable;