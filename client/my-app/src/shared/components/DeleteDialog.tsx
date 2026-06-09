import {Box, Button, Card, Typography, Dialog, DialogActions, DialogTitle,DialogContent} from "@mui/material";
import { useState} from "react";

function DeleteDialog({id, open, onClose, onDeleteRefresh}: any) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    console.log('id in delete dialog:', id);

      const handleDeletePost = async (e: any) => {
          e.preventDefault();
          setIsSubmitting(true);
          try{
              const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
                  method: 'DELETE',
              });
                if(response.ok){
                    onDeleteRefresh(id);
                    onClose();
                }else {
                    const data = await response.json();
                    throw new Error(data.message || 'Failed to delete post');
                }
          } catch (error) {
               console.error('Error deleting post:', error);
          }finally {
              setIsSubmitting(false);
          }
      };

  return (
    <Box>
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{fontWeight: 'bold'}}>Delete Post</DialogTitle>
            <Card sx={{padding: 2, marginTop: 2}}>
                <form id="delete-post-form" method="post" onSubmit={handleDeletePost}>
                    <DialogContent>
                        <Typography>Are you sure you want to delete this post?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="error" disabled={isSubmitting} type="submit">
                            {isSubmitting ? 'Deleting...' : 'Delete Post'}
                        </Button>
                        <Button variant="outlined" color="inherit" onClick={onClose} >
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </Card>
        </Dialog>
    </Box>
  );
}

export default DeleteDialog;