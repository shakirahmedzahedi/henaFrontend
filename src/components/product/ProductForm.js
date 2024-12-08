import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, clearError } from '../../reducer/services/ProductService';
import { BlobServiceClient } from "@azure/storage-blob";

const ProductForm = () => {
  const dispatch = useDispatch();
  const products = useSelector((state)=> state.product.products);
  const loading = useSelector((state)=> state.product.loading);
  const error = useSelector((state)=> state.product.error);
  const successMessage = useSelector((state)=> state.product.success);
  const categories = ['BABY_AND_KIDS', 'FAMILY_AND_MOM', 'NEW_ARRIVAL'];
  const tagsOptions = ['NEWBORN', 'TODDLER', 'CHILDREN', 'MOM'];

   const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    additionalInfo: '',
    extraInfo: '',
    category: '',
    prie: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    tags: '',
    brand: '',
    size: '',
    weight: 0,
    thumbnail: null, // Changed to null for file upload
  });

  const [uploading, setUploading] = useState(false); 
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const blobServiceUrl ="https://shakirstorageaccount.blob.core.windows.net"; // Replace with your Blob service URL
  const sasToken ="sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-01-08T09:43:28Z&st=2024-12-08T01:43:28Z&spr=https,http&sig=wFfTwmsLaLhwI6bs5DpfK0vo9y%2BKt%2BgI%2BZx0q81azgM%3D"; // Your SAS token
  const containerName = "product-images"; // Your Azure Blob Storage container name

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
    if (successMessage) {
      setShowSuccess(true);
      setFormValues({
        title: '',
        description: '',
        additionalInfo: '',
        extraInfo: '',
        category: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        tags: '',
        brand: '',
        size: '',
        weight: 0,
        thumbnail: null, // Changed to null for file upload
      }); // Reset the form to initial values after successful submission
    setThumbnailPreview(null);

      // Hide the error message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle file upload to imgBB and update thumbnail URL in formValues
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
        setUploading(true);

        try {
           
            const blobServiceClient = new BlobServiceClient(`${blobServiceUrl}/?${sasToken}`);
            const containerClient = blobServiceClient.getContainerClient(containerName);

            // Generate unique blob name
            const blobName = `${Date.now()}-${file.name}`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            //await blockBlobClient.uploadBrowserData(file);
            const uploadBlobResponse = await blockBlobClient.uploadBrowserData(file, {
                blobHTTPHeaders: { blobContentType: file.type }, // Set content type
            });

            // Get public URL of the uploaded file

            const imageUrl = `${blobServiceUrl}/${containerName}/${blobName}`;


            setFormValues({ ...formValues, thumbnail: imageUrl });
            setThumbnailPreview(URL.createObjectURL(file));
            //setSuccessMessage("Thumbnail uploaded successfully!!!!");
        } catch (uploadError) {
            setShowError("Error uploading image to Azure Blob Storage.");
            console.error(uploadError);
        } finally {
            setUploading(false);
        }
    }
};

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(clearError);
    
    const formData = new FormData();
    for (const key in formValues) {
      const value = formValues[key];

     formData.append(key, value);
      
    }
    
    await dispatch(addProduct(formData));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>
      {showError && error && (
        <Alert severity="error" onClose={() => setShowError(false)}>
          {error}
        </Alert>
      )}
      {showSuccess && successMessage && (
        <Alert severity="success" onClose={() => setShowError(false)}>
          {successMessage}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Title"
              name="title"
              fullWidth
              value={formValues.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formValues.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="number"
              label="Price"
              name="price"
              fullWidth
              value={formValues.price}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Brand"
              name="brand"
              fullWidth
              value={formValues.brand}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Discount Percentage"
              name="discountPercentage"
              fullWidth
              value={formValues.discountPercentage}
              onChange={handleChange}
              inputProps={{ min: 0, max: 50 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="number"
              label="Rating"
              name="rating"
              fullWidth
              value={formValues.rating}
              onChange={handleChange}
              inputProps={{ min: 0, max: 5, step: 0.5 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="number"
              label="Stock"
              name="stock"
              fullWidth
              value={formValues.stock}
              onChange={handleChange}
              inputProps={{ min: 0, max: 500 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Tags</InputLabel>
              <Select
                name="tags"
                value={formValues.tags}
                onChange={handleChange}
              >
                {tagsOptions.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Size"
              name="size"
              fullWidth
              value={formValues.size}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Weight"
              name="weight"
              fullWidth
              value={formValues.weight}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="thumbnail"
            />
            <label htmlFor="thumbnail">
              <Button variant="outlined" component="span" fullWidth>
                {uploading ? <CircularProgress size={24} /> : 'Upload Thumbnail'}
              </Button>
            </label>
            {thumbnailPreview  && (
              <div>
                <Typography variant="body2" gutterBottom>
                  Thumbnail Preview:
                </Typography>
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  style={{ width: '100px', height: 'auto' }}
                />
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              name="description"
              multiline
              rows={3}
              fullWidth
              value={formValues.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Additional Info"
              name="additionalInfo"
              multiline
              rows={3}
              fullWidth
              value={formValues.additionalInfo}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Extra Info"
              name="extraInfo"
              multiline
              rows={3}
              fullWidth
              value={formValues.extraInfo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Add Product'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ProductForm;
