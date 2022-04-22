import React from 'react';

import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCarousel = ({ products }) => {
  return (
    <Carousel pause='hover' variant='dark'>
      {products.map((product) => (
        <Carousel.Item key={product._id} className='carousel-item'>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>{product.name}</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
