import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = (props) => {
    const [keyword, setKeyword] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            props.history.push(`/search/${keyword}`)
        } else {
            props.history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <div style={{ display: "flex" }}>
                <Form.Control type="text" name="q" onChange={(e) => setKeyword(e.target.value)} placeholder="Search Product..."
                    className="mr-sm-2 ml-sm-5">
                </Form.Control>
                <Button style={{ marginLeft: '10px' }} type="submit" variant="outline-success" className="p-2">Search</Button>
            </div>
        </Form>
    )
}

export default SearchBox
