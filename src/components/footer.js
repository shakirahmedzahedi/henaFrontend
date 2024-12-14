import { Box, Paper, Typography, Grid, IconButton, Divider } from '@mui/material'
import { AppBar, Tabs, Tab, Button, Toolbar, useTheme, useMediaQuery, Badge, TextField, InputAdornment } from '@mui/material'
import React from 'react'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import yellowLOgo from './../assets/logo.png';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
import PregnantWomanOutlinedIcon from '@mui/icons-material/PregnantWomanOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ChildFriendlyOutlinedIcon from '@mui/icons-material/ChildFriendlyOutlined';
import { Link } from 'react-router-dom'

const Footer = () => {

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const menuList = [
    { key: '/about', value: 'About' },
    { key: '/contact', value: 'Contact' },
    { key: '/subscribe', value: 'Subscribe' }
  ];

  const menuList1 = [
    { key: '/newArrival', value: 'New Arrival' },
    { key: '/baby', value: 'Baby&Kids' },
    { key: '/mom', value: 'Family&Mom' }
  ];

  const menuList2 = [
    { key: '/return', value: 'Return Policy' },
    { key: '/legal', value: 'Terms of Service' },
    { key: '/privecy', value: 'Privacy Policy' }
  ];

  const privacy = menuList2.map((item, index) => (
    <Box key={index}>
      <Link
        to={item.key}
        style={{
          alignItems: "center",
          justifyContent: "center",
          minHeight: "1vh",
          color: "#FFFFFF",
          textDecoration: 'none'
        }}
      >
        <Typography variant="subtitle2" sx={{ '&:hover': { color: 'secondary.main' } }}>
          {item.value}
        </Typography>
      </Link>
    </Box>
  ));
  const catagory = menuList1.map((item, index) => (
    <Box key={index}>
      <Link
        to={item.key}
        style={{
          alignItems: "center",
          justifyContent: "center",
          minHeight: "1vh",
          color: "#FFFFFF",
          textDecoration: 'none'
        }}
      >
        <Typography variant="subtitle2" sx={{ '&:hover': { color: 'secondary.main' } }}>
          {item.value}
        </Typography>
      </Link>
    </Box>
  ));

  const content = menuList.map((item, index) => (
    <Box key={index}>
      <Link
        to={item.key}
        style={{
          alignItems: "center",
          justifyContent: "center",
          minHeight: "1vh",
          color: "#FFFFFF",
          textDecoration: 'none'
        }}
      >
        <Typography variant="subtitle2" sx={{ '&:hover': { color: 'secondary.main' } }}>
          {item.value}
        </Typography>
      </Link>
    </Box>
  ));

  const smallContent = (
    <>

      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar sx={{ justifyContent: "space-around" }}>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton color="inherit" aria-label="home">
                <HomeOutlinedIcon />
              </IconButton>
              <Typography variant="caption" color="inherit">Home</Typography>
            </Box>
          </Link>

          <Link to={'/mom'} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="mom">
              <PregnantWomanOutlinedIcon />
            </IconButton>
            <Typography variant="caption" color="inherit">Mom</Typography>
          </Box>
          </Link>

<Link to={'/children'} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="kids">
              <ChildCareOutlinedIcon />
            </IconButton>
            <Typography variant="caption" color="inherit">Kids</Typography>
          </Box>
          </Link>

          <Link to={'/allproduct'} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="categories">
              <CategoryOutlinedIcon />
            </IconButton>
            <Typography variant="caption" color="inherit">Products</Typography>
          </Box>
          </Link>

          <Link to={'/newBorn'} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="favorites">
              <ChildFriendlyOutlinedIcon/>
            </IconButton>
            <Typography variant="caption" color="inherit">NewBorn</Typography>
          </Box>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );

  const bigContent = (
    <>

      <Box sx={{ minHeight: '20vh', bgcolor: 'primary.main', color: 'info.main', padding: 2 }}>
        <Box sx={{ ml: { sm: 11, md: 15, lg: 19, xl: 23 }, mr: { sm: 11, md: 15, lg: 19, xl: 23 } }}>
          <Grid container>
            <Grid item xs={10} sm={6}>
              <Typography variant='subtitle2' style={{ color: 'info', paddingTop: '4px' }}>
                Follow us on
              </Typography>
              <Box>
                <a href='https://www.facebook.com/HenaMarkt' target="_blank" rel="noopener noreferrer">
                  <IconButton color="info" mt={2}>
                    <FacebookOutlinedIcon fontSize='medium' />
                  </IconButton>
                </a>
                <a href='https://www.instagram.com/vikingvoyages' target="_blank" rel="noopener noreferrer">
                  <IconButton color="info" style={{ margin: '10px', color: 'info' }}>
                    <InstagramIcon fontSize='medium' />
                  </IconButton>
                </a>
                <a href='https://wa.me/008801903652681' target="_blank" rel="noopener noreferrer">
                  <IconButton color="info" style={{ margin: '10px', color: 'info' }}>
                    <WhatsAppIcon fontSize='medium' />
                  </IconButton>
                </a>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ ml: { sm: 3, md: 15, lg: 19, xl: 23 }, mr: { sm: 3, md: 15, lg: 19, xl: 23 } }}>
          <Divider sx={{ bgcolor: 'secondary.main', padding: "2px" }} />
        </Box>

        <Box sx={{ ml: { sm: 11, md: 15, lg: 19, xl: 23 }, mr: { sm: 11, md: 15, lg: 19, xl: 23 } }}>
          <Grid container>
            <Grid item xs={10} sm={4} mt={2} sx={{ textAlign: 'left' }}>
              {privacy}
            </Grid>
            <Grid item xs={10} sm={4} mt={2} sx={{ textAlign: 'center' }}>
              {catagory}

            </Grid>

            <Grid item xs={10} sm={4} mt={2} sx={{ textAlign: 'right' }}>
              {content}

            </Grid>

          </Grid>
          <Typography sx={{ textAlign: 'center' }} variant='subtitle2' pt={1}>
            This is @ rights reseve CopyrightⒸ2024
          </Typography>
        </Box>
      </Box>
    </>
  );

  return (
    (smallScreen ? smallContent : bigContent)
  );
}

export default Footer;
