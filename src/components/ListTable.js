import React, { Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {firebaseone} from '../firebaseconnectio';
import Search from './SearchData/Search';
import KOKOBAYs from './DataAwsSearch/dulieusearch';

class ListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      dulieukiemtim : '',
      dulieuluuvesolanxoa : 0,
    };
  }
  componentWillMount() {
    firebaseone.on('value',(datas) => {
      var Mang = [];
      datas.forEach(element => {
        const key = element.key;
        const name = element.val().name;
        const id = element.val().id;
        const dob = element.val().dob;
        const home = element.val().home;
        const address = element.val().address;
        const sex = element.val().sex;
        const nationality = element.val().nationality;
        const doe = element.val().doe;
        const ethnicity = element.val().ethnicity;
        const tonhiao = element.val().tonhiao;
        const ngayhethan = element.val().ngayhethan;
        const noicap = element.val().noicap;
        Mang.push({
          key : key,
          name : name,
          id : id,
          dob : dob,
          home : home,
          address : address,
          sex : sex,
          nationality : nationality,
          doe : doe,
          ethnicity : ethnicity,
          tonhiao : tonhiao,
          ngayhethan : ngayhethan,
          noicap : noicap
        })
      });
      this.setState({
        data : Mang,
      })
    })
  }



  GhiNhanKietQuaTimKiem = (dl) => {
    console.log("du lieu tim kiem " + dl);
    let dilieuchuyen = dl.toUpperCase();
    this.setState({
      dulieukiemtim : dilieuchuyen
    })
  }
   
    render() {
      var ketqua = [];
      this.state.data.forEach((item) => {
        if( item.name.indexOf(this.state.dulieukiemtim) !== -1)
        {
          ketqua.push(item);
        }
        else if (item.id.indexOf(this.state.dulieukiemtim) !== -1)
        {
          ketqua.push(item);
        }
        return 0;
      })
        return (
            <div className="mt-4 table-wrapper-scroll-y my-custom-scrollbar">
              <Search GhiNhanKietQuaTimKiem={(dl)=>this.GhiNhanKietQuaTimKiem(dl)}/>
               <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"/>
										<p><i style={{marginLeft:"12px"}} className="fas fa-street-view"></i>{this.state.data.length}</p>
            <table className="table table-bordered table-striped mb-0" id="table-to-xls" border="1">
              <thead className="thead-dark" style={{fontSize: '12px'}}>
                <tr >
                  <th scope="col">Code</th>
                  <th scope="col">Họ và tên</th>
                  <th scope="col">Số CMND</th>
                  <th scope="col">Ngày sinh</th>
                  <th scope="col">Nguyên quán</th>
                  <th scope="col">Nơi đăng ký HKTT</th>
                  <th scope="col">Giới tính</th>
                  <th scope="col">Quốc tịch</th>
                  <th scope="col">Ngày hết hạn</th>
                  <th scope="col">Ngày hiện tại</th>
                 

                  <th scope="col">Dân tộc</th>
                  <th scope="col">Tôn giáo</th>
                  <th scope="col">Ngày đăng ký</th>
                  <th scope="col">Nơi cấp</th>
                  <th scope="col">Trạng thái</th>
                </tr>
              </thead>
                  <KOKOBAYs dulieu={ketqua}/>
            </table>
          </div>
          
        );
    }
}
export default ListTable;