import React from 'react';
import API from '../../utils/backend-api'
import {Nav, Card, Form, Collapse, Button} from "react-bootstrap";

export default class Sidebar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            genres: [],
            sort: ["Alphabetical", "Year", "Average Rating"],
            sortBy: '',
            order: '',
            ready: false,
            openGenre: false,
            openYear: false,
            openSort: false
        }
        this.getGenre();
        this.handleSelectOrder = this.handleSelectOrder.bind(this);
        this.handleSelect = this.handleSelect.bind(this)
    }

    setOpenGenre(){
        this.setState({
            openGenre: !this.state.openGenre
        })
    }

    setOpenYear(){
        this.setState({
            openYear: !this.state.openYear
        })
    }
    
    setOpenSort(){
        this.setState({
            openSort: !this.state.openSort
        })
    }
    
    handleSelect(e){
        console.log(e.target.value);
    }

    handleSelectOrder(e){
        console.log(e.target.value);
        this.setState({
            order: e.target.value
        })
    }

    getGenre(){
        API.getGenre().then((response) => {
            this.setState({
                genres: response.data.data,
                ready: true
            });
        });
    }

    render(){
        console.log(this.state)
        return(
            <div>
                <Nav className="p-2 text-left col-md-12 d-none d-md-block bg-dark text-white sidebar"
                activeKey="/home"
                onSelect={selectedKey => alert(`selected ${selectedKey}`)}
                >
                <Nav.Item onClick={() => this.setOpenSort()}>
                    Sort By:
                </Nav.Item>
                {/* {this.state.openSort ? 
                <Collapse in={this.state.openSort}> */}
                    <div>
                    <Form>
                        {this.state.sort.map((item) => {
                            return(<Form.Check onClick={this.handleSelectOrder.bind(this)} value={item} type='radio' name='sortby' label={item}/>)
                        })}
                    </Form>
                    Sort Order:
                    <Form>
                        <Form.Check type='radio' name='sorttype' label="ascending"/>
                        <Form.Check type='radio' name='sorttype' label="descending"/>
                    </Form>
                    </div>
                {/* </Collapse>: null} */}
                {/* <Nav.Item>
                    <Button>Apply</Button>
                </Nav.Item> */}
                

                {/* <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
                activeKey="/home"
                onSelect={selectedKey => alert(`selected ${selectedKey}`)}
                > */}
                <Nav.Item onClick={() => this.setOpenGenre()}>
                    Genre:
                </Nav.Item>
                {/* {this.state.openGenre ? <Collapse in={this.state.openGenre}> */}
                    <Form>
                        {this.state.genres.map((genre) => {
                            return(<Form.Check label={genre.genre}/>)
                        })}
                    </Form>
                {/* </Collapse>: null} */}
                {/* <Nav.Item>
                    <Button>Apply</Button>
                </Nav.Item> */}
                {/* </Nav> */}

                {/* <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
                activeKey="/home"
                onSelect={selectedKey => alert(`selected ${selectedKey}`)}
                > */}
                <Nav.Item onClick={() => this.setOpenYear()}>
                    Filter By Year:
                </Nav.Item>
                {/* {this.state.openYear ? <Collapse in={this.state.openYear}> */}
                    <div>
                    <Form.Group>
                        <Form.Label>From</Form.Label>
                        <Form.Control placeholder="Enter Year" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>To</Form.Label>
                        <Form.Control placeholder="Enter Year" />
                    </Form.Group>
                    </div>
                {/* </Collapse>: null} */}
                <Nav.Item>
                    <Button>Apply</Button>
                </Nav.Item>
                </Nav>
            </div>
        )
    }


}