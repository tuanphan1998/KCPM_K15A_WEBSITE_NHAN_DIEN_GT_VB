import React, { Component } from 'react';
import {firebaseone} from '../firebaseconnectio';
class ChartInFo4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data : []
        };
      }
      componentWillMount() {
        firebaseone.on('value',(datas) => {
          var Mang = [];
          datas.forEach(element => {
              const key = element.key;
              const sex = element.val().sex;
                Mang.push({
                  key : key,
                  sex : sex
                })
          });
          this.setState({
            data : Mang
          })
        })
      }
  
      ShowDatacccd = () => {
        var temp = this.state.data.length;
        var ketqua = (temp / 95414640) * 100;
        return ketqua;
      }
  
  
    render() {
        return (
            <div className="bar">
                <span className="percent">{Math.floor(this.ShowDatacccd()) + "%"}</span>
                <div className="item-progress"   style={{height: this.ShowDatacccd()+"%"}}>
            </div>
            {/* //.item-progress */}
          </div>
        );
    }
}

export default ChartInFo4;