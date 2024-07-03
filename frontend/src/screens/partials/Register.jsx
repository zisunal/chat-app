import {TextField, Button, Box, Link, FileInput} from '@mui/material';
import Face6Icon from '@mui/icons-material/Face6';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useState, useEffect } from 'react';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [emailErrors, setEmailErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [loggingIn, setLoggingIn] = useState(false);

    const selectFile = async () => {
        const file = await  window.showOpenFilePicker({
            types: [
                {
                    description: 'Images',
                    accept: {
                        'image/*': ['.png', '.gif', '.jpeg', '.jpg']
                    }
                }
            ],
            multiple: false,
            excludeAcceptAllOption: true,
        }).catch(err => console.log(err));
        if (!file) return;
        const fileData = await file[0].getFile();
        const reader = new FileReader();
        reader.readAsDataURL(fileData);
        reader.onloadend = () => {
            setProfilePic(reader.result);
        }
    }
    const selectEmail = (target) => {
        let val = target.value;
        let errors = [];
        if (val.length < 5) errors.push('Email is too short');
        if (!val.includes('@')) errors.push('Email must contain an @ symbol');
        if (!val.includes('.')) errors.push('Email must contain a . symbol');
        if (val.includes('+')) errors.push('Email cannot contain a + symbol');
        if (val.lastIndexOf('.') < val.indexOf('@')) errors.push('Email must contain a . after the @ symbol');
        if (errors.length != 0) {
            setEmailErrors(errors);
            return;
        }
        setEmail(val);
    }

    return (
        <div className="auth-form">
            <div className='login-form'>
                <div className="header">
                    <h2>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AppRegistrationIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            Create an Account
                        </Box>
                    </h2>
                </div>
                <div className="input">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Face6Icon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField sx={{width: '90%'}} type='name' label="Full Name" variant="outlined" required />
                    </Box>
                </div>
                <div className="input">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField onChange={e => selectEmail(e.target)} sx={{width: '90%'}} type='email' label="Your Email" variant="outlined" required />
                    </Box>
                    <div className="errors">
                    {
                        emailErrors.length > 0 && emailErrors.map((err, i) => (
                            <p key={i} style={{color: 'red'}}>{err}</p>
                        ))
                    }
                    </div>
                    <Link href='/login' className='rightText'>Already have an Account?</Link>
                </div>
                <div className="input">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField sx={{width: '90%'}} label="Password" type='password' variant="outlined" required />
                    </Box>
                </div>
                <div className="input">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PhotoCameraFrontIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <Button
                        sx={{width: '90%'}}
                        variant="outlined"
                        component="label"
                        color='secondary'
                        onClick={selectFile}
                        >
                            {profilePic != '' ? 'Change' : 'Upload'} Profile Picture
                        </Button>
                    </Box>
                    { profilePic != '' && <img src={profilePic} alt='profile-pic' /> }
                </div>
                <Button disabled={loggingIn} sx={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }} variant="contained" color="primary">
                    <p>Register</p>
                    <LoginIcon sx={{ color: 'action.inactive', ml: 1, my: 0.5 }} />
                </Button>
            </div>
        </div>
        
    );
}