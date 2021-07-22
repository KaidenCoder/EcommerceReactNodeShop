import React, { useState, useEffect } from 'react'
// import products from '../products';
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product';
import axios from 'axios'

const HomeScreen = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('/api/products')
            setProducts(res.data)
        }
        fetchProducts()
    }, [])


    return (
        <>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <h3>{product.name}</h3>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
