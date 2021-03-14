import React from 'react';
import {Table} from 'react-bootstrap';
import helper from '../../utils/helper'

export default class TableComp extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        if(this.props.ranking){
            return(
                <>
                    <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Ranking</th>
                            <th>Movie Name</th>
                            <th>Year</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.movies.map((movie, index) => {
                            return (
                        <tr key={movie.movieid}>
                            <td>{20 * (this.props.page - 1) + index + 1}</td>
                            <td><a href={"/movie?movieid="+movie.movieid}>{movie.title}</a></td>
                            <td>{movie.year}</td>
                            <td>{helper.checknull(movie.avgrating)}</td>
                            {/* <td>{movie.genre.map((genres) => {
                                            return <div><a href="#">{genres}</a> </div>
                                        })}</td> */}
                            {/* <td>{movie.tags.map((tag) => {
                                            return <div><a href="#">{tag} </a></div>
                                        })}</td> */}
                        </tr>)})}
                    </tbody>
                    </Table>
                </>
                )
        }
        else{
            return(
            <>
                <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Movie Name</th>
                        <th>Year</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.movies.map((movie) => {
                        return (
                    <tr key={movie.movieid}>
                        <td><a href={"/movie?movieid="+movie.movieid}>{movie.title}</a></td>
                        <td>{movie.year}</td>
                        <td>{helper.checknull(movie.avgrating)}</td>
                        {/* <td>{movie.genre.map((genres) => {
                                        return <div><a href="#">{genres}</a> </div>
                                    })}</td> */}
                        {/* <td>{movie.tags.map((tag) => {
                                        return <div><a href="#">{tag} </a></div>
                                    })}</td> */}
                    </tr>)})}
                </tbody>
                </Table>
            </>
            )
        }
    }
}

// function checknull(avg){
//     if (avg !== null){
//         return avg.slice(0,4)
//     }
//     return 0
// }