import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useFormStatus } from "react-dom";

function UpdatePost() {
   const {pending} = useFormStatus();

  return (
    <Box>
        <Typography variant="h5">Update Post</Typography>
        <Card sx={{padding: 2, marginTop: 2}}>
            <form method="post">
                <TextField label="Title" variant="outlined" />
                <TextField label="Content" variant="outlined" multiline rows={4} />
                <Button variant="contained" color="primary" disabled={pending}>
                    Update Post
                </Button>
            </form>
        </Card>
    </Box>
  );
}

export default UpdatePost;