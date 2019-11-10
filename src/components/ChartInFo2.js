import React, { Component } from 'react';
import {firebaseone} from '../firebaseconnectio';
import ChartInfo3 from './ChartInfo3';
import ChartInFo4 from './ChartInFo4';
class ChartInFo2 extends Component {
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
            if(sex==="NAM" || sex==="NỮ")
            {
              Mang.push({
                key : key,
                sex : sex
              })
            }
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
            <div>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="text-center text-uppercase">
                    <h2>Tỉ lệ giấy tờ</h2>
                  </div>
                  {/* //.text-center */}
                  <div className="column-chart">
                    <div className="legend legend-left hidden-xs">
                      <h3 className="legend-title">%</h3>
                    </div>
                    {/* //.legend */}
                    <div className="legend legend-right hidden-xs">
                      <div className="item">
                        <h4>Cccd</h4>
                      </div>
                      {/* //.item */}
                      <div className="item">
                        <h4>Cmnd</h4>
                      </div>
                      {/* //.item */}
                      <div className="item">
                        <h4>Tổng hợp</h4>
                      </div>
                      {/* //.item */}
                      <div className="item">
                        <h4>Toàn quốc</h4>
                      </div>
                      {/* //.item */}
                    </div>
                    {/* //.legend */}
                    <div className="chart clearfix">
                      <div className="item">
                        <div className="bar">
                          <span className="percent">{Math.floor(this.ShowDatacccd()) + "%"}</span>
                          <div className="item-progress"   style={{height: this.ShowDatacccd()+"%"}}>
                          </div>
                          {/* //.item-progress */}
                        </div>
                        {/* //.bar */}
                      </div>
                      {/* //.item */}
                      <div className="item">
                        <ChartInfo3/>
                        {/* //.bar */}
                      </div>
                      {/* //.item */}
                      <div className="item">
                        <ChartInFo4/>
                        {/* //.bar */}
                      </div>
                      {/* //.item */}
                      <div className="item">
                        <div className="bar">
                          <span className="percent">100%</span>
                          <div className="item-progress"  style={{height:'100%'}}>
                          </div>
                          {/* //.item-progress */}
                        </div>
                        {/* //.bar */}
                      </div>
                      {/* //.item */}
                    </div>
                    {/* //.chart */}
                  </div>
                  {/* //.column-chart */}
                </div>
                {/* //.col-md-6 */}
              </div>
              {/* //.row */}
            </div>
            {/* //.container */}
            <br/>
          </div>          
        );
    }
}
 
export default ChartInFo2;