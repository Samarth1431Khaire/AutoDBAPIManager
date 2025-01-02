// import React from 'react';
// import { Container } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import CustomCard from '../CustomCard/CustomCard';
// import CardHeader from '@mui/material/CardHeader';
// import {  CardActionArea } from '@mui/material';
// import Card from '@mui/material/Card';
// import DialogBox from '../DialogBox/DialogBox';
// import DatabaseForm from '../Form/DatabaseForm';
// import Divider from '@mui/material/Divider';
// function DatabaseName(props)
// {
//     // var arr=['1st database','2nd database','3rd database','4th database'];
//     // const [open, setOpen] = React.useState(false);
//     // const handleClickOpen = () => {
//     // setOpen(true);
//     // };
//     // const handleClose = () => {
//     // setOpen(false);
//     // };

//     const [displaytable,changetable]=React.useState([]);
//     return(
//         <div>
//         <Container>
//             <Grid container spacing={3}>
//                 {
//                 props.data.map((item)=>(
//                     <Grid item xs={12} md={6} lg={4}>
//                         <CustomCard name={item.dname}></CustomCard>
//                     </Grid>
//                 ))
//                 }
//                 {/* <Grid item xs={12} md={6} lg={4}>
                        
//                 <Card elevation={3}>
//                     <CardActionArea onClick={handleClickOpen}>
//                     <CardHeader
//                     title='Add database'
//                     />
//                     </CardActionArea>
//                 </Card>

//                 </Grid> */}
//             </Grid>
//         </Container>
//         {/* <DialogBox open={open} handleClose={handleClose} title="Enter Database Detail">
//             <DatabaseForm></DatabaseForm>
//         </DialogBox> */}
//         <br/><br/>
//         <Divider/>
//         <h3> Tables </h3>
//         {displaytable}
//         </div>

        

//     )
// }
// export default DatabaseName;