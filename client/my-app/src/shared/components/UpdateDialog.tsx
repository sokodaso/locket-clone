import { Box, Button, Card, TextField,Dialog, DialogActions, DialogTitle,DialogContent} from "@mui/material";
import { useState, useContext} from "react";
import AuthContext from "../../context/Auth-Context";

function UpdateDialog({id, title, content, open, onClose, onUpdateRefresh}: any) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updatedTitle, setTitle] = useState(title);
    const [updatedContent, setContent] = useState(content);
    const authState = useContext(AuthContext);

      const handleUpdatePost = async (e: any) => {
          e.preventDefault();
          setIsSubmitting(true);
          try{
              const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
                  method: 'PATCH',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${authState.token}`
                  },
                  body: JSON.stringify({
                      title: updatedTitle,
                      content: updatedContent
                  })
              });
                if(response.ok){
                    onUpdateRefresh(id, updatedTitle, updatedContent);
                    onClose();
                    
                }else {
                    const data = await response.json();
                    throw new Error(data.message || 'Failed to update post');
                }
                
          } catch (error) {
               console.error('Error updating post:', error);
          }finally {
              setIsSubmitting(false);
          }
      };

  return (
    <Box >
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{fontWeight: 'bold'}}>Update Post</DialogTitle>
            <Card sx={{padding: 2, marginTop: 2}}>
                <form method="post" onSubmit={handleUpdatePost}>
                    <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        <TextField id="title" label="Title" variant="outlined" value={updatedTitle} onChange={(e) => setTitle(e.target.value)} />
                        <TextField id="content" label="Content" variant="outlined" multiline rows={4} value={updatedContent} onChange={(e) => setContent(e.target.value)} />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" disabled={isSubmitting} type="submit">
                            {isSubmitting ? 'Updating...' : 'Update Post'}
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

export default UpdateDialog;