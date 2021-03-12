import React from 'react';
import {Table,Spinner, ListGroupItem, Container, Row, Col }from 'react-bootstrap'
import history from '../../utils/history'
import API from '../../utils/backend-api'
// import Filter from './Filter.js'
import './movieList.scss'
import Sidebar from '../sidebar'
import PageBar from '../pageBar';

export default class MovieListPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            results: [], 
            ready:false, 
            page:1,
            totalPage:undefined,
        };
        this.getData();
    }

    getData(){
        API.getMovies().then((response) =>{
            this.setState({
                results: response.data.data,
                totalPage: response.data.meta.totalPage,
                ready: true,
            })
            // console.log(response)
        })
    }
    
    getPageData(i) {
        if (i != this.state.page){
            this.setState({ready: false});
            history.push(`/?page=${i}`);
        }
        
    }

    componentDidUpdate(){
        this.changepage();
    }

    changepage(){
        if (this.props.page !== this.state.page) {
            API.getMovies(this.props.page).then((response) => {
                this.setState({
                    results: response.data.data,
                    ready: true,
                    page: this.props.page,
                });
            });
        }
    }
 
    render() {
        if (this.state.ready) {
        return <div>
            <Container fluid>
                <Row>
                    <Col xs={2}><Sidebar/></Col>
                    <Col xs={10}>
                        <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Movie Name</th>
                                <th>Year</th>
                                {/* <th>Genre</th> */}
                                {/* <th>Tags</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.results.map((movie) => {
                                return (
                            <tr key={movie.movieid}>
                                <td><a href={"/movie?movieid="+movie.movieid}>{movie.title}</a></td>
                                <td>{movie.year}</td>
                                {/* <td>{movie.genre.map((genres) => {
                                                return <div><a href="#">{genres}</a> </div>
                                            })}</td> */}
                                {/* <td>{movie.tags.map((tag) => {
                                                return <div><a href="#">{tag} </a></div>
                                            })}</td> */}
                            </tr>)})}
                        </tbody>
                        </Table>
                        <PageBar page={this.state.page} totalPage={this.state.totalPage} getPageData={this.getPageData.bind(this)}/>
                    </Col>
                </Row>
            </Container>
        </div>}
        return <Spinner className="loading" variant="primary" animation="border"/>;
    }
}