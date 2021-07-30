import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
// import axios from 'axios'
import { createProductReview, listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
// import products from '../products'

const ProductScreen = (props) => {
    console.log(props)
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    // const product = products.find(p => p._id === props.match.params.id)

    // const [product, setProduct] = useState({})
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading: successProductReview, error: errorProductReview } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            alert("Review submitted")
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        // const fetchProduct = async () => {
        //     const res = await axios.get(`/api/products/${props.match.params.id}`)
        //     setProduct(res.data)
        // }
        // fetchProduct()
        dispatch(listProductDetails(props.match.params.id))
    }, [dispatch, props.match, successProductReview])

    const addToCartHandler = () => {
        props.history.push(`/cart/${props.match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(props.match.params.id, {
            rating,
            comment
        }))
    }

    return (
        <div>
            <Link className="btn btn-dark my-3" to="/">Go Back</Link>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
                <>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                        color="orange" />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: ${product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Price:
                                            </Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status:
                                            </Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}>
                                                        {[...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className="btn-block"
                                            type="button"
                                            disabled={product.countInStock === 0}>
                                            Add to Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews == 0 && <Message>No reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                                    {userInfo ? (<Form onSubmit={submitHandler}>
                                        <Form.Group controlId="rating">
                                            <Form.Label>
                                                Rating
                                            </Form.Label>
                                            <Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)}>
                                                <option value=''>Select...</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="comment">
                                            <Form.Label>
                                                Comment
                                            </Form.Label>
                                            <Form.Control as="textarea" row="3" value={comment} onChange={(e) => setComment(e.target.value)}>

                                            </Form.Control>
                                        </Form.Group>
                                        <Button type="submit" variant="primary">
                                            Submit
                                        </Button>
                                    </Form>) : <Message>Please <Link to="/login">sign in</Link> to write a review</Message>}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            }
        </div>

    )
}

export default ProductScreen
