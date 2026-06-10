import {Box, Button, Card, Typography, TextField} from "@mui/material";
import { useContext, useState} from "react";
import AuthContext from "../../context/Auth-Context";

function Login() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useContext(AuthContext);   
    
      const handleLogin = async (e: any) => {
          e.preventDefault();
          setIsSubmitting(true);
          try{
                const response = await fetch(`http://localhost:3000/api/users/login`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });
                
                const data = await response.json();

                if(response.ok){ 
                    auth.login(data.userId);
                } else {
                    throw new Error(data.message || 'Failed to log in');
                }

          } catch (error) {
               console.error('Error during login:', error);
          }finally {
              setIsSubmitting(false);
          }
      };

  return (
    <Box>
        <Card sx={{padding: 2, marginTop: 2}}>
            <form method="post" onSubmit={handleLogin}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Login
                </Typography>
                    <TextField id="email" label="Email" variant="outlined" fullWidth margin="normal" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField id="password" label="Password" variant="outlined" fullWidth margin="normal" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" color="primary" disabled={isSubmitting} type="submit">
                    {isSubmitting ? 'Logging In...' : 'Login'}
                </Button>
            </form>
        </Card>
    </Box>
  );
}

export default Login;