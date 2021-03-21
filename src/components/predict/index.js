import React from 'react'
import { Form, Button, Col } from 'react-bootstrap';
import './predict.scss'
import Select from 'react-select'
import API from '../../utils/backend-api'
export default class Predict extends React.Component{
    constructor(props){
    super(props)
        this.state={
            genres: [],
            tags: [],
            selectedGenres: [],
            selectedTags: [],
        }
        this.getGenre()
        this.getTag()
    }

    getGenre(){
        API.getGenre().then((response) => {
            const stategenre = response.data.data.map(genre => {return {value: genre.genreid,label:genre.genre }})
            this.setState({
                genres: stategenre,
            });
        });
    }

    getTag(){
        API.getTags().then((response) => {
            const statetags = response.data.data.map(tag => {return {value: tag.tag,label:tag.tag }})
            this.setState({
                tags: statetags,
            });
        });
    }

    handleChangeGenre(e){
        let selectedvalue = e.map(val => {return val.value})
        this.setState({
            selectedGenres: selectedvalue
        })
    }

    handleChangeTags(e){
        let selectedvalue = e.map(val => {return val.value})
        this.setState({
            selectedTags: selectedvalue
        })
    }

    render(){
        console.log(this.state)
        return(
            <div className="form">
                <Form>{/* <Form onSubmit={e=> this.handleSubmit(e)}> */}
                    <Form.Group controlId="Title" className="title">
                        <Form.Label>Title: </Form.Label>
                        <Form.Control type="text" name="country"/>
                    </Form.Group>
                    <Form.Row >
                        <Col>
                        <Form.Group controlId="sector">
                            <Form.Label>Genres:</Form.Label>
                            <Select 
                                options={this.state.genres} 
                                isMulti 
                                onChange={this.handleChangeGenre.bind(this)}/>{/* onChange={this.handleChange} */}
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group as={Col} controlId="startYear">
                            <Form.Label>Tags</Form.Label>
                            <Select 
                                options={this.state.tags} 
                                isMulti
                                onChange={this.handleChangeTags.bind(this)}/>
                        </Form.Group>
                        </Col>
                    </Form.Row>                   
                    <Button className="button" variant="primary" type="submit">Predict personality</Button>
                    <Button className="button" variant="primary" type="submit">Predict rating</Button>
                </Form>
            </div>
        )}
}