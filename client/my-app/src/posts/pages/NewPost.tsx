import {Box, Typography, Button, TextField,Card} from "@mui/material";
import {useState} from 'react';

function NewPost() {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');

    const handleCreatePost = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        try{
            await fetch(`http://localhost:3000/api/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    content: content, 
                    authorId: '2'
                })
            });
        } catch (error) {
             console.error('Error submitting post:', error);
        }finally {
            setIsSubmitting(false);
        }
    };

  return (
    <Box>
        <Typography variant="h5">New Post</Typography>
        <Card sx={{padding: 2, marginTop: 2}}>
            <form method="post" onSubmit={handleCreatePost}>
                <TextField label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
                <TextField label="Content" variant="outlined" multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
                <Button  type="submit" variant="contained" color="primary">
                    {isSubmitting ? 'Submitting...' : 'Create Post'}
                </Button>
            </form>
        </Card>

    </Box>
  );
}

export default NewPost;