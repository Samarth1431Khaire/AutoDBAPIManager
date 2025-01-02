import { Grid, Paper, Avatar, TextField, Button } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material//AddCircleOutlineOutlined';
import { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router';

const Signup = () => {

    const [isSending, changeSending] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();


    const changeEmail = (event) => {
        setEmail(event.target.value);
    }

    const changeName = (event) => {
        setName(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    const onSubmit = () => {
        changeSending(true);
        console.log(` name is ${name} email is ${email} and password is ${password}`);
        // localStorage.setItem("isAuthenticated",'true');
        const body = {
            name,
            email,
            password
        }
        // console.log(body);
        axios.post("https://backend-fyp.herokuapp.com/api/frontend/register", body).then(
            response => {
                console.log(response);
                console.log(response.data.id);
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("isAuthenticated","true");
                console.log(localStorage.getItem("id"))
                axios.post("https://backend-fyp.herokuapp.com/api/frontend/genAuthToken", {
                    "id": localStorage.getItem("id"),
                }).then(
                    response => {
                        console.log(response);
                        localStorage.setItem("token", response.data.token);
                        history.push('/dashboard');
                    }
                ).catch(error => { console.log(error)});
            }
        ).catch(error => {
            console.log(error)
            changeSending(false)
        }
        );
    }

    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <h4>Please fill this form to create an account !</h4>
                </Grid>
                <br />
                <form>
                    <TextField fullWidth label='Name' value={name} onChange={changeName} placeholder="Enter your name" /><br /><br />
                    <TextField fullWidth label='Email' value={email} onChange={changeEmail} placeholder="Enter your email" /><br /><br />
                    <TextField fullWidth label='Password' value={password} type='password' onChange={changePassword} placeholder="Enter your password" /><br /><br />
                    <Button type='button' variant='contained' color='primary' onClick={onSubmit} disabled={isSending}>Sign up</Button>
                </form>
            </Paper>
        </Grid>
    );
}

export default Signup;