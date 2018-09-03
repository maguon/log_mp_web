import React from 'react';
const httpUtil = require('../../util/HttpUtil')
class Panel extends React.Component {

    constructor(props) {
        super(props);
        this.state ={clickCount:0}
    }
    componentDidMount(){
        this.setClickCount();

    }
    setClickCount(){
        //const res = httpUtil.httpGet('stg.myxxjs.com:9001','/api/user')();
        const u = "http://stg.myxxjs.com:9001/api/user";
        httpUtil.httpGet(u,(err,res)=>{
            console.log(err||res)
        })
        /*fetch(u, {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        }).then( response =>
            console.log(response)
        )*/
        /*console.log('Click')
        this.setState({clickCount:this.state.clickCount+1})*/
    }
    render() {
        return (

            <div>
                <button className="waves-effect btn" onClick={this.setClickCount.bind(this)}>Click</button>
                <h6>Click Count :</h6><small>{this.state.clickCount}</small>
            </div>
        )


    }
}

module.exports = Panel;