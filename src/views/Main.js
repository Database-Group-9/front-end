import React, { useState, useEffect } from 'react';
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Filter from './Filter.js'

// importing the fake data
import FAKE from '../components/fakedata';

function Main() {
    const [open, setOpen] = useState(false);
    const categories = ["Action", "Adventure", "Comedy", "Drama"]

    return(
        <div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-4">
                        <h2>Main page pipol</h2>
                    </div>
                    <div class="col-8">
                        <div class="input-group">
                            <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                                aria-describedby="search-addon" />
                            <button type="button" class="btn btn-outline-primary">search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid ml-3">
                <div class="row">
                    <Button
                        onClick={() => setOpen(!open)}
                        aria-controls="test"
                        aria-expanded={open}>
                        Filter by:
                    </Button>
                </div>
            </div>
            <div class="container-fluid">
                <div class="row">
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
            </div>
            <CardGroup>
                {Object.keys(FAKE).map((movie) => {
                    return (
                        <Card>
                            <Card.Body>
                                <Card.Title>{FAKE[movie].name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{FAKE[movie].rating}</Card.Subtitle>
                                {FAKE[movie].genres.map((genre) => {
                                    return <Card.Link href="#">{genre}</Card.Link>
                                })}
                                {/* {FAKE[movie].tags.map((tag) => {
                                    return <Card.Link href="#">{tag}</Card.Link>
                                })} */}
                            </Card.Body>
                        </Card>
                    )
                })}
            </CardGroup>
        </div>
    )
}

export default Main;