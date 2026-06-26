import {Box, Button, Card, Typography, TextField} from "@mui/material";
import { useState} from "react";

function SignUp() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
      const handleSignUp = async (e: any) => {
          e.preventDefault();
          setIsSubmitting(true);
          try{
              const response = await fetch(`http://localhost:3000/api/users/signup`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: username,
                        email: email,
                        password: password
                    })
                });
                const data = await response.json();
                if(!response.ok){
                    throw new Error(data.message || 'Failed to sign up');
                }   
              console.log('Sign-up form submitted');
          } catch (error) {
               console.error('Error during sign-up:', error);
          }finally {
              setIsSubmitting(false);
          }
      };

  return (
    <Box>
        <Card sx={{padding: 2, marginTop: 2}}>
            <form method="post" onSubmit={handleSignUp}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Sign Up
                </Typography>
                    <TextField id="Name" label="Name" variant="outlined" fullWidth margin="normal" type="text" onChange={(e) => setUsername(e.target.value)} />
                    <TextField id="email" label="Email" variant="outlined" fullWidth margin="normal" type="email" onChange={(e) => setEmail(e.target.value)} />
                    <TextField id="password" label="Password" variant="outlined" fullWidth margin="normal" type="password" onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" color="primary" disabled={isSubmitting} type="submit">
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </Button>
            </form>
        </Card>
    </Box>
  );
}

export default SignUp;  