import {CardContent, Typography,Avatar, Button} from "@mui/material";
import {Link} from "react-router";
import './UserItem.css';

function UserItem({id, name, email, posts}: any){
    return (
        
                <CardContent className="user-item-content">
                <Avatar alt={name} src={email} className="user-item-avatar"/>   
                <Typography variant="h6" className = "user-item-name">
                    {name}
                </Typography>
                 <Button component={Link} to={`/users/${id}/posts`} variant="contained" color="primary" className="user-item-button">
                    Posts: {posts}
                </Button>
            </CardContent>

           
    );
}

export default UserItem;