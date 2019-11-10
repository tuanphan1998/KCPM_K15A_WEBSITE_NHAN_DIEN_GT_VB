import React, { Component } from 'react';
import ThongBaoCapCaoCo from './ThongBaoCapCao';
import {firebaseone} from '../firebaseconnectio';
import ChartInFo from './ChartInFo';
import Search2 from './SearchData/Search2';
import KOOBAY from './DataAwsSearch/dulieutimkiemformthongke';
import mahoans from './mahoan.json'
import Agen from './ThapTuoi/Agen';
class FormInForVsEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            data2 : [],
						data3 : '',
					
        };
		}
		
	
     
    componentWillMount() {
        firebaseone.on('value',(dats) => {
            var Mang = [];
            dats.forEach(element => {
                const key = element.key;
                const id = element.val().id;
                const name = element.val().name;
                const dob = element.val().dob;
                const home = element.val().home;
                const address = element.val().address;
                const doe = element.val().doe;
                const sex = element.val().sex;
                const ethnicity = element.val().ethnicity;
                const tonhiao = element.val().tonhiao;
                const ngayhethan = element.val().ngayhethan;
                const noicap = element.val().noicap;
                const images = element.val().images;
                Mang.push({
                    key : key,
                    id : id,
                    dob : dob,
                    home : home,
                    address : address,
                    name : name,
                    doe : doe,
                    sex : sex,
                    ethnicity : ethnicity,
                    tonhiao : tonhiao,
                    ngayhethan : ngayhethan,
                    noicap : noicap,
                    images : images
                })
            });
            this.setState({
                data : Mang,
            })
        });

        if(localStorage.getItem('mahoan') === null)
        {
            localStorage.setItem('mahoan',JSON.stringify(mahoans))
        }
        else
        {
            var temp = JSON.parse(localStorage.getItem('mahoan'));
            this.setState({
                data2 : temp
            });
        }
       
    }
    KetquaPhantran = () => {
        var sogoc = this.state.data.length;
        if(sogoc === null)
        {
            return(0);
        }
        else
        {
            return(sogoc / 100 * 100);
        }
		}
		

		luutruduieu = (dl) => {
			this.setState({
				data3 : dl
			});
		}


    render() {
		
        var ketqua = [];
        this.state.data.forEach((item) => {
            if(item.name.indexOf(this.state.data3) !== -1)
            {
                ketqua.push(item);
						}
						else if (item.id.indexOf(this.state.data3) !== -1)
						{
							ketqua.push(item);
						}
						return 0;
        });
        console.log(this.props.ThuchineHienTHi);
        return (
            <div id="accordion" className="mt-4">
                <div className="row mt-2 mb-4">
                    <div className = "col-6">
                        <iframe src='https://danso.org/bdds/?country=viet-nam'  frameBorder={0} scrolling="no" width={550} height={300}  title="myFrame"></iframe>
                    </div>
                    <div className = "col-6"> 
                        <iframe src="https://danso.org/bdtl/?country=viet-nam" frameBorder={0} scrolling="no" width={550} height={300} title="myframe2"></iframe>
                    </div>
                </div>
                <div className="row mb-5">
                <div className="col-12">
                    <span className="d-flex flex-row bd-highlight mb-3">Thông tin vừa update</span>
                    <table className="table table-hover font-size">
                        <thead>
                            <tr>
                            <th scope="col">Tên</th>
                            <th scope="col">Cmnd</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Đăng ký</th>
                            <th scope="col">Năm sinh</th>
                            <th scope="col">Số cmnd</th>
                          
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">{this.state.data2.name}</th>
                                <td><img width="300px" height="200px" src={this.state.data2.cropped_idcard} alt="demo"></img></td>
                                <td><img height="200px" src={this.state.data2.face} alt="demo"></img></td>
                                <td>{this.state.data2.home}</td>
                                <td>{this.state.data2.address}</td>
                                <td>{this.state.data2.dob}</td>
                                <td>{this.state.data2.id}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
                <ChartInFo/>
                <div className="container">
                <div className="row" style={{marginTop: '30px'}}>
                    <div className="col-md-12">
                   <i className="fa fa-pie-chart" aria-hidden="true" />
                    <h1>Tháp tuổi</h1>
                    <small className="ash">Thống kê độ tuổi</small><br />
                    <Agen/>
                    </div>
                </div>
                </div>
                <ThongBaoCapCaoCo data={this.state.data} KetquaPhantran={()=>this.KetquaPhantran()}/>
                <Search2 luutruduieu2={(dl) => this.luutruduieu(dl)}/>
                <KOOBAY dulieukiemtim={ketqua}/>
            </div>
        );
    }
}

export default FormInForVsEdit;