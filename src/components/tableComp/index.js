import React from 'react';
import {Table} from 'react-bootstrap';

export default class TableComp extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
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
                    <td>{movie.avgrating.slice(0,4)}</td>
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