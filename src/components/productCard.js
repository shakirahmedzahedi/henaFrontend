import React, { useEffect, useState } from 'react'
import one from '../assets/one.jpg'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography, Button, CardActionArea, CardActions, Card, Box, useTheme, useMediaQuery, Rating, CircularProgress } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../reducer/services/CartService';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const userId = user?.id;
    const loading = useSelector((state) => state.cart.loading);
    const error = useSelector((state) => state.cart.error);

    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
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


    console.log(product);
    return (
        <Box >
            <Card sx={{ maxWidth: 500 }}>

                <CardActionArea >
                <Link to={`/productDetails/${product?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <CardMedia
                            component="img"
                            height="240"
                            maxWidth="400"
                            image={product?.thumbnail}
                            alt="green iguana"
                        />
                        <CardContent sx={{ bgcolor: 'info.main' }}>
                            <Typography gutterBottom variant="body2" sx={{}}>
                                {product?.title}
                            </Typography>

                            <Box display="flex" alignItems="center" gap={1}>
                                <Rating
                                    name="product-rating"
                                    value={product?.rating || 4.5}
                                    precision={0.5}
                                    readOnly
                                    icon={<StarIcon fontSize="small" color="error" />}
                                    emptyIcon={<StarIcon fontSize="inherit" sx={{ color: 'lightgray' }} />}
                                />
                                <Typography variant="body2" color="textSecondary">(97)</Typography>
                            </Box>

                            {/* Old Price, Discount, and New Price */}
                            <Box display="flex" alignItems="center" mt={1} gap={1}>
                                <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
                                    ৳ 999.00
                                </Typography>
                                <Box sx={{ /* bgcolor: 'primary.light', */ px: 0.5, borderRadius: 1 }}>
                                    <Typography variant="caption" color="info">-10%</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body1" fontWeight="bold" color="primary" mt={0.5}>
                                ৳ {product?.price}
                            </Typography>

                        </CardContent>
                    </Link>
                    <CardActions>
                        <Button variant="contained" onClick={() => handleAddToCart(product?.id)}>
                            {buttonLoading ? <CircularProgress size={24} /> : 'Add To Cart'}
                        </Button>
                    </CardActions>
                </CardActionArea>
            </Card>
        </Box>
    )
}

export default ProductCard
