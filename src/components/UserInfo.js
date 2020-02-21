import React, { Component , Fragment } from "react";
import Login from "./Login";
import   firebase from "firebase";
import {firebasefor} from '../firebaseconnectio';
import  { firebaseApp } from "../firebaseconnectio";
import DieuHuongUrl from  './../router/DieuHuongUrl';
import dl from "../components/Data/DulieuVuaNhap.json";
import MenuFullOprion from "./MenuFullOprion";
import VideoInput from "../views/VideoInput";
class UserInfo extends Component {
			constructor(props){
				super(props);
				this.state = {
					email: null,
					displayName: null,
					photoURL : null,
					uid : null,
					dataBaseQR : [],
					giatricotloi : Number,
					time: new Date()
				};
			}
			componentWillMount() {
				if(localStorage.getItem('komsa') === null)
				{
					localStorage.setItem('komsa',JSON.stringify(dl));
				}
				firebasefor.on('value',(datas) => {
					var Mang = [];
					datas.forEach(element => {
						const key = element.key;
						const queQR = element.val().queQR;
						const time = element.val().time;
						const time2 = element.val().time2;
						const check = element.val().check;
						if(check === "1"){
							Mang.push({
								key : key,
								queQR : queQR,
								time : time,
								time2 : time2
							})
						}
					});
					this.setState({
						dataBaseQR : Mang,
					});
				})
			}
	
      componentDidMount() {
				this.timerID = setInterval(() => this.tick(), 1000);
				firebase.auth().onAuthStateChanged(user => {
				if (user){
					this.authHandler({ user });
							}
						this.setState({
							uid : user.uid
						});
						});
	  }
	  
	 
      authHandler = async authData => {
        const user = authData.user;
        this.setState({
          email: user.email,
					displayName: user.displayName,
					photoURL : user.photoURL
        });
      };
    
      authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
          .auth()
          .signInWithPopup(authProvider)
          .then(this.authHandler);
      };
    
      logout = async () => {
        await firebase.auth().signOut();
        this.setState({ email: null, displayName: null , photoURL : null });
		};

		dangTaiKhoan = () => {
			if(this.state.uid === "IJGMZnvrF8QB2BN7GFNDID91eX93")
			{
				return("Người điều hành")
			}
			else
			{
				return("người khác");
			}
		}
		trangthaikichhoatQR = () => {
			const localStore1 = localStorage.getItem("komsa");
			if(localStore1)
			{
				return(<b><i className="fas fa-smile-beam"></i> : Mã QR được quét</b>)
			}
			else
			{
				return(<b><i className="fas fa-angry"></i> : Mã QR không được quét</b>)
			}
		}
		kiemtraPhuVaGiay = (i) => {
			if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
			return i;
		}

		tick() {
			this.setState({
				time: new Date()
			});
		}



		LuuGiaTriKhuonMat2 = (dl) => {
			console.log(dl.length);
					if(dl.length === 0)
					{
						this.setState({
							giatricotloi : dl.length
						});
					
					}
					else if(dl.length === 1)
					{
						this.setState({
							giatricotloi : dl.length
						});
					}
		}

		hienthiketqua = () => {
			if(this.state.giatricotloi === 1)
			{
				return("Bạn đang ngồi làm việc ");
			}
			else if(this.state.giatricotloi === 0)
			{
				return("Bạn đã rời khỏi bàn làm việc hoặc do hệ thống chưa nhận ra bạn");
			}
		}

		Dienguoc = () => {
			if(this.state.giatricotloi === 1)
			{
				return(
					"pedding"
				)
			}
			else
			{
				return(
					"endding"
				)
			}
		}

		amThanhCanhBao = () => {
			if(this.state.giatricotloi === 0)
			{
				return(	<audio controls>
						 <source src="horse.mp3" type="audio/mpeg"></source>
					</audio>)
			}
		}



  render() {
   const logout = <button onClick={this.logout}>Log Out!</button>;
    if (!this.state.email) {
      return <Login authenticate={this.authenticate} />;
		}
		var ketqua = [];
		this.state.dataBaseQR.forEach((item) => {
			if(item.queQR.indexOf(JSON.parse(localStorage.getItem("komsa"))) !== -1)
			{
					ketqua.push(item);
			}
		});
    return (
     <Fragment>
      	<div>

							<nav className="navbar navbar-expand navbar-dark bg-dark static-top">
								<a className="navbar-brand mr-1 fontssss" href="index.html"><img src="https://www.upsieutoc.com/images/2020/02/12/pngfuel.com.png" className="anhdaidien" alt="iconImage" />One world one dream</a>
								{/* Navbar Search */}
								<form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
								</form>
								{/* Navbar */}
								
								<ul className="navbar-nav ml-auto ml-md-0">
										<button type="button" className="btn btn-danger" data-toggle="modal" data-target="#myModal"><i className="fab fa-hubspot"></i>:&nbsp;{this.hienthiketqua()}</button>
										<VideoInput  LuuGiaTriKhuonMats2={(dl)=>this.LuuGiaTriKhuonMat2(dl)}/>
								</ul>


								<ul className="navbar-nav ml-auto ml-md-0">
									<li className="nav-item dropdown no-arrow">
										<a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			
										<small className="alert alert-dark" role="alert">
											<i className="fas fa-sign-out-alt"></i>:&nbsp; {this.Dienguoc()}&nbsp;&nbsp;&nbsp;&nbsp;
											<i className="far fa-user-circle"></i> :&nbsp;{this.dangTaiKhoan()}&nbsp;&nbsp;&nbsp;&nbsp;
											<i className="fas fa-clock"></i> :&nbsp;{this.state.time.toLocaleTimeString()}&nbsp;&nbsp;&nbsp;&nbsp;
											{this.trangthaikichhoatQR()}
										</small>
										<img src={this.state.photoURL} alt="logo" style={{width: '40px'}} />
										</a>
										<div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
											<a className="dropdown-item" href="/"> <span>{this.state.displayName}</span></a>
											<a className="dropdown-item" href="/"> <span>{this.state.email}</span></a>
											<div className="dropdown-divider" />
											<a className="dropdown-item" href="/" data-toggle="modal" data-target="#logoutModal">Đăng xuất</a>
										</div>
									</li>
								</ul>

							</nav>

							<div id="wrapper">
								{/* Sidebar */}
								<MenuFullOprion Phanquen={ketqua} mauuidgit={this.state.uid} giatricotlois={this.state.giatricotloi}/>
								<div id="content-wrapper">
									<div className="container-fluid">
										{/* Breadcrumbs*/}

										<p hidden>{this.amThanhCanhBao()}</p>
										<DieuHuongUrl/>

									
								
										

										{/* Sticky Footer */}
										<footer className="sticky-footer">
											<div className="container my-auto">
												<div className="copyright text-center my-auto">
													<span>Copyright © Your Website 2019</span>
												</div>
											</div>
										</footer>
									</div>
									{/* /.content-wrapper */}
								</div>
								{/* /#wrapper */}
								{/* Scroll to Top Button*/}
								<a className="scroll-to-top rounded" href="#page-top">
									<i className="fas fa-angle-up" />
								</a>
								{/* Logout Modal*/}
								<div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
									<div className="modal-dialog" role="document">
										<div className="modal-content">
											<div className="modal-header">
												<h5 className="modal-title" id="exampleModalLabel">Bạn có muốn đăng xuất không?</h5>
												<button className="close" type="button" data-dismiss="modal" aria-label="Close">
													<span aria-hidden="true">×</span>
												</button>
											</div>
											<div className="modal-body">Nếu đồng lý hãy chọn Logout nếu không đồng ý hãy chọn Cancel</div>
											<div className="modal-footer">
												<button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
													<button className="btn btn-primary" type="button">{logout}</button>
											</div>
										</div>
									</div>
								</div>
							</div>	
					</div>
      </Fragment>
    );
  }
}

export default UserInfo;