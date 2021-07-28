import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { constants } from 'fs'
import { logout } from '../actions/userActions'

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin
    console.log(userInfo)
    const nameFromStorage = localStorage.getItem('userInfo') != null ? JSON.parse(localStorage.getItem('userInfo')) : ''

    const logoutHandler = () => {
        console.log("logout")
        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand >MyShop</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={nameFromStorage.name} id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) :
                                <LinkContainer to="/login">
                                    <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
                                </LinkContainer>

                            }


                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header >
    )
}

export default Header


// consta texz = "{\"_id\":\"60e6cb7d6615c80eb2aeb588\",\"name\":\"Kurosaki\",\"email\":\"kurosaki@example.com\",\"isAdmin\":false,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTZjYjdkNjYxNWM4MGViMmFlYjU4OCIsImlhdCI6MTYyNzI5MzQ1OSwiZXhwIjoxNjI5ODg1NDU5fQ.qxbIsuyqNp21AAu2otG43MKWlTqtSfnrDhGlufS8t3E\"}"
