import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import axios from 'axios'

const Accounts = () => {

  const [apikey, changeApikey] = React.useState('');

  useEffect(() => {
    axios.post("https://backend-fyp.herokuapp.com/api/frontend/getApikey", {
      "id": localStorage.getItem("id"),
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(
      response => {
        console.log(response);
        changeApikey(response.data.api);
      }
    ).catch(error => { console.log(error) });
  },[])

  return (

    <Container>
      <h3>Username</h3>
      <Divider />
      <TextField
        disabled
        id="outlined-disabled"
        value='Riddham'
        margin='normal'
      />
      <h3>API Key</h3>
      <Divider />

      <TextField
        disabled
        id="outlined-disabled"
        value={apikey}
        margin='normal'
      />

    </Container>

  );
}

export default Accounts;
