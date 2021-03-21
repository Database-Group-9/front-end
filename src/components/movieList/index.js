import React from 'react';
import {Table,Spinner, ListGroupItem, Container, Row, Col }from 'react-bootstrap'
import {Form, Button} from 'react-bootstrap';
import history from '../../utils/history'
import API from '../../utils/backend-api'
import TableComp from '../tableComp'
import Sidebar from '../sidebar'
import PageBar from '../pageBar';

export default class MovieListPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            results: [], 
            ready:false, 
            page:1,
            req:props.req,
            years: [],
            startyear:undefined,
            stopyear:undefined,
            genres: [],
            totalPage:undefined,
        };
        this.getYear(); 
        this.getGenre();  
            
        if (props.title === 1){
            this.getfilter()
        }
        else{
            this.getData(); 
        }
    }

    getData(){
        API.getMovies().then((response) =>{
            this.setState({
                results: response.data.data,
                totalPage: response.data.meta.totalPage,
                
            })
            // console.log(response)
        })
    }

    getGenre(){
        API.getGenre().then((response) => {
            this.setState({
                genres: response.data.data,
            });
        });
    }

    getYear(){
        API.getYear().then((response) => {
            console.log(response)
            this.setState({
                years: response.data.data,
                startyear: response.data.data[0].year,
                stopyear: response.data.data[response.data.data.length-1].year,
                ready: true,
            });
        });
    }
    
    getPageData(i) {
        console.log(i)
        if (i != this.state.page){
            this.setState({ready: false});
            history.push(`/?page=${i}`);
        }
        
    }

    componentDidUpdate(){
        this.changepage();
    }

    getfilter(){
        API.getMovies(this.props.req).then((response) => {
            this.setState({
                results: response.data.data,
                ready: true,
                req: this.props.req,
                totalPage: response.data.meta.totalPage,
                page: this.props.page,
            });
        });
    }


    changepage(){
        if (this.props.req !== this.state.req) {
            API.getMovies(this.props.req).then((response) => {
                this.setState({
                    results: response.data.data,
                    ready: true,
                    req: this.props.req,
                    totalPage: response.data.meta.totalPage,
                    page: this.props.page,
                });
            });
        }
    }

    
    handleChange(e){
        this.setState({
            term: e
        })
    }

    handleStartSearching(){
        // console.log(this.state.term)
        history.push(`/?filterBy=title&filter=${this.state.term}`)
    }

    handleclick(e){
        if(e.code === 'Enter'){
            history.push(`/?filterBy=title&filter=${this.state.term}`)
        }
    }

 
    render() {
        console.log(this.props.title)
        if (this.state.ready) {
        return <div>
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
            <Container fluid>
                <Row>
                    <Col xs={2}><Sidebar genres={this.state.genres} years={this.state.years} startyear={this.state.startyear} stopyear={this.state.stopyear}/></Col>
                    <Col xs={10}>
                        <TableComp movies={this.state.results}/>
                        <PageBar page={this.state.page} totalPage={this.state.totalPage} getPageData={this.getPageData.bind(this)}/>
                    </Col>
                </Row>
            </Container>
        </div>}
        return <Spinner className="loading" variant="primary" animation="border"/>;
    }
}
