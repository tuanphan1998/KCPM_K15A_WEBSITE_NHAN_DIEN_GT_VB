import React, { Component } from 'react';
import {connect} from 'react-redux';
import {firebasethree} from '../../firebaseconnectio';
class Infos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			api : '',
			datas : []
		};
	}
	componentWillMount() {
		firebasethree.on('value',(datas) => {
			var Mang = [];
			datas.forEach(element => {
				const data = element.val();
				Mang.push(data);
			});
			this.setState({
				datas : Mang
			});
		})
	}

	phantichthanhcong = () => {
			 this.state.datas.map((item) => {
			 	if(item === this.state.datas[this.state.datas.length - 1])
			 	{
					alert("api từng tồn tại")
			 	}
			 	else
			 	{
					return(
						<h1>Thêm mới thành công</h1>
					);
			 	}
			 })
	}

	IsChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({
			[name] : value
		});
		console.log(this.state);
	}

	Buttonupdate = () => {
		this.props.Thaydoidulieuvonco(this.state.api);
		console.log(this.props.Showdulieu);
	}

 render() {
	 console.log(this.props.Showdulieu.Nhangiatriapimoi);
	 return (
		 <div>
			<div className="form-group">
				<label/>
				<input type="text" onChange={(event)=>this.IsChange(event)} className="form-control" name="api" aria-describedby="helpId" placeholder={this.props.Showdulieu.Nhangiatriapimoi} />
				<button type="button" onClick={()=>this.Buttonupdate()} name="" id="" className="btn btn-primary">Update API</button>
				{this.phantichthanhcong()}
			</div>
		 </div>
	 )
 }
}
const mapStateToProps = (state, ownProps) => {
	return {
		Showdulieu: state.nhaplieuapi
	}
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		Thaydoidulieuvonco: (getdata) => {
			dispatch({type:'ADD_API',getdata})
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Infos);