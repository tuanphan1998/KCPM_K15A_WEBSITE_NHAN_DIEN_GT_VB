import React, { Component } from 'react';
import request from 'superagent';
import KOKOBAY from './itemback';
import mahoan2 from './mahoan2.json';
import {firebaseone} from '../firebaseconnectio';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {connect} from 'react-redux';
class FormTextBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image_url : '',
            data : '',
            data2 : '',
						persion : '',
						changeGiayTo : '',
						dataBase64 : "",
            persion2 : ''
        };
    }
    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name] : value
        })
        console.log(value);
		}
		isChange2 = (event) => {
			const value = event.target.value;
			this.setState({
				changeGiayTo : value
			})
			console.log(value);
		}
		handleTakePhoto = (dataUri) => {
			console.log('takePhoto' + dataUri);
			this.setState({
				dataBase64 : dataUri.slice(22)
			});
    }
    Haller = () => {
        if(this.state.dataBase64 === "")
        {
          alert('Yêu cầu bạn nhập thông tin');
        }
        else
        {
          var info = {};
          info.image_url = this.state.image_url;
          console.log(info);
          request
          .post(this.state.changeGiayTo)
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('api_key', 'ZF8gEvJwnI7syj6yWSA4P66U3hE0ZXZt')
					.send({image_base64: this.state.dataBase64})
          .send({image_url: this.state.image_url})
          .send({face:1})
          .end(function(err, res){
          if(err)
          {
              console.log(err);
              alert("hết hạn số lượt gọi");
          }
          else
          {
              console.log(res);
              var items = JSON.parse(res.text);
              if(res.body.errorCode === 3)
              {
                  alert('hệ thống không tìm thấy CMT trong ảnh hoặc ảnh có chất lượng kém (quá mờ, quá tối/sáng).');
              }
              else if (res.body.errorCode === 1)
              {
                  alert('Sai thông số trong request (ví dụ không có key hoặc ảnh trong request body).');
              }
              else if (res.body.errorCode === 2)
              {
                  alert('CMT trong ảnh bị thiếu góc nên không thể crop về dạng chuẩn.');
              }
              else if (res.body.errorCode === 5)
              {
                  alert(' Request sử dụng key image_url nhưng giá trị bỏ trống.');
              }
              else if (res.body.errorCode === 6)
              {
                  alert('Request sử dụng key image_url nhưng hệ thống không thể mở được URL này.');
              }
              else if (res.body.errorCode === 7)
              {
                  alert('File gửi lên không phải là file ảnh.');
              }
              else if (res.body.errorCode === 8)
              {
                  alert(' File ảnh gửi lên bị hỏng hoặc format không được hỗ trợ.');
              }
              else if (res.body.errorCode === 9)
              {
                  alert(' Request sử dụng key image_base64 nhưng giá trị bỏ trống.');
              }
              else if (res.body.errorCode === 10)
              {
                  alert('Request sử dụng key image_base64 nhưng string cung cấp không hợp lệ.');
              }
              else
              {
                console.log(items.data[0]);
                localStorage.setItem('mahoan2',JSON.stringify(items.data[0]));
                window.location.reload();
              }
          }
          });
        }    
    }
    componentWillMount() {
        firebaseone.on('value',(datass) => {
            var Mang2 = [];
            datass.forEach(element => {
                const stt = element.key;
                const key = element.val().key;
                const name = element.val().name;
                Mang2.push({
                    stt : stt,
                    key : key,
                    name : name,
                })
            });
            this.setState({
                data2 : Mang2
            });
        })
        if(localStorage.getItem('mahoan2') === null)
        {
            localStorage.setItem('mahoan2',JSON.stringify(mahoan2));
        }
        else
        {
            var template = JSON.parse(localStorage.getItem('mahoan2'));
            this.setState({
                data : template
            })
        }
    }
    componentDidMount() {
        if(localStorage.getItem('mahoan2') === null)
        {
            localStorage.setItem('mahoan2',JSON.stringify(mahoan2));
        }
        else
        {
            var template = JSON.parse(localStorage.getItem('mahoan2'));
            this.setState({
                data : template
            })
        }
    }
    ButtonsClean = () => {
        localStorage.removeItem('mahoan2');
        window.location.reload();
        this.props.ThuchienthaydoitrangthaiA();
        this.props.ThuchienlaydulieuA("tiến trình làm sạch thành công ");
    }

    ShowKeyss = () => {
        if(this.state.data2)
        {
            return this.state.data2.map((value , key) => {
                return   <option value={value.name} key={key}>{value.name}</option>;
            })
        }
    }

    ShowKeyss2 = () => {
        if(this.state.data2)
        {
            return this.state.data2.map((value , key) => {
                return   <option value={value.stt} key={key}>{value.stt}</option>;
            })
        }
    }

    updatedatahehe = () => {
        if(this.state.persion && this.state.persion2)
        {
            var info = {};
            info.namess = this.state.persion;
            info.key = this.state.persion2;
            info.ethnicity = this.state.data.ethnicity;
            info.ngayhethan = this.state.data.issue_date;
            info.noicap = this.state.data.issue_loc;
            info.tonhiao = this.state.data.religion;
            this.props.ThucHienQuyTrinhLayData(info);
            this.props.ThuchienthaydoitrangthaiA();
            this.props.ThuchienlaydulieuA("tiến trình tải lên mặt sau cho " + this.state.persion + " thành công ");
        }
        else
        {
            if(this.state.persion === null)
            {
                this.props.ThuchienthaydoitrangthaiA();
                this.props.ThuchienlaydulieuA("Chúng tôi phát hiện bạn còn thiếu thông tin họ tên cần update");
            }
            else if(this.state.persion2 === null)
            {
                this.props.ThuchienthaydoitrangthaiA();
                this.props.ThuchienlaydulieuA("Chúng tôi phát hiện bạn còn thiếu thông tin key để update");
            }
            else
            {
                this.props.ThuchienthaydoitrangthaiA();
                this.props.ThuchienlaydulieuA("Chúng tôi phát hiện bạn còn thiếu thông tin để update");
            }
        }
    }
    
    render() {
       
        return (
            <div>
                     <div className="input-group mb-3 mt-5">
                    <input type="text" className="form-control" onChange={(event)=>this.isChange(event)} placeholder="import link images" name="image_url" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2">.JPG/.JPEG/.PNG</span>
                    <button type="button" className="btn btn-success" onClick={()=>this.Haller()}><i className="fas fa-archway"></i></button>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"><i className="fas fa-cloud-upload-alt"></i></button>
                    <button type="button" className="btn btn-warning" onClick={()=>this.ButtonsClean()}><i className="fas fa-eraser"></i></button>
										<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter3"><i className="fas fa-cogs"></i></button>
										<button type="button" className="btn btn-dark" data-toggle="modal" data-target="#exampleModalCenter2"><i className="fas fa-video"></i></button>
                    </div>




										<div className="modal fade" id="exampleModalCenter3" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">Lựa chọn giấy tờ phù hợp</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">

                <div className="form-row">
            <div className="form-group col-md-12">
            
                  <select className="form-control form-control-sm" onChange={(event)=>this.isChange2(event)} name="persion">
                          <option value>Chọn loại giấy tờ</option>
                          <option value={"/vision/idr/vnm"}>Chứng minh nhân dân và căn cước công dân</option>
                          <option value={"/vision/dlr/vnm"}>Giấy phép lái xe</option>
                          <option value={"/vision/passport/vnm"}>Hộ chiếu</option>
                  </select>
            </div>
          </div>

          <div className="form-group">
              
							{
                this.state.changeGiayTo && <div className="alert alert-primary" role="alert">
                    Giấy tờ cá nhân : <a href="/" className="alert-link">{this.state.changeGiayTo}</a>
                </div>
              }
              
          </div>
                
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" data-dismiss="modal">Save change</button>
                </div>
              </div>
            </div>
          </div>
















					<div className="modal fade" id="exampleModalCenter2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content"  style={{width: '800px'}}>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">Camera HD</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">

                <div className="form-row">
            <div className="form-group col-md-12">
							<div className="d-flex justify-content-center">	
									<div>
									<Camera  onTakePhoto = { (dataUri) => {this.handleTakePhoto(dataUri); } }/>
									</div>
							</div>
						
            </div>
          </div>

          <div className="form-group">
              
							{
                this.state.dataBase64 && <div className="alert alert-primary" role="alert">
                  <pre>
									Dữ liệu mã hóa : <a href="/" className="alert-link">{this.state.dataBase64}</a>
									</pre>
                </div>
              }
              
          </div>
                
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" data-dismiss="modal">Save change</button>
                </div>
              </div>
            </div>
          </div>










                </div>



            <KOKOBAY dulieushh={this.state.data}/>

            <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">Bảng dữ liệu đã update lên từ mặt trước</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">

                <div className="form-row">
            <div className="form-group col-md-6">
            
                  <select multiple className="form-control"  onChange={(event)=>this.isChange(event)} name="persion"  id="exampleFormControlSelect2">
                          <option value> --- Tên thành viên --- </option>
                            {this.ShowKeyss()}
                  </select>
            </div>
              <div className="form-group col-md-6">
               
              <select multiple className="form-control"  onChange={(event)=>this.isChange(event)} name="persion2" id="exampleFormControlSelect2">
                            <option value> --- Chọn mã số key --- </option>
                            {this.ShowKeyss2()}
                    </select>
              </div>
          </div>                
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>this.updatedatahehe()}>Save change</button>
                </div>
              </div>
            </div>
          </div>

        </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        ThucHienUpdatematSauState: state.updatematsau
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ThucHienQuyTrinhLayData: (getitem) => {
            dispatch({type:'GET_DATA_MASTER_BACK',getitem})
        },
        ThuchienthaydoitrangthaiA: () => {
            dispatch({type:'TRANG_THAI'})
        },
        ThuchienlaydulieuA: (getitem) => {
            dispatch({type:'GETDATA',getitem})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormTextBack);