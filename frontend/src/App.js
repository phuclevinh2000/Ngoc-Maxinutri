import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomeScreen from './screens/HomeScreen/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen/ProductScreen.jsx';
import CartScreen from './screens/CartScreen/CartScreen.jsx';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/cart/' element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
