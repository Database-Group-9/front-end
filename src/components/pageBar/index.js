import React from 'react';
import {Pagination} from 'react-bootstrap';

export default class PageBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page: props.page,
            totalPage: props.totalPage,
        }
    }

    firstPage(){
        if(parseInt(this.state.page) === 1){
            return true
        }
        return false
    }

    lastPage(){
        if(this.state.page == this.state.totalPage){
            return true
        }
        return false
    }


    getpage = () => {
        const maxpage = parseInt(this.state.totalPage)
        const currentpage = parseInt(this.state.page)

        let pages = []

        if (currentpage == 1 || currentpage == 2 || currentpage == 3){
            for (let i = 2; i < currentpage + 2; i++){
                pages.push(<Pagination.Item key={i} onClick={this.props.getPageData.bind(this,i)}>{i}</Pagination.Item>)
            }
            pages.push(<Pagination.Ellipsis key='after'/>)
        }
        else if (currentpage > maxpage - 3 || currentpage == maxpage){
            pages.push(<Pagination.Ellipsis key='before' />)
            for (let i = currentpage - 2; i < maxpage; i++){
                pages.push(<Pagination.Item key={i} onClick={this.props.getPageData.bind(this,i)}>{i}</Pagination.Item>)
            }
        }
        else{
            pages.push(<Pagination.Ellipsis key='before' />)
            for (let i = currentpage - 1; i < currentpage + 2; i++){
                pages.push(<Pagination.Item key={i} onClick={this.props.getPageData.bind(this,i)}>{i}</Pagination.Item>)
            }
            pages.push(<Pagination.Ellipsis key='after'/>)
        }
        return pages;
    }

    render(){
        return(
        <>
        <Pagination>
            <Pagination.First key='firstpage' onClick={this.props.getPageData.bind(this,1)}/>
            <Pagination.Prev  key='prevpage' disabled={this.firstPage(this)} onClick={this.props.getPageData.bind(this,parseInt(this.state.page) - 1)} />
            <Pagination.Item key={1} onClick={this.props.getPageData.bind(this,1)}>{1}</Pagination.Item>
            {this.getpage()}
            <Pagination.Item key={this.state.totalPage} onClick={this.props.getPageData.bind(this,this.state.totalPage)}>{this.state.totalPage}</Pagination.Item>
            <Pagination.Next key='nextpage' disabled={this.lastPage(this)} onClick={this.props.getPageData.bind(this,parseInt(this.state.page) + 1)}/>
            <Pagination.Last key='lastpage' onClick={this.props.getPageData.bind(this,this.state.totalPage)}/>
        </Pagination>
        </>
        )
    }
}