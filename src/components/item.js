import React, { Component } from 'react';
class item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : this.props.dulieushh,
			ketquachinhthuc : '',
	
        };
    }
    showconten = () => {
        if(this.props.dulieushh.nationality === "N/A")
        {
            return (
                <h4>Hình ảnh đầu vào : chứng minh nhân dân (Loại cũ) </h4>
                
            )
        }
        else if (this.props.dulieushh.nationality === undefined)
        {
            return (
                <h4>Hình ảnh đầu vào : chứng minh nhân dân (Loại mới) </h4>
            )
        }
        else
        {
            return (
                <h4>Hình ảnh đầu vào :  Căn cước công dân</h4>
            )
        }
		}
	
    phongdoangioitinh = () => {
        if(this.props.dulieushh.sex === "N/A")
        {
            return(
							"dang xanh dung"
            );
        }
        else
        {
            return (this.props.dulieushh.sex);
        }
		}


		


    render() {
        return (
            <div>
               
                <div className="col">
                        {this.showconten()}
                        <div className="card text-left">
                        <div className="card-body">
                        {this.props.dulieushh.cropped_idcard &&  <img className="card-img-top" width="120px" src={this.props.dulieushh.cropped_idcard} alt="demo" /> }
                        {this.props.dulieushh &&  <img className="card-img-top" width="120px" src={this.props.dulieushh} alt="" /> }
                        </div>
                        <div className="card-body" >
                        		{this.props.dulieushh.face &&  <img className="card-img-top left_manager" style={{width: '240px',height: '300px', marginRight: '40px'}} src={this.props.dulieushh.face} alt="demo" />}
                            <div className="card-body" style={{paddingTop: '0px'}}>
                            {this.props.dulieushh.name && <h5 className="card-title color_mana mb-10" style={{marginBottom: '16px'}}>Tên : {this.props.dulieushh.name}</h5> }
                            {this.props.dulieushh.address &&   <h5 className="card-title color_mana mb-10" style={{marginBottom: '16px'}}>Địa chỉ : {this.props.dulieushh.address}</h5> }
                            {this.props.dulieushh.home && <h5 className="card-title color_mana mb-10" style={{marginBottom: '16px'}}>Địa chỉ đăng ký : {this.props.dulieushh.home}</h5>}
                            {this.props.dulieushh.id &&   <h5 className="card-title color_mana mb-10" style={{marginBottom: '16px'}}>Số cmnd : {this.props.dulieushh.id}</h5>}
                            {this.props.dulieushh.dob &&   <h5 className="card-title color_mana mb-10" style={{marginBottom: '16px'}}>Ngày sinh : {this.props.dulieushh.dob}</h5> }
                            {this.props.dulieushh.sex &&   <h5 className="card-title color_mana  mb-10" style={{marginBottom: '16px'}}>Giới tính : {this.phongdoangioitinh()}     {this.state.ketquachinhthuc}</h5> }
                            {this.props.dulieushh.doe &&   <h5 className="card-title color_mana" style={{marginBottom: '16px'}}>Ngày hết hạn : {this.props.dulieushh.doe}</h5> }
                            {this.props.dulieushh.nationality &&   <h5 className="card-title color_mana" style={{marginBottom: '16px'}}>Quốc tịch : {this.props.dulieushh.nationality}</h5> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default item;