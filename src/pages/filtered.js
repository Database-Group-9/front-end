import React from 'react';
import Filtered from '../components/filtered'
import extractSearchTerm from '../utils/extract-search-term';

export default class FilteredPage extends React.Component {
    
    render() {
        // console.log(this.props)
            return <Filtered 
            path={this.props.location.pathname} 
            page={extractSearchTerm(this.props.location.search, 'page')}
            req = {this.props.location.search}/>
        }
}
