import React from 'react';

import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap';
import Rating from '../../components/Rating/Rating';
import products from '../../products';

const ProductScreen = () => {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);
  console.log(product);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Trở Về
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} đánh giá`}
              />
            </ListGroupItem>
            <ListGroupItem>Giá: {product.price} đ</ListGroupItem>
            <ListGroupItem>{product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                  <Col>Giá</Col>
                  <Col>
                    <strong>{product.price} đ</strong>
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Tình Trạng</Col>
                  <Col>
                    {product.countInStock > 0 ? 'Còn Hàng' : 'Hết Hàng'}
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Thêm vào giỏ hàng
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
