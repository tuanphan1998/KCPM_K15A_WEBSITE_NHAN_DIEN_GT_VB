import React, { Component } from 'react';
import {firebaseone} from '../firebaseconnectio';
class ChartNu extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
        };
    }
    componentWillMount() {
        firebaseone.on('value',(datas) => {
            var Mang = [];
            datas.forEach(element => {
                const key = element.key;
                const sex = element.val().sex;
                if(sex === "NỮ")
                {
                    Mang.push({
                        key : key,
                        sex : sex,
                    })
                }
            });
            this.setState({
                data : Mang 
            });
        })
    }

    showdata = () => {
        var temp = this.state.data.length;
        this.props.laydatadetonghopnu(temp);
        return (temp / 95414640) * 100;
    }
    render() { 
        return (
            <div className="bar">
                          <span className="percent">{Math.floor(this.showdata()) + "%"}</span>
                          <div className="item-progress"  style={{height: this.showdata()+"%"}}>
                          </div>
                          {/* //.item-progress */}
             </div>   
        );
    }
}
 
export default ChartNu;