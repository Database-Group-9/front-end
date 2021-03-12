import React from 'react';
import {Pagination} from 'react-bootstrap';

export default class PageBar extends React.Component{
    constructor(props){
        super(props)

    }

    firstPage(){
        if(parseInt(this.props.page) === 1){
            return true
        }
        return false
    }

    lastPage(){
        if(this.props.page >= this.props.totalPage){
            return true
        }
        return false
    }

    forward(){
        if (this.props.totalPage == 0){
            this.props.getPageData.bind(this,1)
        }
        else{
            this.props.getPageData.bind(this,this.props.totalPage)
        }
    }

    displaylast(){
        if (this.props.totalPage > 3){
            return <Pagination.Item key={this.props.totalPage} onClick={this.props.getPageData.bind(this,this.props.totalPage)}>{this.props.totalPage}</Pagination.Item>
        }
    }


    getpage = () => {
        const maxpage = parseInt(this.props.totalPage)
        const currentpage = parseInt(this.props.page)

        let pages = []
        if (maxpage < 3){
            for (let i = 1; i <= maxpage; i++){
                pages.push(<Pagination.Item key={i} onClick={this.props.getPageData.bind(this,i)}>{i}</Pagination.Item>)
            }
        }
        else if (currentpage == 1 || currentpage == 2 || currentpage == 3){
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
        console.log(this.props.totalPage)
        return(
        <>
        <Pagination>
            <Pagination.First key='firstpage' onClick={this.props.getPageData.bind(this,1)}/>
            <Pagination.Prev  key='prevpage' disabled={this.firstPage(this)} onClick={this.props.getPageData.bind(this,parseInt(this.props.page) - 1)} />
            <Pagination.Item key={1} onClick={this.props.getPageData.bind(this,1)}>{1}</Pagination.Item>
            {this.getpage()}
            {this.displaylast()}
            <Pagination.Next key='nextpage' disabled={this.lastPage(this)} onClick={this.props.getPageData.bind(this,parseInt(this.props.page) + 1)}/>
            <Pagination.Last key='lastpage' onClick={this.forward.bind(this)}/>
        </Pagination>
        </>
        )
    }
}