import TextField from '@mui/material/TextField';
import React from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useHistory } from 'react-router';
function Form() {

    const [isSending, changeSending] = React.useState(false);
    const [dname, changeDname] = React.useState("");
    const [tname, changeTname] = React.useState("");
    const [inputList, setInputList] = React.useState([{ columnName: "", columnConstraint: "" }]);
    var dbid;
    const history = useHistory();

    const onClickDatabase = (event) => {
        changeDname(event.target.value);
    }
    const onClickTable = (event) => {
        changeTname(event.target.value);
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, { columnName: "", columnConstraint: "" }]);
    };

    const onClickSubmit = () => {
        console.log(inputList);
        changeSending(true);
        console.log(localStorage.getItem('token'));
        axios.post("https://backend-fyp.herokuapp.com/api/frontend/addNewDatabase", {
            "dbDetails": { 'name': dname },
            "id": localStorage.getItem("id")
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {
            console.log('database created');
            console.log(response);
            dbid = response.data.dbId;
            axios.post("https://backend-fyp.herokuapp.com/api/frontend/addNewTable", {
                "tableName": tname,
                "tableColumns": inputList,
                "dbId": dbid,
                "id": localStorage.getItem('id')
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                changeSending(false);
                history.push('/dashboard/create');
            }).catch(error => console.log(error));


        }).catch(error => console.log(error));
    }
    return (
        <div>
            <h3>Enter Database Name</h3>
            <TextField required
                label="Required"
                value={dname}
                onChange={onClickDatabase} />
            <h3>Enter Table Name</h3>
            <TextField required
                label="Required"
                value={tname}
                onChange={onClickTable} />
            <h3>Enter column name and values</h3>
            {
                inputList.map((x, i) => {
                    return (
                        <div key={i}>
                            <TextField type='text' name="columnName" value={x.columnName} placeholder="Enter column Name" onChange={e => handleInputChange(e, i)} />
                            <Select
                                value={x.columnConstraint}
                                label="Column Constraint"
                                onChange={e => handleInputChange(e, i)}
                                name='columnConstraint'
                            >
                                <MenuItem value={'String'}>String</MenuItem>
                                <MenuItem value={'number'}>Number</MenuItem>
                            </Select>
                        </div>
                    );
                })


            }
            <br />
            <Button variant="outlined" onClick={handleAddClick}>Add column</Button>
            <Button variant="outlined" onClick={onClickSubmit} disabled={isSending}>Submit</Button>
        </div>
    )

}
export default Form;