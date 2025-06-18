import { useState } from 'react';
import './App.css';
import Products from './components/pages/Products';
import Home from './components/pages/Home';
import { Route, Routes } from 'react-router-dom';
import Product from './components/pages/Product';
import NavBar from './components/ui/Navbar';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          color: 'rgba(0, 0, 0, 0.87)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'white',
          color: 'rgba(0, 0, 0, 0.87)',
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <>
        <NavBar></NavBar>
        <div style={{ height: "95px" }}></div> 
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/productos' element={<Products />}/>
          <Route path='/productos/:id' element={<Product/>}></Route>
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;