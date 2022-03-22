import React from 'react';

import Product from '../../components/Product/Product';
import { Col, Row } from 'react-bootstrap';
import products from '../../products';

const HomeScreen = () => {
  return (
    <>
      <h1>Sản Phẩm Mới Nhất</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
