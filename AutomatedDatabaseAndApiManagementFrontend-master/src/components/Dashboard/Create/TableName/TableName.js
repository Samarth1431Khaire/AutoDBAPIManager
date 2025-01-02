// import { Container } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import CustomCard from '../CustomCard/CustomCard';
// import CardHeader from '@mui/material/CardHeader';
// import {  CardActionArea } from '@mui/material';
// import Card from '@mui/material/Card';
// import DialogBox from '../DialogBox/DialogBox';
// import TableForm from '../Form/TableForm';
// import React from 'react';
// function TableName()
// {
//     var arr=['1st table','2nd table','3rd table','4th table'];
//     const [open, setOpen] = React.useState(false);
//     const handleClickOpen = () => {
//     setOpen(true);
//     };
//     const handleClose = () => {
//     setOpen(false);
//     };
//     return(
//         <div>
//         <Container>
//             <Grid container spacing={3}>
//                 {
//                 arr.map((name)=>(
//                     <Grid item xs={12} md={6} lg={4}>
//                         <CustomCard name={name}></CustomCard>
//                     </Grid>
//                 ))
//                 }
//                 <Grid item xs={12} md={6} lg={4}>
//                     <Card elevation={3}>
//                         <CardActionArea onClick={handleClickOpen}>
//                         <CardHeader
//                         title='Add Table'
//                         />
//                         </CardActionArea>
//                     </Card>
//                 </Grid>
//             </Grid>
//         </Container>
//         <DialogBox open={open} handleClose={handleClose} title='Enter Table Details'>
//             <TableForm></TableForm>
//         </DialogBox>    
//         </div>
//     )
// }
// export default TableName;