import express, { Router } from 'express'
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productController.js'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'

// @desc fetch all products
// @route GET /api/products
// @access Public
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)

// @desc fetch single product
// @route GET /api/products/:id
// @access Public
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)

export default router