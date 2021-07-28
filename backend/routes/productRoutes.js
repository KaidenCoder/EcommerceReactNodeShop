import express, { Router } from 'express'
import { getProductById, getProducts } from '../controllers/productController.js'
// import asyncHandler from 'express-async-handler'
const router = express.Router()
// import Product from '../models/productModel.js'


// @desc fetch all products
// @route GET /api/products
// @access Public
router.route('/').get(getProducts)
// router.get('/', asyncHandler(async (req, res) => {
//     const products = await Product.find({
//     })
//     res.json(products)
// }))

// @desc fetch single product
// @route GET /api/products/:id
// @access Public
router.route('/:id').get(getProductById)
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