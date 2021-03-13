import React from 'react'
import Chart from 'chart.js'

export default class Charts extends React.Component{
    constructor(props){
        super(props)
        this.chartRef = React.createRef();
    }

    componentDidMount(){
        const ctx = this.chartRef.current.getContext("2d")
        new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: this.props.labels,
                datasets:[
                    {
                        label:"number of raters",
                        data: this.props.data,
                        fill: true,
                        borderWidth: 1.5,
                        borderColor:['rgba(27, 102, 180,1)','rgba(27, 102, 180,1)','rgba(27, 102, 180,1)','rgba(27, 102, 180,1)','rgba(27, 102, 180,1)'],
                        backgroundColor: ['rgba(27, 102, 180,0.2)', 'rgba(27, 102, 180,0.2)', 'rgba(27, 102, 180,0.2)', 'rgba(27, 102, 180,0.2)','rgba(27, 102, 180,0.2)'],
                    }]
                },
            options: {}
        });
    }

    render(){
        
        // console.log(this.props.data)
        return <>               
            <canvas
                id={this.props.id}
                ref={this.chartRef}
            />
        </>
    }
}