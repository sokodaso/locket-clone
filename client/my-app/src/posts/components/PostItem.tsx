import {useState} from "react";
import Kebab from "../../shared/components/Kebab.tsx";
import UpdateDialog from "../../shared/components/UpdateDialog.tsx";
import DeleteDialog from "../../shared/components/DeleteDialog.tsx";
import {Card, CardContent, Typography, Box} from "@mui/material";
import './PostItem.css';

function PostItem({id, title,content, onUpdateRefresh, onDeleteRefresh}: any){
   const[isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
   const[isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    return (
        <Card className="post-card" >
            <Box className="post-image-placeholder">
                <Box className="kebab-container" sx={{position: 'absolute', right: '10px', zIndex: 10}}>
                    <Kebab onEdit={() => setIsUpdateDialogOpen(true)} onDelete={() => setIsDeleteDialogOpen(true)} />
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
            <UpdateDialog id={id} title={title} content={content} open={isUpdateDialogOpen} onClose={() => setIsUpdateDialogOpen(false)} onUpdateRefresh={onUpdateRefresh} />
            <DeleteDialog id={id} title={title} content={content} open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onDeleteRefresh={onDeleteRefresh}/> 
        </Card>
    );
}
export default PostItem;