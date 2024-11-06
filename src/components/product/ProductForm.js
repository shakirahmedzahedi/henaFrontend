import React, { useState } from 'react';
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
} from '@mui/material';

const ProductForm = () => {
  // Sample options for category and tags
  const categories = ['Electronics', 'Clothing', 'Books', 'Furniture'];
  const tagsOptions = ['New', 'Popular', 'Discounted', 'Limited Edition'];

  // Initial state for the form inputs
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    additionalInfo: '',
    extraInfo: '',
    category: '',
    price: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    tags: '',
    brand: '',
    size: '',
    weight: '',
    thumbnail: null, // Changed to null for file upload
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle file change for thumbnail
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues({
        ...formValues,
        thumbnail: file, // Set the file to the thumbnail state
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in formValues) {
      formData.append(key, formValues[key]);
    }
    console.log('Product data:', formData);
    // Perform API call or other actions with form data here
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>
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
              inputProps={{ min: 0, max: 5 }}
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

          {/* New File Input for Thumbnail */}
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
                Upload Thumbnail
              </Button>
            </label>
            {/* Preview Thumbnail */}
            {formValues.thumbnail && (
              <div>
                <Typography variant="body2" gutterBottom>
                  Thumbnail Preview:
                </Typography>
                <img
                  src={URL.createObjectURL(formValues.thumbnail)}
                  alt="Thumbnail Preview"
                  style={{ width: '100px', height: 'auto' }}
                />
              </div>
            )}
          </Grid>

          {/* Right Column for Larger Text Areas */}
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

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ProductForm;
