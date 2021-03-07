import React from 'react';
// import Button from 'react-bootstrap/Button';
import {Table,Spinner }from 'react-bootstrap'
// import Collapse from 'react-bootstrap/Collapse';
import API from '../../utils/backend-api'
// import Filter from './Filter.js'

export default class MovieListPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            results: [], 
            ready:false, 
        };
        this.getData();
    }

    getData(){
        API.getMovie().then((response) =>{
            this.setState({
                results: response.data,
                ready: true,
            })
            console.log(response)
        })
    }
    // const [open, setOpen] = useState(false);
    // const categories = ["Action", "Adventure", "Comedy", "Drama"]
    render() {
        console.log(this.state)
        if (this.state.ready) {
        return <div>
            {/* <div class="container-fluid">
                {/* <div class="row">
                    {open ? 
                    <Collapse in={open}>
                        <div class="row">
                            {categories.map((category) => {
                                return (
                                    // <div className="col">
                                        <button type="button" class="btn btn-outline-primary ml-3">{category}</button>
                                    // </div>
                                )
                            })}
                        </div>
                    </Collapse> : null}
                </div>
            </div>  */} 
            <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Movie Name</th>
                    <th>Year</th>
                    <th>Genre</th>
                    {/* <th>Tags</th> */}
                </tr>
            </thead>
            <tbody>
                {this.state.results.map((movie) => {
                    return (
                <tr>
                    <td><a href={"/movie?movieid="+movie.movieid}>{movie.title}</a></td>
                    <td>{movie.year}</td>
                    <td>{movie.genre.map((genres) => {
                                    return <div><a href="#">{genres}</a> </div>
                                })}</td>
                    {/* <td>{movie.tags.map((tag) => {
                                    return <div><a href="#">{tag} </a></div>
                                })}</td> */}
                </tr>)})}
            </tbody>
            </Table>
        </div>}
        return <Spinner className="loading" variant="primary" animation="border"/>;
    }
}