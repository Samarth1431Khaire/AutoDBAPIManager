import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
function ManageApi() {

    const [isSending, changeSending] = useState(false);
    const [userData, changeUserData]= useState([]);



    useEffect(() => {
        var obj = {
            "id": localStorage.getItem("id"),
        };
        axios.post("https://backend-fyp.herokuapp.com/api/frontend/getUserRoutes", obj, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(
            response => {
                changeSending(true);
                console.log(response);
                changeUserData(response.data.routes);
            }
        ).catch(error => { console.log(error) });
    }, [])

    return (
        !isSending?
        <CircularProgress /> :
        <div>
            <h3>Manage API</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Route</TableCell>
                            <TableCell align="right">Database Name</TableCell>
                            <TableCell align="right">Table Name</TableCell>
                            <TableCell align="right">Notes</TableCell>
                            <TableCell align="right">Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userData.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.routeName}
                                </TableCell>
                                <TableCell align="right">{row.routeParams.databaseName}</TableCell>
                                <TableCell align="right">{row.routeParams.tableName}</TableCell>
                                <TableCell align="right">{row.routeParams.notes}</TableCell>
                                <TableCell align="right">{row.routeParams.type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}

export default ManageApi;