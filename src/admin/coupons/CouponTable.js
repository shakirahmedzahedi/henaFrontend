import React, { useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCoupons } from '../../reducer/services/DiscountCouponService';

const CouponTable = () => {
    const dispatch = useDispatch();
    const coupons = useSelector((state) => state.coupon.coupons);

    useEffect(() => {
        // Fetch all coupons when the component loads
        dispatch(fetchAllCoupons());
    }, [dispatch]);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
                All Coupons
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#1976d2' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Coupon Number</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                                Discount Amount
                            </TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                                Already Used
                            </TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                                Created At
                            </TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                                Created By
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coupons?.length > 0 ? (
                            coupons.map((coupon, index) => (
                                <TableRow
                                    key={coupon.number}
                                    sx={{
                                        backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
                                    }}
                                >
                                    <TableCell>{coupon.number}</TableCell>
                                    <TableCell align="right">{coupon.discountAmount}</TableCell>
                                    <TableCell align="right">{coupon.alreadyUsed ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="right">{new Date(coupon.createdAt).toLocaleString()}</TableCell>
                                    <TableCell align="right">{coupon.userDTO.firstName}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No coupons available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CouponTable;
