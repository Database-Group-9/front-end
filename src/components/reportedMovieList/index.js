import React from 'react';
import {Table,Spinner, ListGroupItem, Container, Row, Col }from 'react-bootstrap'
import history from '../../utils/history'
import API from '../../utils/backend-api'
import TableComp from '../tableComp'
// import Filter from './Filter.js'
import './movieList.scss'
import PageBar from '../pageBar';

export default class ReportedMovieListPage extends React.Component{
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
        if(this.props.settings === 'popular'){
            API.getPopularMovies().then((response) =>{
                this.setState({
                    results: response.data.data,
                    totalPage: response.data.meta.totalPage,
                    ready: true,
                })
                // console.log(response.data.data)
            })
        }
        else{
            API.getPolarisingMovies().then((response) =>{
                this.setState({
                    results: response.data.data,
                    totalPage: response.data.meta.totalPage,
                    ready: true,
                })
                // console.log(response)
            }) 
        }
    }

    changepage(){
        if(this.props.settings === 'popular'){
            if (this.props.page !== this.state.page) {
                API.getPopularMovies(this.props.page).then((response) => {
                    this.setState({
                        results: response.data.data,
                        ready: true,
                        page: this.props.page,
                    });
                });
            }
        }
        else{
            if (this.props.page !== this.state.page) {
                API.getPolarisingMovies(this.props.page).then((response) => {
                    this.setState({
                        results: response.data.data,
                        ready: true,
                        page: this.props.page,
                    });
                });
            }
        }
    }

    getPageData(i) {
        if(this.props.settings === 'popular'){
            if (i != this.state.page){
                this.setState({ready: false});
                if (this.props.path === '/popular/'){
                history.push(`/popular/?page=${i}`);
                }
            }
        }
        else{
            if (i != this.state.page){
                this.setState({ready: false});
                if (this.props.path === '/polarising/'){
                history.push(`/polarising/?page=${i}`);
                }
            }
        }
        
    }

    componentDidUpdate(){
        this.changepage();
    }

    render() {
        if (this.state.ready) {
        return <div>
            <Container fluid>
                <Row>
                    {this.props.settings==='popular' ? 
                    <div><h3 style={{display: 'inline'}}>Most Popular Movies</h3> 
                    &nbsp; 
                    <h5 style={{display: 'inline'}}>(Based on Number of Ratings)</h5>
                    </div>: 
                    <div><h3 style={{display: 'inline'}}>Most Polarising Movies</h3>
                    &nbsp;
                    <h5 style={{display: 'inline'}}>(Based on Standard Deviation of Ratings for Movies with More Than 20 Reviews)</h5>
                    </div>
                    }
                    <TableComp movies={this.state.results} ranking={true} page={this.state.page} popular={this.props.settings === 'popular'? true : false}/>
                    <PageBar page={this.state.page} totalPage={this.state.totalPage} getPageData={this.getPageData.bind(this)}/>
                </Row>
            </Container>
        </div>}
        return <Spinner className="loading" variant="primary" animation="border"/>;
    }

}