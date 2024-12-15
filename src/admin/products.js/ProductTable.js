import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Divider
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, updateProduct, deleteProduct } from '../../reducer/services/ProductService';
import ProductFormUpdate from '../../components/product/ProductFromUpdate';

const ProductTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  // States
  const [openDialog, setOpenDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);// Stock update dialog
  const [anchorEl, setAnchorEl] = useState(null); // Menu anchor
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product
  const [amount, setAmount] = useState(''); // Stock amount input
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [itemsPerPage] = useState(5); // Items per page
  const [searchQuery, setSearchQuery] = useState(''); // Search query

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch], products);

  // Handle opening menu
  const handleClickMenu = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  // Handle closing menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Handle opening stock update dialog
  const handleUpdateStockClick = () => {
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleUpdateProductClick = (product) => {
    setOpenModal(true);
    setSelectedProduct(product);
    handleCloseMenu();
  };

  const handleDeleteProductClick = async(product) => {
    console.log("click delete");
    console.log(product);
    await dispatch(deleteProduct({id: product.id}))
   
    handleCloseMenu();
  };

  // Close stock update dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAmount('');
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setOpenModal(false);
  };

  // Handle stock update
  const handleUpdateStock = () => {
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid stock amount');
      return;
    }

    const updatedData = {
      price: selectedProduct.price,
      discountPercentage: selectedProduct.discountPercentage,
      rating: selectedProduct.rating,
      stock: parseInt(amount),
      thumbnail: selectedProduct.thumbnail,
      bestSeller: selectedProduct.bestSeller
    };

    // Dispatch action to update product
    dispatch(updateProduct({ productId: selectedProduct.id, updatedData }));

    setOpenDialog(false);

    setAmount('');
  };

  const handleMakeBestSeller = () => {
    const updatedData = {
      price: selectedProduct.price,
      discountPercentage: selectedProduct.discountPercentage,
      rating: selectedProduct.rating,
      stock: selectedProduct.stock,
      thumbnail: selectedProduct.thumbnail,
      bestSeller: true
    };

    // Dispatch action to update product
    dispatch(updateProduct({ productId: selectedProduct.id, updatedData }));

    handleCloseMenu();

  };

  // Filter products by search query
  const filteredProducts = products.filter((product) =>
    product.id.toString().includes(searchQuery) || // Search by ID
    product.stock.toString().includes(searchQuery) || // Search by stock
    product.price.toString().includes(searchQuery) // Search by price
  );

  // Paginate filtered products
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const submitUpdate = async(product, productData) => {
    console.log("Submit call in parents: ", productData);
    const updatedData = {
      price: parseFloat(productData.price),
      discountPercentage: parseFloat(productData.discountPercentage),
      rating: parseFloat(productData.rating),
      stock: parseInt(productData.stock),
      thumbnail: productData.thumbnail,
      bestSeller: productData.bestSeller
    };

    try {
      // Await the dispatch to ensure it completes before closing the modal
      await dispatch(updateProduct({ productId: product.id, updatedData }));
      handleCloseModal(); // Close modal only after dispatch completes
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update the product. Please try again.");
    }
    handleCloseMenu();
  }


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        All Products
      </Typography>

      {/* Search Input */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '300px' }}
        />
      </Box>

      {/* Product Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Product Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                Stock
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                Price
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                Options
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts?.length > 0 ? (
              paginatedProducts.map((product, index) => (
                <TableRow
                  key={product.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
                  }}
                >
                  <TableCell>{product.title}</TableCell>
                  <TableCell align="right">{product.stock}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">
                    <Button onClick={(event) => handleClickMenu(event, product)}>Options</Button>
                    {selectedProduct?.id === product.id && (
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                      >
                        <MenuItem onClick={handleMakeBestSeller}>
                          Make Bestseller
                        </MenuItem>
                        <MenuItem onClick={handleUpdateStockClick}>Update Stock</MenuItem>
                        <Divider sx={{ bgcolor: 'info.dark', minHeight: '.2vh' }} />
                        <MenuItem onClick={() => handleUpdateProductClick(selectedProduct)}>Update Product</MenuItem>
                        <Divider sx={{ bgcolor: 'info.dark', minHeight: '.2vh' }} />
                        <MenuItem onClick={() => handleDeleteProductClick(selectedProduct)}>Delete Product</MenuItem>
                      </Menu>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No products available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            variant={currentPage === index + 1 ? 'contained' : 'outlined'}
            sx={{ mx: 0.5 }}
          >
            {index + 1}
          </Button>
        ))}
      </Box>

      {/* Stock Update Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Enter Stock Amount</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            size="small"
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateStock} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Update.............</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <ProductFormUpdate product={selectedProduct} onUpdate={submitUpdate} onCancel={handleCloseModal} />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductTable;
