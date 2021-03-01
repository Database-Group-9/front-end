import React from 'react';
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import API from '../../utils/backend-api'
// import Filter from './Filter.js'
// import FAKE from '../fakedata'

export default class MovieListPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {results: undefined, error: undefined, id:undefined};

        this.getdata();
    }

    getdata(){
        API.getGreetings().then((response) => {
            console.log(response);
        });
    }
    // const [open, setOpen] = useState(false);
    // const categories = ["Action", "Adventure", "Comedy", "Drama"]
    render() {
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
            <CardGroup>
                {API.getMovieList().map((movie) => {
                    // console.log(movie)
                    return (
                        <Card>
                            <Card.Body>
                                <Card.Title>{movie.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{movie.rating}</Card.Subtitle>
                                {movie.genres.map((genre) => {
                                    return <Card.Link href="#">{genre}</Card.Link>
                                })}
                                {movie.tags.map((tag) => {
                                    return <Card.Link href="#">{tag}</Card.Link>
                                })}
                            </Card.Body>
                        </Card>
                    )
                })}
            </CardGroup> 
        </div>
    }
}