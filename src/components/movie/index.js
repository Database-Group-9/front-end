import React from 'react';
import API from '../../utils/backend-api';
import { Dropdown, Row, Col, Table, Container, Pagination} from 'react-bootstrap';
import helper from '../../utils/helper'
import Charts from '../chart'

const Divider = Dropdown.Divider;

export default class Movie extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            results: undefined, 
            ready:false, 
        };
        this.getData()
    }
    
    getData(){
        // console.log(this.props.movieId)
        API.getSingleMovie(this.props.movieId).then((response) =>{
            this.setState({
                results: response.data.data,
                ready: true,
            })
            // console.log(response.data.data[0]);
        })
    }
    
    render() {
        // console.log(this.state.results)
        const results = this.state.results
        if (results === undefined){
            return <></>;
        }

        const res = this.state.results

        const yvalue = res[3].ratings.map((item) => parseInt(item[1]))
        const xvalue = res[3].ratings.map((item) => item[0])
        // console.log(xvalue)
        const overview = <>
        <h1>{res[0].title} ({res[0].year})</h1>
        External Link: 
        <a href={'https://www.imdb.com/title/tt' + res[0].imdbid + '/'}>IMDB</a>
        &nbsp;
        ,
        <a href={'https://www.themoviedb.org/movie/' + res[0].tmdbid + '/'}>TMDB</a>
        <Divider/>
        <h3>Average Rating : {helper.checknull(res[0].avgrating)}</h3>
        <h5>Genre : </h5>
        <Table striped bordered hover variant="light">
        <tbody>
                <tr>
                    <td>{res[2].genres.map((genre) => {
                                    return <div><a href="">{genre} </a></div>
                                })}</td>
                </tr>
            </tbody>
        </Table>
        <h5>Tag : </h5>
        <Table striped bordered hover variant="light">
        <tbody>
                <tr>
                    <td>{res[1].tags.map((tag) => {
                                    return <div><a href="#">{tag} </a></div>
                                })}</td>
                </tr>
            </tbody>
        </Table>
        <h5>Ratings : </h5>
        <Table striped bordered hover variant="light">
        <tbody>
                <tr>
                    <td>{res[3].ratings.map((item) => {
                                    return <div><a href="#">{item[0]} : {item[1]} </a></div>
                                })}</td>
                </tr>
            </tbody>
        </Table>
        <Divider/>
        </>
        return( 
            <div>
            <Container className="text-left">
            <Row>
                <Col>
                    {overview}
                    <Charts id='myChart' labels={xvalue} data={yvalue}/>
                </Col>
            </Row>
            </Container>
            </div>
        )

    }
}