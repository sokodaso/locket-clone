import {Box, Button, Card, Typography} from "@mui/material";
import {useParams} from "react-router";
import { useState} from "react";

function DeletePost() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { pid } = useParams();

      const handleDeletePost = async (e: any) => {
          e.preventDefault();
          setIsSubmitting(true);
          try{
              await fetch(`http://localhost:3000/api/posts/${pid}`, {
                  method: 'DELETE',
              });
          } catch (error) {
               console.error('Error deleting post:', error);
          }finally {
              setIsSubmitting(false);
          }
      };

  return (
    <Box>
        <Typography variant="h5">Delete Post</Typography>
        <Card sx={{padding: 2, marginTop: 2}}>
            <form method="post" onSubmit={handleDeletePost}>
                <Typography>Are you sure you want to delete this post?</Typography>
                <Button variant="contained" color="error" disabled={isSubmitting} type="submit">
                    {isSubmitting ? 'Deleting...' : 'Delete Post'}
                </Button>
            </form>
        </Card>
    </Box>
  );
}

export default DeletePost;