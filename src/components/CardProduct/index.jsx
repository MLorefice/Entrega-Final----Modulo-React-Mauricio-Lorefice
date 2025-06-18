import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { config } from '../../config';
import { Card, CardHeader, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { manejarCarrito } from '../../store/cart';
import { Link } from 'react-router-dom';

export const CardProduct = ({ id }) => {
  const [product, setProduct] = useState({});

  const {agregar} = manejarCarrito();

  const fetch = async () => {
    const url = `${config.VITE_API_URL}products/${id}`;
    const response = await axios.get(url);

    setProduct(response.data);
  };

  useEffect(() => {
    fetch();
  }, [id]);

  const handleAddProducto = () => {
    agregar(product);
    // console.log(product);
    
    
  };
  return (
    <Card
      sx={{
        width: "350px",
        margin: "20px",
        display: 'flex',
        flexDirection: 'column',
        height: '600px',
        justifyContent: 'space-between',

      }}
    >
      <CardHeader
        title={product.title}
        subheader={product.category}
        titleTypographyProps={{ 
            noWrap: true, 
        }}
      ></CardHeader>


      <CardMedia
        component="img"
        image={product.image}
        height="200"
        sx={{
          objectFit: 'contain',
        }}
      />


      <CardContent
        sx={{
          flexGrow: 1,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',

          }}
        >
          {product.description}
        </Typography>
      </CardContent>


      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          p: 2,
        }}
      >
        <Button variant='contained' onClick={handleAddProducto}>Comprar</Button>
        <Link to={`/productos/${id}`} style={{ textDecoration: 'none' }}>
          <Button variant='outlined'>Ver</Button>
        </Link>
      </Box>
    </Card>
  );
};

export default CardProduct;
