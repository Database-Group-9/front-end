import React from 'react'
import { Form, Button, Col,Dropdown,Table } from 'react-bootstrap';
import './predict.scss'
import Select from 'react-select'
import API from '../../utils/backend-api'
import history from '../../utils/history'

const Divider = Dropdown.Divider;

export default class Predict extends React.Component{
    constructor(props){
    super(props)
        this.state={
            genres: [],
            tags: [],
            selectedGenres: [],
            selectedTags: [],
            ispersonality: false,
            isratings:false,
            ischanged:false,
            personalityResults: undefined,
            ratingsResults: undefined,
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

    predictPersonality(){
        const st = this.state.selectedTags
        var q = ''
        for (let i = 0; i < st.length; i++){
            if (i > 0){
                q = q + '&'
            }
            q = q + 'tag=' + st[i]
        }
        API.getPersonalityPredictions(q).then((response) =>{
            this.setState({
                personalityResults: response.data,
                ispersonality: true,
                ischanged: true,
                isratings:false,
            })
        })        
    }

    predictRating(){
        // console.log(this.state)
        const st = this.state.selectedTags
        const sg = this.state.selectedGenres
        var q = ''
        for (let i = 0; i < st.length; i++){
            if (i > 0){
                q = q + '&'
            }
            q = q + 'tag=' + st[i]
        }
        if (sg.length > 0){
            q = q + '&'
        }
        for (let i = 0; i < sg.length; i++){
            if (i > 0){
                q = q + '&'
            }
            q = q + 'genreId=' + sg[i]
        }
        API.getRatingPredictions(q).then((response) =>{
            this.setState({
                ratingsResults: response.data,
                ischanged:true,
                isratings: true,
                ispersonality: false,
            })
        })
        
    }

    componentDidUpdate(){
        this.updateResults()
    }

    updateResults(){
        if (this.state.ischanged){
            if (this.state.isratings){
                this.setState({
                    ischanged: false,
                })
            }
            if (this.state.ispersonality){
                this.setState({
                    ischanged: false,
                })
            }
        }
    }

    renderResults(){
        if (this.state.isratings){
            return this.state.ratingsResults.average
        }
        if (this.state.ispersonality){
            const table = <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>aggreableness</th>
                    <th>conscientiousness</th>
                    <th>emotional stability</th>
                    <th>extraversion</th>
                    <th>openness</th>
                </tr>
            </thead>
            <tbody>
                <tr key="1">
                    <td>{this.state.personalityResults.data[0].agreeableness}</td>
                    <td>{this.state.personalityResults.data[0].conscientiousness}</td>
                    <td>{this.state.personalityResults.data[0].emotional_stability}</td>
                    <td>{this.state.personalityResults.data[0].extraversion}</td>
                    <td>{this.state.personalityResults.data[0].openness}</td>
                </tr>
            </tbody>
            </Table>
            return table
        }
    }
    render(){
        // console.log(this.state.personalityResults)
        return(
            <div>
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
                    <Button className="button" variant="primary" type="button" onClick={this.predictPersonality.bind(this)}>Predict personality</Button>
                    <Button className="button" variant="primary" type="button" onClick={this.predictRating.bind(this)}>Predict rating</Button>
                </Form>
            </div>
            <div>
            <Divider/>
                <h5>Prediction Results:</h5>
                {this.renderResults()}
            </div>
            </div>
        )}
}