import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import products from '../products';
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
// import axios from 'axios'

const HomeScreen = () => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    // const [products, setProducts] = useState([])

    useEffect(() => {
        // const fetchProducts = async () => {
        //     const res = await axios.get('/api/products')
        //     setProducts(res.data)
        // }
        // fetchProducts()
        dispatch(listProducts())
    }, [dispatch])



    return (
        <>
            <h1>Latest Products</h1>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <h3>{product.name}</h3>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            }

        </>
    )
}

export default HomeScreen
