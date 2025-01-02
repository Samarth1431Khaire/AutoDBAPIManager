import Container from '@mui/material/Container'
import { TextField } from '@material-ui/core';
import { useState } from 'react';
import { MenuItem } from '@material-ui/core';
import { useEffect } from 'react';
import axios from 'axios';
import { Select } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const Endpoints = () => {
    const [isSending, changeSending] = useState(false);
    const [database, setDatabase] = useState([]);
    const [table, setTable] = useState([]);
    const [response, setResponse] = useState([]);
    const [type, changeType] = useState('');
    const [tableName, changeTableName] = useState('');
    const [databaseName, changeDatabaseName] = useState('');
    const [answer, changeAnswer] = useState("");
    const[maindbid,changemaindbid]=useState("");
    const[maintableid,changemaintablebid]=useState("");
    const[maintype,changemaintype]=useState("");
    const[notes,changeNotes]=useState("");
    

    // const handleDatabaseChange = (event) => {
    //     changeDatabaseName(event.target.value);
    //     console.log(databaseName);
    // }
    // const handleTableChange = (event) => {
    //     changeTableName(event.target.value);
    // }
    // const handleTypeChange = (event) => {
    //     changeType(event.target.value);
    // }

    const onDatabaseClick = (name, dbid) => {
        console.log(dbid);
        changemaindbid(dbid);
        var a = [];
        console.log(name,dbid);
        response.forEach((item) => {
            if (name === item.dbName) {
                a = item.tableData;
            }
        });
        console.log(a);
        setTable(a);
        changeDatabaseName(name);
    }

    const onTableClick = (name, tableId) => {
        console.log(tableId);
        changemaintablebid(tableId);
        console.log('table=',name);
        changeTableName(name);
    }

    const onTypeClick=(value)=>{
        console.log(value);
        changemaintype(value);
        console.log('type',value);
        changeType(value);
    }

    const updateNotes=(event)=>{
        changeNotes(event.target.value);
    }

    const buttonClick=()=>{
        var obj={
            "dbId":maindbid,
            "tableId":maintableid,
            "id":localStorage.getItem("id"),
            "type":type,
            "databaseName":databaseName,
            "tableName":tableName,
            "notes":notes
        };
        console.log(obj);
        axios.post("https://backend-fyp.herokuapp.com/api/frontend/createApiRoute", obj,{
                headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }}).then(
                response => {
                    console.log(response);
                    changeAnswer(response.data.routeName)
                }
            ).catch(error => { console.log(error) });
    }

    useEffect(() => {
        console.log(localStorage.getItem('token'));
        if (localStorage.getItem("isAuthenticated"))
            axios.post("https://backend-fyp.herokuapp.com/api/frontend/viewDbs", {
                "id": localStorage.getItem("id"),
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(
                resp => {
                    // console.log(resp);
                    setResponse(resp.data.dbs);
                    // console.log(resp.data.dbs);
                    const a = [];
                    resp.data.dbs.forEach((item) => {
                        // console.log(item);
                        a.push({ 'name': item.dbName, 'dbid': item.dbId });
                        // console.log(a);
                        setDatabase((db) => {
                            db.push({ 'name': item.dbName, 'dbid': item.dbId })
                            return db;
                        })
                    });
                    // console.log(a);
                    // setDatabase(a);
                    // console.log(database);
                    changeSending(true);
                }
            ).catch(error => { console.log(error) });
    }, [])

    return (
        !isSending?
        <CircularProgress /> :
        <Container sx={{ m: 3 }}>
        <h3>Select Database</h3>
            <Select
                labelId="selectDatabase"
                id="selectDatabase"
                label="Database"
                value={databaseName}
                // onClick={(event) => { handleDatabaseChange(event) }}
            >
                {/* <MenuItem value="Hello">Hello</MenuItem> */}
                {database.map((item) => {
                    // console.log(item.name);
                     return (<MenuItem value={item.name} onClick={()=>{onDatabaseClick(item.name,item.dbid)}}>{item.name}</MenuItem>)
                })}
            </Select>

            <h3>Select Table</h3>
            <Select
                labelId="selectTable"
                label='selectTable'
                id="selectTable"
                value={tableName}
            >
                {table.map((item) => {
                    console.log(item);
                    return(<MenuItem  value={item.tableName} onClick={() => onTableClick(item.tableName, item.tableId)}>{item.tableName}</MenuItem>)
                })}
            </Select><br /><br />

            <h3>Select Type</h3>
            <Select
                labelId="selectype"
                id='selectType'
                label='selectType'
                value={type}
            >
                <MenuItem value={"Read"} onClick={() => onTypeClick("Read")}>{"Read"}</MenuItem>
                <MenuItem value={"Write"} onClick={() => onTypeClick("Write")}>{"Write"}</MenuItem>
                {/* {table.map((item) => {
                    <MenuItem value={item}>{item}</MenuItem>
                })} */}
            </Select><br /><br />
             <TextField
             id="notes"
             label="Notes"
             //defaultValue="/riddham/database1"
             value={notes}
             onChange={updateNotes}
             variant="standard"
         />
         <br/>
         <br/>

            <TextField
                id="standard-read-only-input"
                label="Endpoints"
                //defaultValue="/riddham/database1"
                value={answer}
                InputProps={{
                    readOnly: true,
                }}
                variant="standard"
            />
                <br/>
                <br/>

            
            <Button variant="outlined" onClick={()=>{buttonClick()}}>Get Endpoint</Button>

        </Container>
    );
}

export default Endpoints;
