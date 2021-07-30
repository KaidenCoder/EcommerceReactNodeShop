import express, { Router } from 'express'
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productController.js'
// import asyncHandler from 'express-async-handler'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
// import Product from '../models/productModel.js'


// @desc fetch all products
// @route GET /api/products
// @access Public
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
// router.get('/', asyncHandler(async (req, res) => {
//     const products = await Product.find({
//     })
//     res.json(products)
// }))

// @desc fetch single product
// @route GET /api/products/:id
// @access Public
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)
// router.get('/:id', asyncHandler(async (req, res) => {
//     //const product = products.find(p => p._id === req.params.id)
//     const product = await Product.findById(req.params.id)
//     if (product) {
//         res.json(product)
//     } else {
//         res.status(404)
//         throw new Error('Product not found')
//     }
// }))

export default router