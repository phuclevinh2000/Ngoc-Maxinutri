import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>Đăng Nhập</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Đăng Nhập</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/login/shipping'>
            <Nav.Link>Địa Chỉ</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Địa Chỉ</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>Thanh Toán</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Thanh Toán</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>Xác Nhận</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Xác Nhận</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutStep;
