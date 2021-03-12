import React from 'react';
import API from '../../utils/backend-api';
import { Dropdown, Row, Col, Table, Container, Pagination} from 'react-bootstrap';

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
        console.log(this.props.movieId)
        API.getSingleMovie(this.props.movieId).then((response) =>{
            this.setState({
                results: response.data.data,
                ready: true,
            })
            console.log(response.data.data[0]);
        })
    }
    
    render() {
        const results = this.state.results
        if (results === undefined){
            return(<h1>tibe</h1>)
            // return <></>;
        }
        const res = this.state.results
        const overview = <>
        <h1>{res[0].title} ({res[0].year})</h1>
        <Divider/>
        <h3>Average Rating : {res[0].avgrating.slice(0, 4)}</h3>
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
        <Divider/>
        </>
        return( 
            <div>
            <Container className="text-left">
            <Row>
                <Col>
                    {overview}
                </Col>
            </Row>
            </Container>
            </div>
        )

    }
}