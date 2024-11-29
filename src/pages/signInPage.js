import { Grid, Box } from '@mui/material'
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png'
import SignIn from '../features/auth/signIn'
import hena from '../assets/Hena.png'

import { useLocation } from 'react-router-dom';

const SignInPage = () => {

    const location = useLocation();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const status = params.get('status');

        if (status === 'activated') {
            setMessage('Account successfully activated. You can now log in.');
        } else if (status === 'activation_failed') {
            setMessage('Activation failed. Please contact support.');
        }
        
    }, [location]);
    return (
        <div>
            <Box sx={{ minHeight: '65vh', ml: { sm: 3, md: 15, lg: 19, xl: 23 }, mr: { sm: 3, md: 15, lg: 19, xl: 23 } }}>

            <Grid container alignItems={'center'} justifyContent={'center'} style={{ textAlign: 'center',marginTop:'50px'}}>
                <Grid item  md={5} lg={6} sx={{ textAlign: 'center', display:{xs:'none',lg:'block'}  }}
                >
                    <img
                        src={logo}
                        alt={logo}
                        style={{ width: '275px', height: '250px', marginTop:'30px' }}
 
                    />
                </Grid>
                <Grid item sm={6} >
                    <SignIn info={message}/>

                </Grid>
            </Grid>
</Box>
        </div>
    )
}

export default SignInPage
