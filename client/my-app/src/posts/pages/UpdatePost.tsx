import { Box, Button, Card, TextField, Typography } from "@mui/material";
import {useParams, useLocation} from "react-router";
import { useState} from "react";

function UpdatePost() {
    const location = useLocation();
    const { title: initialTitle, content: initialContent } = location.state || '';

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const { pid } = useParams();
    

      const handleUpdatePost = async (e: any) => {
          e.preventDefault();
          setIsSubmitting(true);
          try{
              await fetch(`http://localhost:3000/api/posts/${pid}`, {
                  method: 'PATCH',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      title: title,
                      content: content, 
                      authorId: '3'
                  })
              });
          } catch (error) {
               console.error('Error updating post:', error);
          }finally {
              setIsSubmitting(false);
          }
      };

  return (
    <Box>
        <Typography variant="h5">Update Post</Typography>
        <Card sx={{padding: 2, marginTop: 2}}>
            <form method="post" onSubmit={handleUpdatePost}>
                <TextField label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
                <TextField label="Content" variant="outlined" multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
                <Button variant="contained" color="primary" disabled={isSubmitting} type="submit">
                    {isSubmitting ? 'Updating...' : 'Update Post'}
                </Button>
            </form>
        </Card>
    </Box>
  );
}

export default UpdatePost;