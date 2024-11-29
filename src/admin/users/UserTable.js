import React, { useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../reducer/services/UserService';
import { addRoleToUser } from '../../reducer/services/UserService';

const UserTable = () => {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.user.users);

    useEffect(() => {
        // Fetch all coupons when the component loads
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const handleMakeAdmin = (user) =>{
        dispatch(addRoleToUser({id: user.id, role:'ADMIN'}));

    }
 
  return (
    <Box sx={{ p: 3 }}>
    <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        All Users
    </Typography>
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow sx={{ backgroundColor: 'secondary.main' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>User Id</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                        First Name
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                        Last Name
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                        Email
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                        Roles
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                        Options
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users?.length > 0 ? (
                    users.map((user, index) => (
                        <TableRow
                            key={user.id}
                            sx={{
                                backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
                            }}
                        >
                            <TableCell>{user.id}</TableCell>
                            <TableCell align="right">{user.firstName}</TableCell>
                            <TableCell align="right">{user.lastName}</TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user.roles}</TableCell>
                            <TableCell align="right"><Button disabled= {user.roles.includes('ADMIN')} onClick={()=>handleMakeAdmin(user)}>
                                Make Admin
                                </Button>
                                </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} align="center">
                            No Orders available.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </TableContainer>
</Box>
  )
}

export default UserTable
