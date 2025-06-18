import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../config';
import { Typography, Box, Button, CircularProgress, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { manejarCarrito } from '../../store/cart';

const NAVBAR_HEIGHT = '64px';

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const { agregar } = manejarCarrito();

  const fetchProductDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `${config.VITE_API_URL}products/${id}`;
      const response = await axios.get(url);
      setProduct(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Producto no encontrado.");
      } else {
        setError("Error al cargar los detalles del producto. Por favor, inténtalo de nuevo más tarde.");
      }
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const handleAddProducto = () => {
    if (product) {
      agregar(product);
    }
  };

  if (loading) {
    return (
      <Box sx={{ paddingTop: NAVBAR_HEIGHT, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 100px)' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Cargando producto...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ paddingTop: NAVBAR_HEIGHT, p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">{error}</Typography>
        <Button variant="contained" onClick={fetchProductDetails} sx={{ mt: 2 }}>Reintentar</Button>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ paddingTop: NAVBAR_HEIGHT, p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Producto no encontrado.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ paddingTop: NAVBAR_HEIGHT, p: 3, display: 'flex', justifyContent: 'center' }}>
      <Card
        sx={{
          maxWidth: '900px',
          width: '100%',
          margin: 'auto',
          boxShadow: 3,
          borderRadius: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          p: { xs: 2, md: 4 },
        }}
      >
        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              sx={{
                maxWidth: '100%',
                maxHeight: { xs: '300px', md: '450px' },
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: 1,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent sx={{ p: 0 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                {product.category}
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <Typography variant="h5" component="p" sx={{ mt: 3, fontWeight: 'bold' }}>
                Precio: ${product.price ? product.price.toFixed(2) : 'N/A'}
              </Typography>
              <Button
                variant='contained'
                color='primary'
                size='large'
                sx={{ mt: 4, width: '100%' }}
                onClick={handleAddProducto}
              >
                Añadir al Carrito
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default Product;