import {Card, CardContent, Typography, Box} from "@mui/material";
import Kebab from "../../shared/Kebab.tsx";
import './PostItem.css';
import {useNavigate} from "react-router";


function PostItem({id, title,content}: any){
    const navigate = useNavigate();

    return (
        <Card className="post-card" >
            <Box className="post-image-placeholder">
                <Box className="kebab-container" sx={{position: 'absolute', right: '10px', zIndex: 10}}>
                    <Kebab onEdit={() => navigate(`/posts/${id}/edit`,{ state: {title, content} })} onDelete={() => navigate(`/posts/${id}/delete`)} />
                </Box>
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