import {Card, CardContent, Typography, Box} from "@mui/material";
import './PostItem.css';

function PostItem({title,content}: any){
    return (
        <Card className="post-card" >
            <Box className="post-image-placeholder">
                <Typography color="red">Image Placeholder</Typography>
            </Box>
            <CardContent className="post-text-content">
            <Typography variant ="h6" fontWeight="bold">
                {title}
            </Typography>
            <Typography variant ="body2" fontWeight="bold">
                {content}
            </Typography>
            </CardContent>
        </Card>
    );
}
export default PostItem;