import React, { Component } from 'react';
import {connect} from 'react-redux';
class Buttonform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key : this.props.thongtincaptinh.key,
            name : this.props.thongtincaptinh.name,
            id : this.props.thongtincaptinh.id,
            dob : this.props.thongtincaptinh.dob,
            home : this.props.thongtincaptinh.home,
            address : this.props.thongtincaptinh.address,
        };
    }

    IsChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name] : value
        });
        console.log(this.state);
    }
    
    getshowthongtin = () => {
        var info = {};
        info.key = this.state.key;
        info.name = this.state.name;
        info.id = this.state.id;
        info.dob = this.state.dob;
        info.home = this.state.home;
        info.address = this.state.address;
        this.props.ThucHienUpdatesss(info);
    }

    XoaDele = (uuid) => {
        this.props.ThucHienXoa(uuid);
    }

    ShowLoa = () => {
        if(this.props.thongtincaptinh.doe === "N/A")
        {
            return(
               1
            )
        }
        else
        {
            return(
              2
            )
        }
    }
    render() {
        return (
            <div>
                    <button type="button" className="btn btn-primary right" data-toggle="modal" data-target={'#exampleModalCenter' + this.props.thongtincaptinh.key}>
										<i className="fas fa-edit"></i>
                    </button>
                    <button type="button" className="btn btn-warning right" onClick={(uuid)=>this.XoaDele(this.props.thongtincaptinh.key)}>
										<i className="fas fa-user-minus"></i>
                    </button>


                     <div className="modal fade" id={'exampleModalCenter' + this.props.thongtincaptinh.key} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Chỉnh sửa thông tin</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                

                            <div className="card text-white bg-primary mb-3">
                                <div className="card-header"></div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <input type="text" onChange={(event)=>this.IsChange(event)}  defaultValue={this.props.thongtincaptinh.name} name="name" className="form-control"  aria-describedby="helpId" placeholder="Tên Người in trong thẻ" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" onChange={(event)=>this.IsChange(event)} defaultValue={this.props.thongtincaptinh.id} name="id" className="form-control"  aria-describedby="helpId" placeholder="Số chứng minh nhân dân" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" onChange={(event)=>this.IsChange(event)} defaultValue={this.props.thongtincaptinh.dob} name="dob" className="form-control"  aria-describedby="helpId" placeholder="Ngày sinh" />
                                        </div>
                                        <div className="form-group">
                                                <textarea defaultValue={this.props.thongtincaptinh.home} onChange={(event)=>this.IsChange(event)} name="home" className="form-control" rows="5" id="comment"></textarea>
                                        </div>
                                        <div className="form-group">
                                        <textarea defaultValue={this.props.thongtincaptinh.address} onChange={(event)=>this.IsChange(event)} name="address" className="form-control" rows="5" id="comment"></textarea>
                                        </div>
                                        <div className="form-group">
                                            <select className="custom-select chon"  name="chon" defaultValue={this.ShowLoa()} required>
                                                <option value={1}>Chứng minh nhân dân</option>
                                                <option value={2}>Căn cước công dân</option>
                                            </select>
                                        <div className="invalid-feedback">Example invalid custom select feedback</div>
                                        </div>
                                        <div className="form-group">
                                    </div>
                                </div>
                            </div>

                                

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Clone</button>
                                <button type="button" className="btn btn-primary"  data-dismiss="modal" onClick={()=>this.getshowthongtin()}>Lưu lại</button>
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
        ThucHienUpdate: state.updatedata
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ThucHienUpdatesss: (getupdate) => {
            dispatch({type:'CHANGE_UPDATE',getupdate})
        },
        ThucHienXoa: (xoa) => {
            dispatch({type:'XOA_CUC_DO',xoa})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Buttonform);