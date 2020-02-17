import React, { Component } from 'react';
import   firebase from "firebase";
class MenuFullOprion extends Component {

  logout =  () => {
			if(this.props.Phanquen.length === 0)
			{
				setTimeout(function(){	firebase.auth().signOut();
					window.location.reload();}, 60000);
			}
};

	PhanQUen = () => {
			if(this.props.Phanquen.length > 0 && this.props.mauuidgit === "IJGMZnvrF8QB2BN7GFNDID91eX93")
			{
				return(
					<div>
					<a className="nav-link" href="/thong-ke">	<i className="fas fa-fw fa-tachometer-alt" /><span  style={{marginLeft: '15px'}}>Thống kê</span></a>
					<a className="nav-link" href="/mat-truoc">	<i className="fas fa-meh" /><span  style={{marginLeft: '15px'}}>Mặt trước</span></a>
					<a className="nav-link" href="/du-lieu-update-no-ai">	<i className="far fa-grin-tongue-wink" /><span  style={{marginLeft: '15px'}}>Mặt trước no AI </span></a>
					<a className="nav-link" href="/mat-sau">	<i className="far fa-meh" /><span  style={{marginLeft: '15px'}}>Mặt sau</span></a>
					<a className="nav-link" href="/giong-noi">	<i className="fas fa-microphone-alt" /><span  style={{marginLeft: '15px'}}>Tạo văn bản</span></a>
					<a className="nav-link" href="/hien-thi-danh-sach">	<i className="fas fa-address-book" /><span  style={{marginLeft: '15px'}}>Danh sách tài liệu</span></a>
					<a className="nav-link" href="/du-lieu-giong-noi">	<i className="fas fa-archive" /><span  style={{marginLeft: '15px'}}>Dữ liệu giọng nói</span></a>
					<a className="nav-link" href="/danh-sach">	<i className="fas fa-list-alt" /><span  style={{marginLeft: '15px'}}>Danh sách thu thập</span></a>
					<a className="nav-link" href="/thong-tin-he-thong">	<i className="fas fa-cogs" /><span  style={{marginLeft: '15px'}}>Cài đặt</span></a>
					</div>
				)
			}
			else if(this.props.Phanquen.length > 0 && this.props.mauuidgit !== "IJGMZnvrF8QB2BN7GFNDID91eX93")
			{
				return(
					<div>
					<a className="nav-link" href="/du-lieu-update-no-ai">	<i className="far fa-grin-tongue-wink" /><span  style={{marginLeft: '15px'}}>Mặt trước no AI </span></a>
					<a className="nav-link" href="/mat-truoc">	<i className="fas fa-meh" /><span  style={{marginLeft: '15px'}}>Mặt trước</span></a>
					<a className="nav-link" href="/mat-sau">	<i className="far fa-meh" /><span  style={{marginLeft: '15px'}}>Mặt sau</span></a>
					</div>
				)
			}
			else if(this.props.Phanquen.length === 0)
			{
				return(
					
					<div>
						{/* {this.logout()} */}
					</div>
					
				)
			}
	}

	
	render() { 
		return (
			<ul className="sidebar navbar-nav">
					<li className="nav-item active">
						{this.PhanQUen()}
					</li>
			</ul>
		);
	}
}
 
export default MenuFullOprion;