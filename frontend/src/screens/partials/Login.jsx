import {TextField, Button, Box, Link} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LoginIcon from '@mui/icons-material/Login';
import PatternIcon from '@mui/icons-material/Pattern';
import { useState, useEffect } from 'react';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErrors, setEmailErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [loggingIn, setLoggingIn] = useState(false);

    return (
        <div className="auth-form">
            <div className='login-form'>
                <div className="header">
                    <h2>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PatternIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            Login to Chat
                        </Box>
                    </h2>
                </div>
                <div className="input">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField sx={{width: '90%'}} id="input-with-sx" type='email' label="Your Email" variant="outlined" required />
                    </Box>
                    <Link href='/register' className='rightText'>No Account?</Link>
                </div>
                <div className="input">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField sx={{width: '90%'}} id="input-with-sx" label="Password" type='password' variant="outlined" required />
                    </Box>
                    <Link href='/forgot' className='rightText'>Forgot  Password?</Link>
                </div>
                <Button disabled={loggingIn} sx={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }} variant="contained" color="primary">
                    <p>Login</p>
                    <LoginIcon sx={{ color: 'action.inactive', ml: 1, my: 0.5 }} />
                </Button>
            </div>
        </div>
        
    );
}