import React from 'react';
import { Navbar, Nav, Form, Container, Button, Modal} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import history from '../../utils/history'

export default class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            term: undefined,
        }
    }

    handleChange(e){
        this.setState({
            term: e
        })
    }

    handleStartSearching(){
        history.push(`/?filterBy=title&filter=${this.state.term}`)
    }

    handleclick(e){
        if(e.code === 'Enter'){
            history.push(`/?filterBy=title&filter=${this.state.term}`)
        }
    }
    render() {
        return <>
                    <Navbar className="navbar" variant="light">
                <LinkContainer to="/?page=1">
                    <Navbar.Brand className="logo-title">
                        Main Page
                    </Navbar.Brand>
                </LinkContainer>
                <Nav>
                    <Nav.Item>
                        <LinkContainer to="/popular/?page=1">
                            <Nav.Link>Popular Movies</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to="/polarising/?page=1">
                            <Nav.Link>Polarising Movies</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to="/predict">
                            <Nav.Link>Movies Prediction</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                </Nav>
                <Container className="search-container">
                    <Form.Control
                        className="search-bar"
                        placeholder="Enter movie name"
                        onKeyDown={e => this.handleclick(e)} 
                        onInput={e => this.handleChange(e.target.value)}
                        // ref={this.search}
                    />
                    <Button variant="primary" type="submit" onClick={this.handleStartSearching.bind(this)} className='ml-3'>
                        Submit
                    </Button>
                </Container>
                <Nav className='mr-auto'></Nav>
            </Navbar>
            </>;
    }
}