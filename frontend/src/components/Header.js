import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'
import { Route } from 'react-router-dom'

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin

    const nameFromStorage = localStorage.getItem('userInfo') != null ? JSON.parse(localStorage.getItem('userInfo')) : ''

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand >ShopCart</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({ history }) => <SearchBox history={history} />} />
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
                            {userInfo && nameFromStorage.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <LinkContainer to="/admin/userList">
                                        <NavDropdown.Item>
                                            Users
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productList">
                                        <NavDropdown.Item>
                                            Products
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderList">
                                        <NavDropdown.Item>
                                            Orders
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}

                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header >
    )
}

export default Header


