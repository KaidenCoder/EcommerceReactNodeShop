import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = (props) => {

    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${props.product._id}`}>
                <Card.Img src={props.product.image} width="380" height="200" variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/product/${props.product._id}`}>
                    <Card.Title as='div'>
                        <strong>{props.product.name}</strong>
                    </Card.Title>

                </Link>

                <Card.Text as='div'>

                    <Rating
                        value={props.product.rating}
                        text={`${props.product.numReviews} reviews`}
                        color='orange'
                    />
                </Card.Text>

                <Card.Text as='div'><span style={{ fontSize: "24px", color: 'black' }}>${props.product.price}</span>{" "}({props.product.countInStock} in Stock )</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
