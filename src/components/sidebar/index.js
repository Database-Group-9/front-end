import React from 'react';
import API from '../../utils/backend-api'
import {Nav, Form, Button} from "react-bootstrap";
import history from '../../utils/history'

export default class Sidebar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            genres: [],
            sortBy: '',
            order: '',
            selectgenre: [],
            ready: false,
        }
        this.getGenre();
        this.handleSelectOrder = this.handleSelectOrder.bind(this);
        this.handleSelect = this.handleSelect.bind(this)
    }
    
    applyFilter(){
        const genrearray = this.state.selectgenre
        var q = ''
        if (genrearray.length > 0){
            q = q + 'filterBy=Genre&';
            for(let i = 0; i < genrearray.length; i++ ){
                if (i == genrearray.length -1){
                    q = q + `genre=${genrearray[i]}`
                }
                else{
                q = q + `genre=${genrearray[i]}&`
                }
            }
        }
        if (this.state.sortBy != ''){
            if (q === ''){
                q = q + `sortBy=${this.state.sortBy}`
            }
            else{
            q = q + `&sortBy=${this.state.sortBy}`
            }
        }
        if (this.state.order != ''){
            if (q === ''){
                q = q + `orderBy=${this.state.order}`
            }
            else{
            q = q + `&orderBy=${this.state.order}`
            }
        }
        q = q + `&page=1`
        history.push(`/filter?${q}`)
        // console.log(this.state.order);
        // console.log(this.state.sortBy)
        // console.log(this.state.selectgenre)
    }

    handleSelect(e){
        this.setState({
            sortBy: e.target.value
        })
    }

    handleSelectOrder(e){
            this.setState({
                order: e.target.value
            })      
    }

    handleSelectGenre(e){
        let arr = this.state.selectgenre
        if (e.target.checked){
            arr.push(e.target.value)
            this.setState({
                selectgenre: arr
            })  
        }
        else {
            const id = arr.indexOf(e.target.value);
            arr.splice(id,1)
            this.setState({
                selectgenre: arr
            })  
        }
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
        return(
            <div>
                <Nav className="p-2 text-left col-md-12 d-none d-md-block bg-dark text-white sidebar"
                activeKey="/home"
                onSelect={selectedKey => alert(`selected ${selectedKey}`)}
                >
                <Nav.Item>
                    Sort By:
                </Nav.Item>
                    <div>
                    <Form>
                        {sortby.map((item) => {
                            return(<Form.Check onClick={this.handleSelect.bind(this)} value={item.id} type='radio' name='sortby' label={item.name}/>)
                        })}
                    </Form>
                    Sort Order:
                    <Form>
                        <Form.Check onClick={this.handleSelectOrder.bind(this)} value='asc' type='radio' name='sorttype' label="Ascending"/>
                        <Form.Check onClick={this.handleSelectOrder.bind(this)} value='desc' type='radio' name='sorttype' label="Descending"/>
                    </Form>
                    </div>
                
                <Nav.Item>
                    Genre:
                </Nav.Item>
                {/* {this.state.openGenre ? <Collapse in={this.state.openGenre}> */}
                    <Form>
                        {this.state.genres.map((genre) => {
                            return(<Form.Check onChange={this.handleSelectGenre.bind(this)} value={genre.genreid} label={genre.genre}/>)
                        })}
                    </Form>

                <Nav.Item>
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

                <Nav.Item>
                    <Button onClick={this.applyFilter.bind(this)}>Apply</Button>
                </Nav.Item>
                </Nav>
            </div>
        )
    }


}

const sortby = [
    {
        name: 'Alphabetical',
        id: 'title'
    },
    {
        name: 'Year',
        id: 'year'
    },
    {
        name: 'Average rating',
        id: 'avgrating'
    }
]