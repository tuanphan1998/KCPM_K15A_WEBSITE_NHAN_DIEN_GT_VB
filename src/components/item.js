import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import dl from './Data/DulieuHuanLuyen.json';
class item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : this.props.dulieushh,
            ketquachinhthuc : ''
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

    tensorflowtinhtoan = () => {
            let  names = [];
            let sexs = [];
            let sexname = ["NAM","NỮ"];
    
            dl.map((item) => {
                names.push((((item.namecat).charCodeAt(0) + (item.namecat).charCodeAt(1) + (item.namecat).charCodeAt(2))-169)/77);
                sexs.push(sexname.indexOf(item.sexcat));
                return 0;
            })
            console.log(names);
    
            
            // dua data ve tensor
            let xs = tf.tensor1d(names);
            let convetys = tf.tensor1d(sexs,'int32');
            let ys = tf.oneHot(convetys,2);
            console.log(sexs);
            console.log(ys);
    
            // dua ve model va cac mo hinh
    
            let model = tf.sequential();
            let HiddenLayOut = tf.layers.dense({
                units : 16,
                activation : 'sigmoid',
                inputDim : 1,
            })
            let OutPutLayOut = tf.layers.dense({
                activation : 'softmax',
                units : 2
            })
    
            model.add(HiddenLayOut);
            model.add(OutPutLayOut);
            model.compile({
                optimizer : tf.train.sgd(0,2),
                loss: 'categoricalCrossentropy'
            })
    
            console.log("Đang tự học");
    
    
            // train data
            async function train(){
                let option =
                {
                   		epochs : 200,
                     validationSplit : 0.1,
                     shuffle : true
                }
                return await model.fit(xs , ys , option );
                
            }
    
            train().then((res) => {
                console.log("học hỏi thành công");
                console.log(res.history.loss);
    
                let data = this.props.dulieushh.name;
                let cut = data.slice(-3);
                function to_slug(str)
                {
                    // Chuyển hết sang chữ thường
                    str = str.toLowerCase();     
                
                    // xóa dấu
                    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
                    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
                    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
                    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
                    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
                    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
                    str = str.replace(/(đ)/g, 'd');
                
                    // Xóa ký tự đặc biệt
                    str = str.replace(/([^0-9a-z-\s])/g, '');
                
                    // Xóa khoảng trắng thay bằng ký tự -
                    str = str.replace(/(\s+)/g, '');
                
                    // xóa phần dự - ở đầu
                    str = str.replace(/^-+/g, '');
                
                    // xóa phần dư - ở cuối
                    str = str.replace(/-+$/g, '');
                
                    // return
                    return str;
                }
                let all =  to_slug(cut);
                let ket = all.toUpperCase();
            
                // ket qua train
                let dataconvetint32 = (((ket.charCodeAt(0) + ket.charCodeAt(1) + ket.charCodeAt(2)) - 169) / 77);
                let tensordata = tf.tensor1d([dataconvetint32]);
                let aws = model.predict(tensordata);
                let max = aws.argMax(1).dataSync()[0];
                let ketqua = sexname[max];
                this.setState({
                    ketquachinhthuc : ketqua
                });
                console.log(this.state.ketquachinhthuc);
            })
    }



    phongdoangioitinh = () => {
        if(this.props.dulieushh.sex === "N/A")
        {
            return(
                <button type="button" className="btn btn-success" onClick={()=>this.tensorflowtinhtoan()}>TỰ HỌC</button> 
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