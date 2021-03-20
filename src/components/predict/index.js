import React from 'react'
import { Form, Button, Col } from 'react-bootstrap';
export default class Predict extends React.Component{
    constructor(props){
    super(props)
    }

    render(){
        
        const years = [1990,1991,1992,1993,2000,2018,2019,2020];
        const yearsOptions = years.map(year=> <option key={year} value={year}>{year}</option>);
        return(
            <div className="form">
                <Form>{/* <Form onSubmit={e=> this.handleSubmit(e)}> */}
                    <Form.Group controlId="country">
                        <Form.Label>Recipient country: </Form.Label>
                        <Form.Control type="text" name="country"/>
                    </Form.Group>
                    <Form.Group controlId="sector">
                        <Form.Label>Sector:</Form.Label>
                        <Form.Control type="text" name="sector"/>{/* onChange={this.handleChange} */}
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="startYear">
                            <Form.Label>Start Year</Form.Label>
                            <Form.Control as="select" name="startYear">
                                {yearsOptions}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="endYear">
                            <Form.Label>End Year</Form.Label>
                            <Form.Control as="select" name="endYear">
                                {yearsOptions}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">Search</Button>
                </Form>
            </div>
        )}
}