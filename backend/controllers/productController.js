import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

/**
 * @desc Fetch all products
 * @route GET /api/products
 * @access Public route
 */
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword, //To show all the relating options
          $options: 'i', //case insensitive
        },
      }
    : {};

  const products = await Product.find({ ...keyword });

  res.json(products);
});

/**
 * @desc Fetch single product
 * @route GET /api/products/:id
 * @access Public route
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Không tìm thấy đơn hàng');
  }
});

/**
 * @desc Delete single product
 * @route DELETE /api/products/:id
 * @access Private/admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Đã xóa sản phẩm' });
  } else {
    res.status(404);
    throw new Error('Không tìm thấy đơn hàng');
  }
});

/**
 * @desc Create single product
 * @route POST /api/products/
 * @access Private/admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/**
 * @desc Update single product
 * @route PUT /api/products/:id
 * @access Private/admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);
  // console.log(req.body);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Không tìm thấy đơn hàng');
  }
});

/**
 * @desc Create new review
 * @route POST /api/products/:id/reviews
 * @access Private
 */
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  // console.log(req.body);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() == req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Sản phẩm đã được đánh giá trước đó');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Đã thêm đánh giá' });
  } else {
    res.status(404);
    throw new Error('Không tìm thấy đơn hàng');
  }
});

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
