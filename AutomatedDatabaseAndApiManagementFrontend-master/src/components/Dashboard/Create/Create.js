import Divider from '@mui/material/Divider';
import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import CustomCard from './CustomCard/CustomCard';
import Button from '@mui/material/Button';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from 'react-router';

function Create() {
    const [isSending, changeSending] = React.useState(false);
    const [obj, changeObj] = React.useState([]);
    const [displaytable, changetable] = React.useState([]);
    var databaseSelectedId = "";
    var tableSelectedId = "";
    const history = useHistory();

    useEffect(() => {
        console.log(localStorage.getItem('token'));
        if (localStorage.getItem("isAuthenticated"))
            axios.post("https://backend-fyp.herokuapp.com/api/frontend/viewDbs", {
                "id": localStorage.getItem("id"),
            },{
                headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }}).then(
                response => {
                    changeObj(response.data.dbs);
                    changeSending(true);
                }
            ).catch(error => { console.log(error) });
    }, [])

    const tableClicked = (name,id) => {
        tableSelectedId = id;
        console.log(`table selected is ${tableSelectedId} and database selected is ${databaseSelectedId}`);
        history.push(`/table/`);
        localStorage.setItem('databaseid',databaseSelectedId);
        localStorage.setItem('tableid',tableSelectedId);
    }

    const tableDelete = (name) => {
    }

    const databaseClicked = (name,id) => {

        databaseSelectedId = id;
        var tableData = "";
        for (var i = 0; i < obj.length; i++)
            if (obj[i].dbName === name) {
                tableData = obj[i].tableData;
                break;
            }
        changetable(tableData.map((item, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
                <CustomCard name={item.tableName} uponClick={tableClicked} onDelete={tableDelete} id={item.tableId}></CustomCard>
            </Grid>
        )));
    }

    const databaseDelete = (name) => {
        // var d= obj.filter((items)=>{return items.dname!==name});
        // changeObj(d);
        // changetable([]);
    }


    return (
        !isSending ?
            <CircularProgress /> :
            <div>
                <h3> Databases </h3>
                <Container>
                    <Grid container spacing={3}>
                        {
                            obj.map((item, index) => (
                                <Grid item xs={12} md={6} lg={4} key={index}>
                                    <CustomCard name={item.dbName} uponClick={databaseClicked} onDelete={databaseDelete} id={item.dbId}></CustomCard>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Container>
                <br /><br />
                <Divider />
                <h3> Tables </h3>
                <Container>
                    <Grid container spacing={3}>
                        {displaytable}
                    </Grid>
                </Container>
                <br /><br />
                <Button variant="outlined" onClick={()=>{history.push('/dashboard/form')}}>Add table</Button>
            </div>
    )
}
export default Create;