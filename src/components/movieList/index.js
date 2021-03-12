import React from 'react';
import {Table,Spinner, ListGroupItem, Container, Row, Col }from 'react-bootstrap'
import history from '../../utils/history'
import API from '../../utils/backend-api'
import TableComp from '../tableComp'
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
            genres: [],
            totalPage:undefined,
        };
        if (props.path === '/'){
            this.getData();
        }
        if (props.path === '/filter'){
            this.getFiltered();
        }
        
    }

    getFiltered(){
        API.getFiltered(this.props.req).then((response) => {
            this.setState({
                results: response.data.data,
                genres: this.props.genres,
                totalPage: response.data.meta.totalPage,
                ready: true,
            })
        })
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
            if (this.props.path === '/'){
            history.push(`/?page=${i}`);
            }
            else
            {
                history.push('/filter'+updatePage(this.props.actualreq ,i))
            }
        }
        
    }

    componentDidUpdate(){
        this.changepage();
        this.changeFilter();
    }

    changeFilter(){
        if (this.props.genres !== this.state.genres || this.props.page !== this.state.page){
            API.getFiltered(this.props.req).then((response) => {
                this.setState({
                    results: response.data.data,
                    genres: this.props.genres,
                    totalPage: response.data.meta.totalPage,
                    page: this.props.page,
                    ready: true,
                })
            })
        }
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
                        <TableComp movies={this.state.results}/>
                        <PageBar page={this.state.page} totalPage={this.state.totalPage} getPageData={this.getPageData.bind(this)}/>
                    </Col>
                </Row>
            </Container>
        </div>}
        return <Spinner className="loading" variant="primary" animation="border"/>;
    }
}

function updatePage(str,i){
    const arr = str.split('&')
    arr.pop()
    arr.push(`page=${i}`)
    const returnq = arr.join('&')
    // console.log(returnq)
    return returnq
}