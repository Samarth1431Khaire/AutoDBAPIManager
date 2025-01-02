// import React from 'react';
// import TextField from '@mui/material/TextField';
// import { Container } from '@mui/material';
// import Grid from '@mui/material/Grid';
// const TableForm = () => {
//     const [column,changeColumn]=React.useState([
//         {
//             columnName:'hello',
//             columnType:'Integer',
//             columnData:'data1' 
//         }
//     ]);
//     return ( 
//         <Container>
//             <h3>Enter column details</h3>
//             <Grid container rowSpacing={1}>
//                 {
//                     column.map((item)=>(
//                         <div>
//                         <Grid item >
//                             <TextField id="columnname" label="Column Name" variant="outlined" />
//                         </Grid>
//                         <Grid item >
//                             <TextField id="outlined-basic" label="Column Type" variant="outlined" />
//                         </Grid>
//                         </div>
//                     ))
//                 }
//             </Grid>
//         </Container>
//     );
// }
 
// export default TableForm;