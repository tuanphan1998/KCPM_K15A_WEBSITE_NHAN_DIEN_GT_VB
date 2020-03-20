import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import request from 'superagent';
import KOKOBAY from './item';
import mahoan from './mahoan.json';
import {firebasethree} from '../firebaseconnectio';
import {connect} from 'react-redux';
class FormText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image_url : '',
						data : '',
						changeGiayTo : '',
						dataBase64 : "",
						datas : [process.env.REACT_APP_API_KEY]
        };
		}
    isChange = (event) => {
        const value = event.target.value;
        this.setState({
            image_url : event.target.value,
            data : event.target.value,
        })
        console.log(value);
        
		}

		handleTakePhoto = (dataUri) => {
			console.log('takePhoto' + dataUri);
      let aes256 = require('aes256');
      let key = 'tuanphan';
      let canMaHoa = dataUri;
      let maHoa = aes256.encrypt(key , canMaHoa);
      if(maHoa)
      {
        let giaima = aes256.decrypt(key , maHoa)
        this.setState({
          dataBase64 : giaima.slice(22)
        });
      }
      console.log(maHoa);
    }
    


		isChange2 = (event) => {
			const value = event.target.value;
			this.setState({
				changeGiayTo : value
			})
			console.log(value);
		}


		functionThucThi = () => {
			var info = {};
			info.image_url = this.state.image_url;
			request
			.post(this.state.changeGiayTo)
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.set('api_key',this.hamngoai())
			.send({image_base64: this.state.dataBase64})
			.send({image_url: this.state.image_url})
			.send({face:1})
			.end(function(err, res){
			if(err)
			{
					alert("ban hết hạn số lượt gọi");
			}
			else
			{
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
						localStorage.setItem('mahoan',JSON.stringify(items.data[0]));
						window.location.reload();
					
					}
			}
			});
		}

		
		hamngoai = () => {
			return( this.state.datas[this.state.datas.length - 1]);
		}
    Haller = () => {
				if(this.state.image_url=== "" && this.state.dataBase64 === "")
				{
					this.props.ThuchienthaydoitrangthaiA();
					this.props.ThuchienlaydulieuA("Bạn chưa gán giá trị gì");
				}
				else
				{
					this.functionThucThi();
				}
    }
   // WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
				firebasethree.on('value',(datas) => {
					var Mang = [];
					datas.forEach(element => {
							const data = element.val();
							Mang.push(data)
					});
					this.setState({
						datas : Mang
					});
				})	
        if(localStorage.getItem('mahoan') === null)
        {
            localStorage.setItem('mahoan',JSON.stringify(mahoan));
        }
        else
        {
            var template = JSON.parse(localStorage.getItem('mahoan'));
            this.setState({
                data : template
            })
        }
        
    }
    componentDidMount() {
        if(localStorage.getItem('mahoan') === null)
        {
            localStorage.setItem('mahoan',JSON.stringify(mahoan));
        }
        else
        {
            var template = JSON.parse(localStorage.getItem('mahoan'));
            this.setState({
                data : template
            })
          
        }
    }
    ButtonsClean = () => {
        if(window.confirm('Bạn muốn thực hiện quy trình tải dữ liệu lên [YES]'))
        {
            this.props.ThuchienthaydoitrangthaiA();
            this.props.ThuchienlaydulieuA("tiến trình  update " + this.state.data.name + " thành công");
            this.props.ThucHIenGetData(this.state.data);  
        }
    }
    ButtonsClean2 = () => {
        if(window.confirm('Bạn muốn thực hiện quy trình làm sạch dữ liệu nền [YES]'))
        {
            this.props.ThuchienthaydoitrangthaiA();
            this.props.ThuchienlaydulieuA("tiến trình  thành công ");
            setTimeout(function(){
                window.location.reload();
                localStorage.removeItem('mahoan');
            }, 3000);   
        }
    }
    thongBao = () => {
      this.props.ThuchienthaydoitrangthaiA();
      let noidung = this.state.changeGiayTo;
      if(noidung === "/vision/idr/vnm")
      {
       return this.props.ThuchienlaydulieuA("Bạn đã lựa chọn chứng minh nhân dân và căn cước công dân");
      }
      else if(noidung === "/vision/dlr/vnm")
      {
        return this.props.ThuchienlaydulieuA("Bạn đã lựa chọn giấy phép lái xe");
      }
      else if(noidung === "/vision/passport/vnm")
      {
        return this.props.ThuchienlaydulieuA("bạn đã chọn hộ chiếu");
      }
    }
    chupAnhWebCam = () => {
      this.props.ThuchienthaydoitrangthaiA();
      if(this.state.dataBase64)
      {
       return this.props.ThuchienlaydulieuA("Chụp ảnh thành công");
      }
      else
      {
      return   this.props.ThuchienlaydulieuA("bạn chưa chụp gì yêu cầu chụp để bắt đầu tiến trình");
      }

    }
    render() {
			console.log( [process.env.REACT_APP_API_KEY]);
        return (
            <div className="thaydoitinha">
								
                  <div className="input-group mb-3 mt-5">
										
                    <input type="text" className="form-control" onChange={(event)=>this.isChange(event)}  placeholder="import link images" name="image_url" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2">.JPG/.JPEG/.PNG</span>
                    <button type="button" className="btn btn-success" onClick={()=>this.Haller()}><i className="fas fa-archway"></i></button>
                    <button type="button" className="btn btn-info" onClick={()=>this.ButtonsClean()}><i className="fas fa-cloud-upload-alt"></i></button>
                    <button type="button" className="btn btn-warning" onClick={()=>this.ButtonsClean2()}><i className="fas fa-eraser"></i></button>
										<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"><i className="fas fa-cogs"></i></button>
										<button type="button" className="btn btn-dark" data-toggle="modal" data-target="#exampleModalCenter2"><i className="fas fa-video"></i></button>
                    </div>



										<div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>this.thongBao()}>Save change</button>
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
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>this.chupAnhWebCam()}>Save change</button>
                </div>
              </div>
            </div>
          </div>










										
                </div>
                <KOKOBAY dulieushh={this.state.data}/>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        GetData: state.laydata
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ThucHIenGetData: (getitem) => {
            dispatch({type:'LAY_DATA',getitem})
        },
        ThuchienthaydoitrangthaiA: () => {
            dispatch({type:'TRANG_THAI'})
        },
        ThuchienlaydulieuA: (getitem) => {
            dispatch({type:'GETDATA',getitem})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormText);