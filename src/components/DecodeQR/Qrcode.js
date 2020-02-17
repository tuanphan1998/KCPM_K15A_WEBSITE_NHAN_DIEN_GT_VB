import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
class Qrcode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            changDelay : 300,
            cam : 'environment',
            cam2 : 600
        };
    }
    handleScan = data => {
        if (data) {
          this.setState({
            result: data
          })
        }
      }
      handleError = err => {
        console.error(err)
      }

      showKetQua = () => {
        if(this.state.result === '')
        {
          return(
            <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Bạn hãy đưa QR code đến sát camera</h4>
            <p>Warning</p>
            <hr />
          </div>
          )
        }
        else
        {
          return(
            <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Kết quả trả về</h4>
            <p>{this.state.result}</p>
            <hr />
          </div>
          )
        }
      }

      changeState = (event) => {
        const value = event.target.value;
        this.setState({
          changDelay : value
        });

      
         
      }


      changeState2 = (event) => {
        const value = event.target.value;
        this.setState({
          cam : value
        });

      
         
      }

      changeState3 = (event) => {
        const value = event.target.value;
        this.setState({
          cam2 : value
        });

      
         
      }

      camName = () => {
        if(this.state.cam2 === 'user')
        {
          return(
            <p>camera trước</p>
          )
        }
        else
        {
          return(
            <p>camera sau</p>
          )
        }
      }
      
    render() { 
      console.log(this.state.changDelay);
        return (
          <div className="container">
          <div className="row mbr-justify-content-center">
            <div className="col-lg-6 mbr-col-md-6">
            <QrReader
                    showViewFinder={true}
                    facingMode={this.state.cam}
                    delay={this.state.changDelay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                    />
                  <div>
                    {this.showKetQua()}
                  </div>
            </div>
            <div className="col-lg-6 mbr-col-md-6">
            <div className="alert alert-success" role="alert">
              <h4 className="alert-heading">Tinh chỉnh cài đặt một tí</h4>
              {/* Button trigger modal */}
              <div className="btn-group btn-group-toggle">
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal1"><span role="img" aria-label="sheep">😁</span>Chỉnh độ Delay</button>
              <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#exampleModal2"><span role="img" aria-label="sheep">😎</span>Chỉnh Camera</button>
              </div>
              
              
              {/* Modal */}
              <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Lựa chọn giá trị cụ thể</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                    <div className="form-group">
                      <input type="number"  className="form-control" name="changDelay" onChange={(event)=>this.changeState(event)} id="exampleInputEmail1" aria-describedby="emailHelp"  placeholder="300"/>
                      <small id="emailHelp" className="form-text text-muted">Khuyến cáo chọn con số phù hợp</small>
                    </div>

                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Lưu trạng thái</button>
                    </div>
                  </div>
                </div>
              </div>



                {/* Modal */}
                <div className="modal fade" id="exampleModal2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Lựa chọn giá trị cụ thể</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                    <div className="form-group">
                    <select class="form-control" id="exampleFormControlSelect1" onChange={(event)=>this.changeState2(event)} name="cam">
                      <option value={"user"}>Camera trước</option>
                      <option value={"environment"}>Camera sau</option>
                    </select>
                    <small id="emailHelp" className="form-text text-muted">Khuyến cáo chọn con số phù hợp</small>
                    </div>

                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Lưu trạng thái</button>
                    </div>
                  </div>
                </div>
              </div>



               {/* Modal */}
               <div className="modal fade" id="exampleModal3" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Lựa chọn giá trị cụ thể</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                    <div className="form-group">
                   
                    <input type="number"  className="form-control" name="cam2" onChange={(event)=>this.changeState3(event)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="600" />
                    <small id="emailHelp" className="form-text text-muted">Độ phân giải mặc định là 600 nếu lớn hơn sẽ tăng độ chính xác nhưng nó cũng sẽ làm chậm thời gian xử lý.</small>
                   
                    
                    </div>

                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Lưu trạng thái</button>
                    </div>
                  </div>
                </div>
              </div>



              <hr />
        <p className="mb-0">Chúng tôi phát hiện thấy bạn đang để độ trễ phản hồi kết quả là {this.state.changDelay} và camera đang sử dụng là loại {this.camName()}</p>
            </div>
                <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Độ phân giải</h4>
                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal3"><span role="img" aria-label="sheep">🤔</span>Chỉnh độ phân giải</button>
                <p className="mb-0">Chọn một độ phân giải hợp lý nhất {this.state.cam2} để tránh trường hợp nhìn thì nét nhưng chờ thì lâu !😜</p>
                <hr />

								<div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Bước cuối cùng</h4>
								<div className="btn-group btn-group-toggle">
              <button type="button" className="btn btn-primary" onClick={() => this.props.authenticate("Github")} data-toggle="modal" data-target="#exampleModal1"><span role="img" aria-label="sheep">😁</span>Chỉnh độ Delay</button>
              <button type="button" className="btn btn-secondary"  onClick={() => this.props.authenticate("Facebook")} data-toggle="modal" data-target="#exampleModal2"><span role="img" aria-label="sheep">😎</span>Chỉnh Camera</button>
              </div>
                <p className="mb-0">Còn chờ gì nữa Login vào thôi giáo sư</p>
                <hr />
								</div>
              </div>
            </div>
          </div>
        </div>
        );
    }
}
 
export default Qrcode;