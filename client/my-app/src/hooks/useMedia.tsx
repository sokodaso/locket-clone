import {useState,useRef, useCallback} from 'react';

export function useMediaHandler()  {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Handle file upload from the user's device
    const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setError(null);
        }
    }, []);

    // Reset all state values
    const handleReset = useCallback(() => {
        if(previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setSelectedFile(null);
        setPreviewUrl(null);
        setError(null);
    }, [previewUrl]);

    return {
        fileInputRef,
        previewUrl,
        selectedFile,
        error,
        handleFileUpload,
        handleReset
    };
}

