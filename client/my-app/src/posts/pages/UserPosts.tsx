import PostItem from '../components/PostItem.tsx'
import {Box, Typography} from "@mui/material";
import { useParams } from 'react-router';
import {useEffect, useState} from 'react';

interface Post{
    id: number;
    title: string;
    content: string;
}

function UserPosts() {
    const { userId } = useParams();
    const [loadedPosts, setLoadedPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPostItem = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/api/posts/${userId}`);
                const data = await response.json();
                if(response.ok){
                    setLoadedPosts(data.posts);
                }else{
                    throw new Error(data.message || 'Failed to fetch posts');
                }
            } catch (error) {
                setLoading(false);
                console.error('Error fetching posts:', error);
            }
        };
        fetchPostItem();
    }, []); 

    return (
        <Box className="posts-container">
            <Typography variant="h5" className="page-title">Posts</Typography>
            
            {!loading && loadedPosts.length === 0 && (
                <Typography color="gray">No moments shared yet.</Typography>
            )}

            <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',gap:4, width:'100%'}}>
                {loadedPosts.map(post => (
                    <PostItem key={post.id} id={post.id} title={post.title} content={post.content} />
                ))}
            </Box>
        </Box>
    );
}

export default UserPosts;