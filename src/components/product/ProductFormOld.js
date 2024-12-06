import React, { useState } from "react";
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
    Alert,
} from "@mui/material";
import { BlobServiceClient } from "@azure/storage-blob";

const ProductFormOld = () => {
    const categories = ["BABY_AND_KIDS", "FAMILY_AND_MOM", "NEW_ARRIVAL"];
    const tagsOptions = ["NEWBORN", "TODDLER", "CHILDREN", "MOM"];

    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        additionalInfo: "",
        extraInfo: "",
        category: "",
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        tags: "",
        brand: "",
        size: "",
        weight: 0,
        thumbnail: null,
    });

    const [uploading, setUploading] = useState(false);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Azure Blob Storage configuration
    const blobServiceUrl =
        "https://shakirstorageaccount.blob.core.windows.net"; // Replace with your Blob service URL
    const sasToken =
        "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-12-08T07:19:25Z&st=2024-12-06T23:19:25Z&spr=https,http&sig=cr0%2Fc2W79ytU2HIrsnYxEkT%2FxYhNzksPtLoni9B8ipQ%3D"; // Your SAS token
    const containerName = "product-images"; // Your Azure Blob Storage container name

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    // Handle file upload
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploading(true);

            try {
                // Initialize BlobServiceClient
                console.log(`${blobServiceUrl}/?${sasToken}`);
                const blobServiceClient = new BlobServiceClient(`${blobServiceUrl}/?${sasToken}`);
                const containerClient = blobServiceClient.getContainerClient(containerName);

                // Generate unique blob name
                const blobName = `${Date.now()}-${file.name}`;
                const blockBlobClient = containerClient.getBlockBlobClient(blobName);
                // Upload file to Azure Blob Storage

                //await blockBlobClient.uploadBrowserData(file);
                const uploadBlobResponse = await blockBlobClient.uploadBrowserData(file, {
                    blobHTTPHeaders: { blobContentType: file.type }, // Set content type
                });

                // Get public URL of the uploaded file

                const imageUrl = `${blobServiceUrl}/${containerName}/${blobName}`;


                setFormValues({ ...formValues, thumbnail: imageUrl });
                setThumbnailPreview(URL.createObjectURL(file));
                setSuccessMessage("Thumbnail uploaded successfully!!!!");
            } catch (uploadError) {
                setError("Error uploading image to Azure Blob Storage.");
                console.error(uploadError);
            } finally {
                setUploading(false);
            }
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Log form values to the console
        console.log("Form submitted:", formValues);

        setSuccessMessage("Product added successfully!");
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Add Product
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* Title */}
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

                    {/* Category */}
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

                    {/* Price */}
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

                    {/* Brand */}
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

                    {/* File Input */}
                    <Grid item xs={12} sm={6}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            id="thumbnail"
                        />
                        <label htmlFor="thumbnail">
                            <Button variant="outlined" component="span" fullWidth>
                                {uploading ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    "Upload Thumbnail"
                                )}
                            </Button>
                        </label>
                        {thumbnailPreview && (
                            <div>
                                <Typography variant="body2" gutterBottom>
                                    Thumbnail Preview:
                                </Typography>
                                <img
                                    src={thumbnailPreview}
                                    alt="Thumbnail Preview"
                                    style={{ width: "100px", height: "auto" }}
                                />
                            </div>
                        )}
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            disabled={uploading}
                        >
                            Add Product
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default ProductFormOld;
