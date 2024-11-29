import React,{useEffect} from 'react'
import { Box, Grid, Typography, List, ListItem, ListItemText, Divider, Button, IconButton, TextField, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorite } from '../reducer/services/AuthService';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchUserById } from '../reducer/services/AuthService';

const Favorite = () => {

    const dispatch = useDispatch();
    const user = useSelector((state)=> state.auth.user);
    const userId = user?.id;
    const favoriteList = user?.favorites;

    useEffect(() => {
        
        dispatch(fetchUserById(userId));
       
      }, [dispatch]);
    const calculateItemTotal = (item) => {
        const price = item.discountPercentage
          ? item.price - (item.price * item.discountPercentage) / 100
          : item.price;
  
          return price;
    };

    const calculateDiscountedPrice = (price, discount) => {
        return discount ? (price - (price * discount) / 100).toFixed(2) : price.toFixed(2);
      };
    
      const handleRemoveItem = (productId) => {
        dispatch(removeFromFavorite({ userId, productId }));
      };
  return (
    <div>
        <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" align="center" color="primary" sx={{  fontSize: { xs: '24px', md: '36px', lg: '36px' } } }>
          Favorite
        </Typography>
      </Box>
      <Box>
        <Divider sx={{ bgcolor: 'info.dark', minHeight: '.2vh' }} />
      </Box>

      
      {favoriteList?.length > 0 ? (
        <Paper>
            <List>
              {favoriteList?.map((item, index) => (
                <ListItem key={index} divider sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* Product Image */}
                  <Box sx={{ width: 60, height: 60, overflow: 'hidden', mr: 2 }}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                  </Box>

                  {/* Product Details */}
                  <ListItemText
                    primary={item.title}
                    secondary={
                      <>
                        {item.discountPercentage ? (
                          <>
                            <Typography
                              variant="body2"
                              sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                            >
                              BDT {item.price}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" color="primary">
                              BDT {calculateDiscountedPrice(item.price, item.discountPercentage)}
                            </Typography>
                          </>
                        ) : (
                          <Typography variant="body2" fontWeight="bold" color="primary">
                            BDT {item.price}
                          </Typography>
                        )}
                      </>
                    }
                    sx={{ flex: 1 }}
                  />


                  {/* Remove Button */}
                  <IconButton onClick={() => handleRemoveItem(item.id)} edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>

                  {/* Total Price for Item */}
                  <Typography variant="body1" color="primary" sx={{ ml: 2 }}>
                    BDT {calculateItemTotal(item)}
                  </Typography>
                </ListItem>
              ))}
            </List>
            </Paper>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              No Favorite yet.
            </Typography>
          )}
     
      
    </div>
  )
}

export default Favorite
