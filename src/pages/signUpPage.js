import React from 'react'
import { Grid } from '@mui/material'
import Registration from '../features/auth/registration'
import logo from '../assets/logo.png'

const SignUpPage = () => {
  return (
    <div>
      <Grid container alignItems={'center'} justifyContent={'center'} style={{ textAlign: 'center',marginTop:'50px'}}>
                <Grid item  md={5} lg={6} sx={{ textAlign: 'center', display:{xs:'none',lg:'block'}  }}
                >
                    <img
                        src={logo}
                        alt={logo}
                        style={{ width: '275px', height: '250px', marginTop:'30px' }}
 
                    />
                </Grid>
                <Grid item sm={5} >
                    <Registration />

                </Grid>
            </Grid>
    </div>
  )
}

export default SignUpPage
