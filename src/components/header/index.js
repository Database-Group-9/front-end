import React from 'react';
import { Navbar, Nav, Form, Container, Button, Modal} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class Header extends React.Component{
    render() {
        return <>
                    <Navbar className="navbar" variant="light">
                <LinkContainer to="/">
                    <Navbar.Brand className="logo-title">
                        Main Page Pipols
                    </Navbar.Brand>
                </LinkContainer>
                <Nav>
                    <Nav.Item>
                        <LinkContainer to="/">
                            <Nav.Link>Other Page</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to="/">
                            <Nav.Link>Interesting stuff</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                </Nav>
                <Nav className='mr-auto'></Nav>
                <Container className="search-container">
                    <Form.Control
                        className="search-bar"
                        placeholder="Search..."
                        // value={getSearchTerm(this.props.location.search)}
                        // onClick={this.handleStartSearching.bind(this)}
                        // onFocus={this.handleStartSearching.bind(this)}
                        // onChange={() => {}}
                        // ref={this.search}
                    />
                    <Button variant="primary" type="submit" className='ml-3'>
                        Submit
                    </Button>
                </Container>
            </Navbar>
            </>;
    }
}