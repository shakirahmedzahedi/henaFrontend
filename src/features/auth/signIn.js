
import React, { useState, useEffect } from 'react';
import { Box, Paper, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {post} from '../../reducer/api/APIService'
import { clearError } from '../../reducer/slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../reducer/services/AuthService';


const SignIn = (props) => {

    const {info} = props;

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        remember: false
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    const responseError = useSelector((state) => state.auth.error);
    const successMessage = useSelector((state) => state.auth.message);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const navigate = useNavigate();
    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputs.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (inputs.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateField = (name, value) => {
        let error = '';
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = 'Invalid email format';
            }
        } else if (name === 'password') {
            if (value.length < 6) {
                error = 'Password must be at least 6 characters long';
            }
        }
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const handleOnChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInputs(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleOnBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("click");
        console.log(validate);
        if (validate()) {
            dispatch(clearError);
            dispatch(signIn(inputs));   
        } else {
            // If the inputs are invalid
            setMessage('Sign in failed. Please check your inputs.');
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
        {loading ? <CircularProgress size={96} /> :
        (<Box sx={{ p: 2 }}>
           
            <Box component={Paper} elevation={6} square sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main', textAlign: 'center' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {info && <p>{info}</p>}
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        size='small'
                        id="email"
                        label="Email Address"
                        name="email"
                        value={inputs.email}
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        size='small'
                        name="password"
                        label="Password"
                        value={inputs.password}
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                        type={showPassword ? 'password' : 'text'}
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name='remember'
                                checked={inputs.remember}
                                onChange={handleOnChange}
                                value="remember"
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                         Sign In
                    </Button>
                    {message && <Typography color="secondary">{message}</Typography>}
                    {responseError && <Typography color="secondary">{responseError}</Typography>}
                    {successMessage && <Typography color="secondary">{successMessage}</Typography>}
                    <Grid container>
                        <Grid item xs>
                            <Link to={"/resetPassword"} variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={"/signUp"} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )}
    </>
    );
};

export default SignIn;