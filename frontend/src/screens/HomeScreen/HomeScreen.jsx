import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MetaDescription from '../../components/MetaDescription/MetaDescription';
import Product from '../../components/Product/Product';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listProducts } from '../../redux/actions/productAction';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <MetaDescription />
      <h1>Sản Phẩm Mới Nhất</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {!keyword ? (
            <ProductCarousel products={products} />
          ) : (
            <Link to='/' className='btn btn-light'>
              Trở Về Trang Chủ
            </Link>
          )}

          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
