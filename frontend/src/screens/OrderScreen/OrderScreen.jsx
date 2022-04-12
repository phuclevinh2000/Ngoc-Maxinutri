import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import { getOrderDetails, payOrder } from '../../redux/actions/orderAction';
import { ORDER_PAY_RESET } from '../../constants/orderConstants';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    // Cal prices
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    // Check
    if (successPay || !order || order._id !== id) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      // If order isnt paid then add the paypal script
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [id, dispatch, order, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Đơn Hàng {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Giao Hàng</h2>
              <p>
                <strong>Tên người nhận: </strong> {order.user.name}
              </p>
              <p>
                <strong>Địa chỉ email: </strong>
                <a href={`maito:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Địa Chỉ:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Đã Giao Hàng Lúc {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Chưa Giao Hàng</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Thanh Toán</h2>
              <p>
                <strong>Phương Thức Thanh Toán:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Trả tiền vào lúc {order.paidAt}
                </Message>
              ) : (
                <Message variant='danger'>Chưa trả tiền</Message>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Giỏ Hàng</h2>
              {order.orderItems.length === 0 ? (
                <Message>Giỏ Hàng Trống</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                  <Col>{order.itemsPrice} vnđ</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Vận Chuyển</Col>
                  <Col>{order.shippingPrice} vnđ</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Thuế</Col>
                  <Col>{order.taxPrice} vnđ</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tổng Cộng</Col>
                  <Col>{order.totalPrice} vnđ</Col>
                </Row>
              </ListGroupItem>
              {!order.isPaid && (
                <ListGroupItem>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
