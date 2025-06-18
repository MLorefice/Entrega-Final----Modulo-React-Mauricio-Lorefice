import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MenuIcon from '@mui/icons-material/Menu';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { manejarCarrito } from "../../../store/cart";

const NavBar = () => {
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);

    const { carrito, agregar, quitarUno, eliminar } = manejarCarrito();

    const toggleCartDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setCartDrawerOpen(open);
    };

    const toggleNavDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setNavDrawerOpen(open);
    };

    const totalItemsInCart = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const totalPrice = carrito.reduce((sum, item) => sum + (item.price * item.cantidad), 0);

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
                        onClick={toggleNavDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        VERSATIL.TUC
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Button color="inherit" component={Link} to="/productos">Productos</Button>
                        <Button color="inherit" component={Link} to="/">Inicio</Button>
                    </Box>

                    <IconButton color="inherit" onClick={toggleCartDrawer(true)}>
                        <Badge badgeContent={totalItemsInCart} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={navDrawerOpen}
                onClose={toggleNavDrawer(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleNavDrawer(false)}
                    onKeyDown={toggleNavDrawer(false)}
                >
                    <List>
                        <ListItem component={Link} to="/" onClick={toggleNavDrawer(false)}>
                            <ListItemText primary="Inicio" />
                        </ListItem>
                        <ListItem component={Link} to="/productos" onClick={toggleNavDrawer(false)}>
                            <ListItemText primary="Productos" />
                        </ListItem>
                    </List>
                    <Divider />
                </Box>
            </Drawer>

            <Drawer
                anchor="right"
                open={cartDrawerOpen}
                onClose={toggleCartDrawer(false)}
            >
                <Box
                    sx={{ width: 320 }}
                    role="presentation"
                    onKeyDown={toggleCartDrawer(false)}
                >
                    <Typography variant="h6" sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                        Tu Carrito de Compras
                    </Typography>
                    <Divider />
                    {carrito.length === 0 ? (
                        <Typography sx={{ p: 2, textAlign: 'center' }}>
                            El carrito está vacío.
                        </Typography>
                    ) : (
                        <List sx={{ pt: 0 }}>
                            {carrito.map((item) => (
                                <React.Fragment key={item.id}>
                                    <ListItem
                                        alignItems="flex-start"
                                        secondaryAction={
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: '80px' }}>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="eliminar"
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        eliminar(item.id);
                                                    }}
                                                    sx={{ mb: 0.5 }}
                                                >
                                                    <DeleteForeverIcon sx={{ color: 'error.main' }} />
                                                </IconButton>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => { e.stopPropagation(); quitarUno(item.id); }}
                                                    >
                                                        <RemoveCircleOutlineIcon fontSize="small" sx={{ color: grey[800] }} />
                                                    </IconButton>
                                                    <Typography variant="body2" sx={{ mx: 0.5 }}>
                                                        {item.cantidad}
                                                    </Typography>
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => { e.stopPropagation(); agregar(item); }}
                                                    >
                                                        <AddCircleOutlineIcon fontSize="small" sx={{ color: grey[800] }} />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        }
                                    >
                                        <img src={item.image} alt={item.title} style={{ width: 60, height: 60, marginRight: 10, objectFit: 'contain', flexShrink: 0 }} />
                                        <ListItemText
                                            primary={
                                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                    {item.title}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" color="text.secondary">
                                                    ${(item.price).toFixed(2)} c/u <br /> Total: ${(item.price * item.cantidad).toFixed(2)}
                                                </Typography>
                                            }
                                            sx={{ mr: 1 }}
                                        />
                                    </ListItem>
                                    <Divider component="li" />
                                </React.Fragment>
                            ))}
                            <Divider sx={{ my: 1 }} />
                            <ListItem>
                                <ListItemText primary="Total de la Compra" />
                                <Typography variant="h6" fontWeight="bold">
                                    ${totalPrice.toFixed(2)}
                                </Typography>
                            </ListItem>
                            <Box sx={{ p: 2 }}>
                                <Button variant="contained" color="primary" fullWidth>
                                    Proceder al Pago
                                </Button>
                            </Box>
                        </List>
                    )}
                </Box>
            </Drawer>
        </>
    );
};
export default NavBar;