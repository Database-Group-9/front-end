import React from 'react';
import API from '../../utils/backend-api';
import { Dropdown, Row, Col, Table, Container} from 'react-bootstrap';

const Divider = Dropdown.Divider;

export default class MovieListPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            results: undefined, 
            ready:false, 
        };
        this.getData();
    }
    
    getData(){
        API.getSingleMovie().then((response) =>{
            this.setState({
                results: response.data[0],
                ready: true,
            })
            // console.log(response)
        })
    }
    
    render() {
        const results = this.state.results
        if (results === undefined){
            return <></>;
        }
        const res = this.state.results
        const overview = <>
        <h1>{res.title} ({res.year})</h1>
        <Divider/>
        <h5>Genre : </h5>
        <Table striped bordered hover variant="light">
        <tbody>
                <tr>
                    {res.genre.map((genres) => {
                                    return<td> {genres}</td>
                                })}
                    {/* <td>{movie.tags.map((tag) => {
                                    return <div><a href="#">{tag} </a></div>
                                })}</td> */}
                </tr>
            </tbody>
        </Table>
        <Divider/>
        </>
        return <Container className="text-left">
        <Row>
            <Col>
                {overview}
            </Col>
        </Row>
        </Container>

    }
}