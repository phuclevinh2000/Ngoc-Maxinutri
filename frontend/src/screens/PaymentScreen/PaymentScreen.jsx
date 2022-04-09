import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutStep from '../../components/CheckoutStep/CheckoutStep';
import FormContainer from '../../components/FormContainer/FormContainer';
import { savePaymentMethod } from '../../redux/actions/cartAction';

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!shippingAddress) {
    navigate.push('/login/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };
  return (
    <FormContainer>
      <CheckoutStep step1 step2 step3 />
      <h1>Thanh Toán</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Chọn Phương thức Thanh Toán</Form.Label>

          <Row>
            <Col md={12}>
              <Form.Check
                type='radio'
                label='PayPal'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
            <Col md={12}>
              <Form.Check
                type='radio'
                label='Visa'
                id='Visa'
                name='paymentMethod'
                value='Visa'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Row>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Tiếp Tục
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
