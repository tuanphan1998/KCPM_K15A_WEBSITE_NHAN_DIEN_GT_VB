import React, { Component } from 'react';
import {firebasetwo} from '../../firebaseconnectio';
import TaskShow from './TaskShow';
class New extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : ''
        };
    }
    componentWillMount() {
        firebasetwo.on('value',(datas) => {
          var Mang = [];
          datas.forEach(element => {
              const key =  element.key;
              const amthanh = element.val().amthanh;
              const hinhanh = element.val().hinhanh;
              const vanbans = element.val().vanbans;
               const hastag = element.val().hashtag;
              Mang.push({
                key : key,
                amthanh : amthanh,
                hinhanh : hinhanh,
                vanbans : vanbans,
                hastag : hastag,
              })
          });
          this.setState({
            data : Mang
          });
        })
      }

      Showdatanhauchua = () => {
        if(this.state.data)
        {
          return this.state.data.map((value , key) => {
              return <TaskShow hinhanhs={value.hinhanh} vanbans={value.vanbans} ssss={value.key} stt={key} hastag={value.hastag}/>;
          })
        }
      }

    render() {
        return (
          <div className="row">
            <div className="col-12">
                <div className="card-deck">
                        {this.Showdatanhauchua()}
                </div>
              </div>
            </div>
        );
    }
}

export default New;