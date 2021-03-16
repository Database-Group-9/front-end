import React from 'react';
import {Table} from 'react-bootstrap';
import helper from '../../utils/helper'

export default class TableComp extends React.Component{
    constructor(props){
        super(props)
    }

    renderRanking(){
        if (this.props.ranking){
            if (this.props.popular){
                return <th>No. of Raters</th>
            }
            else { 
                return <th>Standard Deviation</th>
            }
        }
        return 
    }

    renderData(movie){
        if (this.props.ranking){
            if (this.props.popular){
                return <td>{movie.noofratings}</td>
            }
            else { 
                return <td>{(movie.std).toFixed(4)}</td>
            }
        }
        return 
    }

    render(){
            return(
            <>
                <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        {this.props.ranking ? <th>ranking</th>:<></>}
                        <th>Movie Name</th>
                        <th>Year</th>
                        <th>Rating</th>
                        {this.renderRanking()}
                    </tr>
                </thead>
                <tbody>
                    {this.props.movies.map((movie,i) => {
                        return (
                    <tr key={movie.movieid}>
                        {this.props.ranking ? <td>{(this.props.page-1) * 20 + i + 1}</td>:<></>}
                        <td><a href={"/movie?movieid="+movie.movieid}>{movie.title}</a></td>
                        <td>{movie.year}</td>
                        <td>{helper.checknull(movie.avgrating)}</td>
                        {this.renderData(movie)}
                    </tr>)})}
                </tbody>
                </Table>
            </>
            )
        }
}
