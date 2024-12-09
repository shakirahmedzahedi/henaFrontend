import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography, Button, CardActionArea, CardActions, Card, Box, Rating, CircularProgress, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../reducer/services/CartService';
import { addToFavorite, removeFromFavorite } from '../reducer/services/AuthService';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const userId = user?.id;
    const favoriteList = user?.favorites;
    const isFavorite = favoriteList?.some(p => p.id === product.id);
    const loading = useSelector((state) => state.cart.loading);
    const error = useSelector((state) => state.cart.error);

    const [showError, setShowError] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);


    useEffect(() => {
        if (error) {
            setShowError(true);

            // Hide the error message after 5 seconds
            const timer = setTimeout(() => {
                setShowError(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        console.log(user?.carts?.[0]?.articles?.length );
        
    }, [dispatch]);

    const handleAddToCart = async () => {
        setButtonLoading(true);

        try {
            await dispatch(addToCart({ userId, productId: product?.id, unit: 1 }));
        } catch (error) {
            setShowError(true);
        } finally {
            setButtonLoading(false);
        }
    };

    const handleToggleFavorite = async () => {

        const req = {
            userId,
            productId: product?.id
        }

        if (isFavorite) {
            try {
                await dispatch(removeFromFavorite(req));

            } catch (error) {
                setShowError(true);
            }
        }
        else {
            try {
                await dispatch(addToFavorite(req));

            } catch (error) {
                setShowError(true);
            }

        }


    };

    const calculateDiscountedPrice = () => {
        if (product?.discountPercentage) {
            return (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);
        }
        return product.price.toFixed(2);
    };

    return (
        <Box>
            <Card
                sx={{
                    maxWidth: 280, // Set a maximum width
                    height: 420, // Set a fixed height for the card
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between', // Adjust alignment
                }}
            >
                <CardActionArea>
                    <Link to={`/productDetails/${product?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <CardMedia
                            component="img"
                            height="200"
                            maxWidth="260"// Adjust height to fit the fixed card size
                            image={product?.thumbnail}
                            alt={product?.title}
                        />
                        <CardContent sx={{ bgcolor: 'info.main', padding: 2 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                {/* Product Title */}
                                <Typography gutterBottom variant="body2" noWrap>
                                    {product?.title}
                                </Typography>

                            </Box>

                            {/* Rating */}
                            <Box display="flex" alignItems="center" gap={1}>
                                <Rating
                                    name="product-rating"
                                    value={product?.rating || 4.5}
                                    precision={0.5}
                                    readOnly
                                    icon={<StarIcon fontSize="small" color="error" />}
                                    emptyIcon={<StarIcon fontSize="inherit" sx={{ color: 'lightgray' }} />}
                                />
                            </Box>

                            {/* Price Display */}
                            {product?.discountPercentage ? (
                                <Box display="block" alignItems="center" mt={1} gap={1}>
                                    {/* Original Price */}
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            sx={{ textDecoration: 'line-through' }}
                                        >
                                            ৳ {product?.price}
                                        </Typography>
                                        {/* Discount Percentage */}
                                        <Box sx={{ px: 0.5, borderRadius: 1 }}>
                                            <Typography variant="body1" color="secondary">
                                                -{product?.discountPercentage}%
                                            </Typography>
                                        </Box>
                                    </Box>
                                    {/* New Price */}
                                    <Typography variant="body1" fontWeight="bold" color="primary">
                                        ৳ {calculateDiscountedPrice()}
                                    </Typography>
                                </Box>
                            ) : (
                                // Show only the original price if there's no discount
                                <Typography variant="body1" fontWeight="bold" color="primary" mt={1}>
                                    ৳ {product?.price.toFixed(2)}
                                </Typography>
                            )}
                        </CardContent>
                    </Link>
                </CardActionArea>
               {/* <CardActions>*/}
                    {/* Add to Cart Button */}
                   
                        <Button
                            disabled={product?.stock <= 0}
                            variant="contained"
                            onClick={handleAddToCart}
                            fullWidth
                        >
                            {buttonLoading ? <CircularProgress size={24} /> : <AddShoppingCartOutlinedIcon/> }
                        </Button>

                        <Button


                            variant="contained"
                            onClick={handleToggleFavorite}
                            fullWidth
                        >
                            {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                        </Button>
                   

               {/* </CardActions>*/}
            </Card>
        </Box>
    );
};

export default ProductCard;
