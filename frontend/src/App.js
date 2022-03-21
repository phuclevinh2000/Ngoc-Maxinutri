import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Footer from './components/Footer.jsx/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to Ngoc Maxinutri</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
