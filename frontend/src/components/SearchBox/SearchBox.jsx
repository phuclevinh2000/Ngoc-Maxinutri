import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <Row>
        <Col className='d-flex'>
          <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Tìm kiếm sản phẩm...'
            className='mr-sm-2 ml-sm-5'
          ></Form.Control>
          <Button type='submit' className='p-2' variant='light'>
            <i className='fa fa-search'></i>
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBox;
