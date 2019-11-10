import React, { Component } from 'react';
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
		
		hamngoai = () => {
			return( this.state.datas[this.state.datas.length - 1]);
		}
    Haller = () => {
        if(this.state.image_url === "")
        {
          alert('Yêu cầu bạn nhập thông tin');
        }
        else
        {
          var info = {};
          info.image_url = this.state.image_url;
          request
          .post('https://api.openfpt.vn/cmt')
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('api_key',this.hamngoai())
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
    render() {
        return (
            <div>
                  <div className="input-group mb-3 mt-5">
                    <input type="text" className="form-control" onChange={(event)=>this.isChange(event)}  placeholder="import link images" name="image_url" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2">.JPG/.JPEG/.PNG</span>
                    <button type="button" className="btn btn-success" onClick={()=>this.Haller()}><i className="fas fa-archway"></i></button>
                    <button type="button" className="btn btn-info" onClick={()=>this.ButtonsClean()}><i className="fas fa-cloud-upload-alt"></i></button>
                    <button type="button" className="btn btn-warning" onClick={()=>this.ButtonsClean2()}><i className="fas fa-eraser"></i></button>
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