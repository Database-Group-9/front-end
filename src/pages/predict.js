import React from 'react';
import Predict from '../components/predict';
import extractSearchTerm from '../utils/extract-search-term';

export default class PredictPage extends React.Component{
    render(){
        return <div className='page'>
            <Predict/>
        </div>
    }
}