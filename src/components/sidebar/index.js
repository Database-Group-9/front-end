import React from 'react';
import API from '../../utils/backend-api'
import {Nav, Form, Button, Dropdown} from "react-bootstrap";
import history from '../../utils/history'
import './sidebar.scss'
export default class Sidebar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            genres: [],
            sortBy: '',
            order: '',
            startyear: props.startyear,
            stopyear: props.stopyear,
            selectgenre: [],
            ready: false,
        }
        this.handleSelectOrder = this.handleSelectOrder.bind(this);
        this.handleSelect = this.handleSelect.bind(this)
    }
    
    applyFilter(){
        const genrearray = this.state.selectgenre
        var q = ''
        if (genrearray.length > 0){
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
        q = q + `&years=${this.state.startyear}`
        q = q + `&years=${this.state.stopyear}`
        q = q + `&page=1`
        history.push(`/filtered?${q}`)
    }

    setStartYear(i){
        if (parseInt(i) > parseInt(this.state.stopyear)){
            return
        }
        this.setState({
            startyear: i,
        })
    }

    setStopYear(i){
        if (parseInt(i) < parseInt(this.state.startyear)){
            return
        }
        this.setState({
            stopyear: i,
        })
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
                            return(<Form.Check key={item.name} onClick={this.handleSelect.bind(this)} value={item.id} type='radio' name='sortby' label={item.name}/>)
                        })}
                    </Form>
                    Sort Order:
                    <Form>
                        <Form.Check key='asc' onClick={this.handleSelectOrder.bind(this)} value='asc' type='radio' name='sorttype' label="Ascending"/>
                        <Form.Check key='desc' onClick={this.handleSelectOrder.bind(this)} value='desc' type='radio' name='sorttype' label="Descending"/>
                    </Form>
                    </div>
                
                <Nav.Item>
                    Genre:
                </Nav.Item>
                    <Form>
                        {this.props.genres.map((genre) => {
                            return(<Form.Check key={genre.genreid} onChange={this.handleSelectGenre.bind(this)} value={genre.genreid} label={genre.genre}/>)
                        })}
                    </Form>

                <Nav.Item>
                    Filter By Year:
                </Nav.Item>
                    <div>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" style={{ maxHeight: "28px" }} id="dropdown-basic">
                            From
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.props.years.map((data) =>
                             <Dropdown.Item key={data.year}  onClick={this.setStartYear.bind(this,data.year)}>{data.year}</Dropdown.Item> 
                             )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" style={{ maxHeight: "28px" }} id="dropdown-basic">
                            To
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.props.years.map((data) =>
                             <Dropdown.Item key={data.year} onClick={this.setStopYear.bind(this,data.year)}>{data.year}</Dropdown.Item> 
                             )}
                        </Dropdown.Menu>
                    </Dropdown>
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