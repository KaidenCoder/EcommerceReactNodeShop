import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'

import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = (props) => {

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    if (!shippingAddress.address) {
        props.history.push('/shipping')
    }

    const ss = localStorage.getItem('paymentMethod')
        ? JSON.parse(localStorage.getItem('paymentMethod'))
        : {}

    const [paymentMethod, setPaymentMethod] = useState("Paypal")

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label as="legend">Select Method</Form.Label>
                    <br />
                    <Col>
                        <Form.Check type="radio" label="PayPal or Credit Card"
                            id="PayPal"
                            name="paymentmethod"
                            value="PayPal"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check>

                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
