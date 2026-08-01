import {Box, Typography,Button} from "@mui/material";
import {Outlet, useNavigate, useLocation} from "react-router";
import { useContext} from "react";
import AuthContext from "../../context/Auth-Context";
import icon from "../../assets/icon.png";

function AppBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useContext(AuthContext);
    
    const isPostsPage = location.pathname.includes('/posts');
    const isNewPostPage = location.pathname === '/posts/new';
    
    return (
        <Box className="app-container" sx={{ bgcolor: 'gray', minHeight: '100vh', color: 'white',justifyContent: 'center'}}>
            <Box className="mobile-app-container" sx={{ maxWidth: { xs: '100%', sm: '600px', md: '5000px' }, margin: '0 auto', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <header style={{display: 'flex',justifyContent: 'space-between', padding: '1.5rem', width: '100%', margin: '0 auto', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', boxSizing: 'border-box'}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Typography variant="h6">LocketStyle</Typography>
                        <img src={icon} alt="Icon" style={{ width: '40px', height: '40px' }} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: '8px' }}>
                        {isPostsPage ? (
                            <Button variant="contained" color="primary" onClick={() => navigate(`/users/${auth.userId}`)}>
                            Back to Profile
                            </Button>
                        ) : ( 
                            isNewPostPage ? (
                                <Button variant="contained" color="primary" onClick={() => navigate(`/users/${auth.userId}`)}>
                                    Back to Profile
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={() => navigate(`/posts/new`)}>
                                    Add Hangs
                                </Button>
                            )
                        )}
                        <Button variant="contained" color="primary" onClick={() => auth.logout()}>
                            Logout
                        </Button>
                    </Box>
                </header>
                <main style={{padding: '16px', marginTop: '16px'}}>
                    <Outlet />
                </main>
            </Box>
        </Box>
    
    );
}

export default AppBar;