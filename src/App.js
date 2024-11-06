import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/header';
import Home from './pages/homePage';
import SignInPage from "./pages/signInPage";
import SignUpPage from "./pages/signUpPage"
import NavBar from "./components/navBar";
import About from './pages/aboutPage';
import Contact from './pages/contactPage';
import ProductCard from "./components/productCard";
import Footer from './components/footer';
import ProductForm from "./components/product/ProductForm";
import AddProductPage from "./pages/AddProductPage";
import TermsAndConditionPage from "./pages/TermsAndConditionPage";
import Checkout from "./components/Checkout";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import ProductDetails from "./components/ProductDetails";
import ProtectedRoute from "./special/ProtectedRoute ";
import MyPage from "./pages/MyPage";
import { authCheck } from './reducer/slices/AuthSlice';
import AutoSignOut from './components/AutoSingOut';



function App() {

  const dispatch = useDispatch();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00a651'//'#556B2F' //'#006aa9'
      },
      secondary: {
        main: '#ec1c24'//'#556B2F'//'#7cc8f5'
      },
      info: {
        main: '#FFFFFF',
        dark: '#eeeee4'
      },
      error: {
        main: '#f00a19'
      }
    },
    typography: {

      fontFamily: "'poppins', sans-serif",
      h3: {

        letterSpacing: "0",
      },
      body1: {
        lineHeight: "1.8rem",
        fontWeight: 400,
      },
      body2: {
        fontWeightLight: 300,
      }
    }

  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const user = JSON.parse(localStorage.getItem('user'));
    const isAuthenticate = localStorage.getItem('isAuthenticate');
    console.log("Auth Check - token, email, isAuthenticated:", token, email, isAuthenticate); // Log values
  
    if (token && email && isAuthenticate) {
        // Update Redux state with token and user data if token exists
        dispatch(authCheck({ 
                isAuthenticated: true,
                token: token,
                data: user
        }));
    }
}, [dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AutoSignOut/>
          <Header />
          <Box sx={{ pt: { xs: '86px', md: '114px' }, pb: { xs: '86px', md: '114px' }}}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/addProduct" element={<AddProductPage/>} />
            <Route path="/legal" element={<TermsAndConditionPage/>} />
            <Route path="/cart" element={<ProtectedRoute><CartPage/></ProtectedRoute>} />
            <Route path="/myPage" element={<ProtectedRoute><MyPage/></ProtectedRoute>} />
            <Route path="/payment" element={<PaymentPage/>} />
            <Route path="/productDetails" element={<ProductDetails/>} />
          </Routes>
          </Box>
        {/* <ProductCard/> */}

        <Footer />
        </Router>

      </ThemeProvider>
    </>
  );
}

export default App;