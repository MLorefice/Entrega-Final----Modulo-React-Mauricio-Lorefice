import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { config } from '../../config';
import { CardProduct } from '../CardProduct';

const NAVBAR_HEIGHT = '64px';

const FIXED_PRODUCT_IDS_FOR_HOME_CARDS = [1, 2, 3, 4]; 

const Home = () => {
  const [fixedProductsData, setFixedProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductsByIds = async (ids) => {
    const productPromises = ids.map(id =>
      axios.get(`${config.VITE_API_URL}products/${id}`)
    );
    const responses = await Promise.all(productPromises);
    return responses.map(res => res.data);
  };

  const loadFixedCardsData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (FIXED_PRODUCT_IDS_FOR_HOME_CARDS.length > 0) {
        const cardsProducts = await fetchProductsByIds(FIXED_PRODUCT_IDS_FOR_HOME_CARDS);
        setFixedProductsData(cardsProducts);
      } else {
        setFixedProductsData([]);
      }
    } catch (err) {
      console.error("Error fetching fixed products for Home:", err);
      setError("No se pudieron cargar los productos de la selección. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFixedCardsData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ paddingTop: NAVBAR_HEIGHT, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 100px)' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Cargando productos...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ paddingTop: NAVBAR_HEIGHT, p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ paddingTop: NAVBAR_HEIGHT, p: 3 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mt: 2, mb: 4 }}>
        Los Más Vendidos
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
          justifyContent: "center",
        }}
      >
        {fixedProductsData.map((product) => (
          <CardProduct id={product.id} key={product.id} />
        ))}
      </Box>
    </Box>
  );
};

export default Home;