import React from 'react';
import {Table,Spinner,Pagination, ListGroupItem }from 'react-bootstrap'
// import Collapse from 'react-bootstrap/Collapse';
import history from '../../utils/history'
import API from '../../utils/backend-api'
// import Filter from './Filter.js'
import './movieList.scss'

export default class MovieListPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            results: [], 
            ready:false, 
            page:1,
            totalPage:undefined,
            // genre: API.getGenre(),
        };
        this.getData();
    }

    getData(){
        API.getNumberOfPage().then((response) =>{
            const page = Math.floor(parseInt(response.data.data[0].count) / 10)
            const remainder = parseInt(response.data.data[0].count) % 10
            if (remainder != 0){
                this.setState({totalPage:page+1})
            }
            else {
                this.setState({totalPage:page})
            }
            
        })
        API.getMovies(this.state.page).then((response) =>{
            this.setState({
                results: response.data.data,
                ready: true,
            })
            // console.log(response)
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
            API.getMovies(this.props.page).then((response) => {
                this.setState({
                    results: response.data.data,
                    ready: true,
                    page: this.props.page,
                });
            });
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
            pages.push(<Pagination.Ellipsis key='after'/>)
        }
        else if (currentpage > maxpage - 3 || currentpage == maxpage){
            pages.push(<Pagination.Ellipsis key='before' />)
            for (let i = currentpage - 2; i < maxpage; i++){
                pages.push(<Pagination.Item key={i} onClick={this.getPageData.bind(this,i)}>{i}</Pagination.Item>)
            }
        }
        else{
            pages.push(<Pagination.Ellipsis key='before' />)
            for (let i = currentpage - 1; i < currentpage + 2; i++){
                pages.push(<Pagination.Item key={i} onClick={this.getPageData.bind(this,i)}>{i}</Pagination.Item>)
            }
            pages.push(<Pagination.Ellipsis key='after'/>)
        }
        return pages;
    }


    render() {
        // console.log(this.props.page)
        // console.log(this.state)
        if (this.state.ready) {
        return <div>
            {/* <div className='sidenav'>
                {this.state.genre.map((genre) => 
                    <a href="#">genre</a>
                )}
            </div> */}
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
            <Pagination>
                <Pagination.First key='firstpage' onClick={this.getPageData.bind(this,1)}/>
                <Pagination.Prev  key='prevpage' onClick={this.getPageData.bind(this, parseInt(this.state.page) - 1)} />
                <Pagination.Item key={1} onClick={this.getPageData.bind(this,1)}>{1}</Pagination.Item>
                {this.getpage()}
                <Pagination.Item key={this.state.totalPage} onClick={this.getPageData.bind(this,this.state.totalPage)}>{this.state.totalPage}</Pagination.Item>
                <Pagination.Next key='nextpage' onClick={this.getPageData.bind(this, parseInt(this.state.page) + 1)}/>
                <Pagination.Last key='lastpage' onClick={this.getPageData.bind(this,this.state.totalPage)}/>
            </Pagination>
        </div>}
        return <Spinner className="loading" variant="primary" animation="border"/>;
    }
}