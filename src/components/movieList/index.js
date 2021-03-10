import React from 'react';
// import Button from 'react-bootstrap/Button';
import {Table,Spinner,Button,Pagination, ListGroupItem }from 'react-bootstrap'
// import Collapse from 'react-bootstrap/Collapse';
import history from '../../utils/history'
import API from '../../utils/backend-api'
// import Filter from './Filter.js'

export default class MovieListPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            results: API.getFake(1), 
            ready:true, 
            page:1,
            totalPage:20,
        };
        // this.getData();
    }

    getData(){
        API.getMovies(this.state.page).then((response) =>{
            this.setState({
                results: response.data,
                ready: true,
            })
            console.log(response)
        })
    }
    
    getPageData(i) {
        this.setState({ready: false});
        history.push(`/?page=${i}`);
    }



    componentDidUpdate(){
        this.changepage();
    }

    changepage(){
        if (this.props.page !== this.state.page) {
            console.log(this.props.page) 
            this.setState({
                        results: API.getFake(this.props.page),
                        ready:true,
                        page: this.props.page,
                    });
                    this.getpage()

            // API.getMovies(this.props.page).then((response) => {
            //     this.setState({
            //         results: response.data,
            //         ready: true,
            //         page: this.props.page,
            //     });
            // });
        }
    }

    getpage = () => {
        const maxpage = parseInt(this.state.totalPage)
        const currentpage = parseInt(this.state.page)

        let pages = []

        if (currentpage == 1 || currentpage == 2 || currentpage == 3){
            for (let i = 2; i < currentpage + 2; i++){
                pages.push(<Pagination.Item key={i} onClick={this.getPageData.bind(this,i)}>{i}</Pagination.Item>)
            }
            pages.push(<Pagination.Ellipsis />)
        }
        else if (currentpage == maxpage || currentpage > maxpage - 2){
            pages.push(<Pagination.Ellipsis />)
            for (let i = currentpage - 2; i < currentpage; i++){
                pages.push(<Pagination.Item key={i} onClick={this.getPageData.bind(this,i)}>{i}</Pagination.Item>)
            }
        }
        else{
            pages.push(<Pagination.Ellipsis />)
            for (let i = currentpage - 1; i < currentpage + 2; i++){
                pages.push(<Pagination.Item key={i} onClick={this.getPageData.bind(this,i)}>{i}</Pagination.Item>)
            }
            pages.push(<Pagination.Ellipsis />)
        }
        return pages;
    }


    render() {
        console.log(this.props.page)
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
                    {/* <th>Genre</th> */}
                    {/* <th>Tags</th> */}
                </tr>
            </thead>
            <tbody>
                {this.state.results.map((movie) => {
                    return (
                <tr>
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
            <Pagination>
                <Pagination.First key={1} onClick={this.getPageData.bind(this,1)}/>
                <Pagination.Prev  key={parseInt(this.state.page) - 1} onClick={this.getPageData.bind(this, parseInt(this.state.page) - 1)} />
                <Pagination.Item key={1} onClick={this.getPageData.bind(this,1)}>{1}</Pagination.Item>
                {this.getpage()}
                <Pagination.Item key={this.state.totalPage} onClick={this.getPageData.bind(this,this.state.totalPage)}>{this.state.totalPage}</Pagination.Item>
                <Pagination.Next key={parseInt(this.state.page) + 1} onClick={this.getPageData.bind(this, parseInt(this.state.page) + 1)}/>
                <Pagination.Last key={this.state.totalPage} onClick={this.getPageData.bind(this,this.state.totalPage)}/>
            </Pagination>
        </div>}
        return <Spinner className="loading" variant="primary" animation="border"/>;
    }
}