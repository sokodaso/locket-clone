import {Box, Typography, Button, TextField,Card} from "@mui/material";
import {useState, useContext} from 'react';
import AuthContext from "../../context/Auth-Context";
import { useMediaHandler } from "../../hooks/useMedia";
import { UploadButton } from "../components/UploadButton";


function NewPost() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const authState = useContext(AuthContext);
    const {fileInputRef, selectedFile, previewUrl, error, handleFileUpload,handleReset } = useMediaHandler();

    // Function to handle file upload and create a new post with the uploaded file
    const handleCreatePost = async (e: any) => {
        e.preventDefault();
        if(!selectedFile) 
            return alert('Please upload a hang first');

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('image', selectedFile);

            const response = await fetch(`http://localhost:3000/api/posts`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authState.token}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start',gap: 4, padding: 2 }}>
        <Box sx={{ display: 'flex', marginRight: 2,mt: 1 ,alignItems: 'center', gap: 2 }}>
            <Typography variant="h5">New Hang</Typography>
        </Box>
        <Box component="form" onSubmit={handleCreatePost} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}>
            <Card sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {previewUrl ? null:  (
                    <Typography variant="h6">Start Hanging</Typography>
                )}
                <UploadButton 
                    fileInputRef={fileInputRef}
                    previewUrl={previewUrl}
                    error={error}
                    onFileUpload={handleFileUpload}
                    onReset={handleReset}
                />
                {error && <Typography color="error">{error}</Typography>}
                {previewUrl && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200 }} />
                    </Box>
                )}
            </Card>
            <TextField label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextField label="Content" variant="outlined" multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
            <Button  type="submit" variant="contained" color="primary">
                {isSubmitting ? 'Submitting...' : 'Create Hang'}
            </Button>
        </Box>
    </Box>
  );
}

export default NewPost;