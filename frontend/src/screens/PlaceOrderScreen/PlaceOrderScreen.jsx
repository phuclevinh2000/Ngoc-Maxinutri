import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../../components/Message/Message';
import CheckoutStep from '../../components/CheckoutStep/CheckoutStep';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  // Cal prices
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Cal shipping
  cart.shippingPrice = addDecimals(cart.itemsPrice > 500000 ? 0 : 50000);

  // Cal Tax
  cart.taxPrice = addDecimals(Number((0.24 * cart.itemsPrice).toFixed(2))); //24% tax

  // Cal Total
  cart.totalPrice = addDecimals(
    Number(cart.shippingPrice) + Number(cart.itemsPrice) + Number(cart.taxPrice)
  );

  const placeOrderHandler = () => {};

  return (
    <div>
      <CheckoutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Giao Hàng</h2>
              <p>
                <strong>Địa Chỉ:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Phương Thức Thanh Toán</h2>
              <strong>Phương Thức:</strong> {cart.paymentMethod}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Giỏ Hàng</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Giỏ Hàng Trống</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price}vnđ = {item.qty * item.price}{' '}
                          vnđ
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Tổng Kết</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Đơn Hàng</Col>
                  <Col>{cart.itemsPrice} vnđ</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Vận Chuyển</Col>
                  <Col>{cart.shippingPrice} vnđ</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Thuế</Col>
                  <Col>{cart.taxPrice} vnđ</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tổng Cộng</Col>
                  <Col>{cart.totalPrice} vnđ</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Xác Nhận Đặt Hàng
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
