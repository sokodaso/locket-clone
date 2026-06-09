import {Box, Typography,Button} from "@mui/material";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { useLocation, useNavigate } from "react-router";

function Auth() {
    const location = useLocation();
    const navigate = useNavigate();
    const isLoginPage = location.pathname === '/login';
    
    return (
        <Box>
            {isLoginPage ? <Login /> : <SignUp />}
            <Box sx={{marginTop: 2, textAlign: 'center'}}>
                <Typography variant="body1">
                    {isLoginPage ? "Don't have an account?" : "Already have an account?"}
                </Typography>
                <Button variant="text" color="primary" onClick={() => navigate(isLoginPage ? '/signup' : '/login')}>
                    {isLoginPage ? 'Sign Up' : 'Login'}
                </Button>
            </Box>
        </Box>
    );
}

export default Auth;