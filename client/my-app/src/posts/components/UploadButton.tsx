import React from 'react';
import { Box, Button} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface UploadButtonProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>; //Ref to the hidden file input element
  previewUrl: string | null; // URL of the captured or uploaded image for preview
  error: string | null; // Error message if any error occurs during media handling
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle file uploa
  onReset: () => void; // Function to handle reset button click
}

export const UploadButton: React.FC<UploadButtonProps> = ({ fileInputRef, previewUrl, error, onFileUpload, onReset }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
            <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={onFileUpload} />
            {/* Display capture and upload buttons only if there's no preview image and no error */}
            {!previewUrl && !error && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="outlined" color="primary" startIcon={<UploadFileIcon />} onClick={() => fileInputRef.current?.click()}>
                        Upload
                    </Button>
                </Box>  
            )}  
            {/* Display reset button only if there's a preview image*/}
            {previewUrl && (
                <Button variant="outlined" color="error" onClick={onReset}>
                    Cancel
                </Button>
            )}
        </Box>      
    );
};
