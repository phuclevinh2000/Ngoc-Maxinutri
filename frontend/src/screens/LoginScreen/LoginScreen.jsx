import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import FormContainer from '../../components/FormContainer/FormContainer';
import { login } from '../../redux/actions/userAction';

const LoginScreen = () => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordShown, setPasswordShown] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <FormContainer>
      <h1>Đăng Nhập</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Địa Chỉ Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Mật Khẩu</Form.Label>
          <InputGroup>
            <Form.Control
              type={passwordShown ? 'text' : 'password'}
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroup.Text onClick={togglePassword}>
              <i className='fas fa-eye'></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Đăng Nhập
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Người Dùng Mới?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Đăng Kí
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
