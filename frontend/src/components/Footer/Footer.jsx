import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <hr />
        <Row>
          <Col md={4} sm={12} className='text-center py-3'>
            Copyright &copy; Phuc Le Vinh
          </Col>

          <Col md={8} className='text-center py-3'>
            <Row>
              <Col sm={12}>THÔNG TIN LIÊN HỆ</Col>
              <Col sm={12}>
                <strong>Địa Chỉ</strong>: 29/11 Nguyễn Văn Khối, phường 11, Quận
                Gò Vấp, Thành phố Hồ Chí Minh
              </Col>
              <Col sm={12}>
                <strong>Di động</strong>: 0938 192 499 - 0933 21 89 66 (Ms. Đài)
              </Col>
              <Col sm={12}>
                <strong>Email</strong>: suachuangoc@gmail.com
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
