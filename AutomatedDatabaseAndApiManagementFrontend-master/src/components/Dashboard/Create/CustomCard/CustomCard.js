import CardHeader from '@mui/material/CardHeader';
import {  CardActionArea, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
// import { DeleteOutlined } from '@mui/icons-material';
const CustomCard = (props) => {
    return ( 
            <Card elevation={3}>
                <CardActionArea onClick={()=>{props.uponClick(props.name,props.id)}}>
                <CardHeader
                    // action={
                    //     <IconButton onClick={()=>{
                    //         console.log('delete',props.name);
                    //         props.onDelete(props.name);
                    //     }}>
                    //         <DeleteOutlined/>
                    //     </IconButton>
                    // }
                    title={props.name}
                />
                </CardActionArea>
            </Card>
     );
}
 
export default CustomCard;