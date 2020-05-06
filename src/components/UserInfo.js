import React, { Component , Fragment } from "react";
import Login from "./Login";
import   firebase from "firebase";
import {firebasefor, firebasefive} from '../firebaseconnectio';
import  { firebaseApp } from "../firebaseconnectio";
import DieuHuongUrl from  './../router/DieuHuongUrl';
import dl from "../components/Data/DulieuVuaNhap.json";
import MenuFullOprion from "./MenuFullOprion";
import VideoInput from "../views/VideoInput";
import {connect} from 'react-redux';
class UserInfo extends Component {
			constructor(props){
				super(props);
				this.state = {
					email: null,
					displayName: null,
					photoURL : null,
					uid : null,
					dataBaseQR : [],
					iconX : [],
					trangthai : Number,
					giatricotloi : Number,
					tuoitac : Number,
					persion2 : "99",
					persion3 : "00",
					persion4 : "0",
					persion5 : "0",
					time: new Date()
				};
			}
			camxucCuaNhanVien = (dl) => {
					if(dl !== undefined)
					{
						if(dl.neutral > dl.happy && dl.neutral > dl.sad && dl.neutral > dl.angry && dl.neutral > dl.fearful && dl.neutral > dl.disgusted && dl.neutral > dl.surprised)
						{
						
							this.setState({
								trangthai : 1
							});
						}
						else if(dl.happy > dl.neutral && dl.happy > dl.sad && dl.happy > dl.angry && dl.happy > dl.fearful && dl.happy > dl.disgusted && dl.happy > dl.surprised)
						{
							
							this.setState({
								trangthai : 2
							});
						}
						else if(dl.sad > dl.neutral && dl.sad > dl.happy && dl.sad > dl.angry && dl.sad > dl.fearful && dl.sad > dl.disgusted && dl.sad > dl.surprised)
						{
							
							this.setState({
								trangthai : 3
							});
						}
						else if(dl.angry > dl.neutral && dl.angry > dl.happy && dl.angry > dl.sad && dl.angry > dl.fearful && dl.angry > dl.disgusted && dl.angry > dl.surprised)
						{
						
							this.setState({
								trangthai : 4
							});
						}
						else if(dl.fearful > dl.neutral && dl.fearful > dl.happy && dl.fearful > dl.sad && dl.fearful > dl.angry && dl.fearful > dl.disgusted && dl.fearful > dl.surprised)
						{
						
							this.setState({
								trangthai : 5
							});
						}
						else if(dl.disgusted > dl.neutral && dl.disgusted > dl.happy && dl.disgusted > dl.sad && dl.disgusted > dl.angry && dl.disgusted > dl.fearful && dl.disgusted > dl.surprised)
						{
							
							this.setState({
								trangthai : 6
							});
						}
						else if(dl.surprised > dl.neutral && dl.surprised > dl.happy && dl.surprised > dl.sad && dl.surprised > dl.angry && dl.surprised > dl.fearful && dl.surprised > dl.disgusted)
						{
							
							this.setState({
								trangthai : 7
							});
						}
					}
			}
			IsCHangeP2 = (event) => {
				const name = event.target.name;
				const value = event.target.value;
				this.setState({
					[name] : value
				});
			}
			IsCHangeP4 = (event) => {
				const name = event.target.name;
				const value = event.target.value;
				this.setState({
					[name] : value
				});
			}
			IsCHangeP5 = (event) => {
				const name = event.target.name;
				const value = event.target.value;
				this.setState({
					[name] : value
				});
			}
			camXucHienThi = () => {
				let goc = JSON.stringify(this.state.iconX);
				let cut2 = goc.slice(21,-51);
			
				if(this.state.trangthai === 1)
				{
					return(<b><i className="far fa-meh"></i>:&nbsp;Bình thường</b>)
				}
				else if(this.state.trangthai === 2)
				{
					return(<b><i className="fas fa-smile-beam"></i>:&nbsp;Vui vẻ</b>)
				}
				else if(this.state.trangthai === 3)
				{
					if(cut2 === "1")
					{
						this.props.ThuchienthaydoitrangthaiA();
						this.props.ThuchienlaydulieuA("bạn ơi đừng buồn nhé tui cũng buồn lắm nếu bạn thấy buồn thì bạn hãy ra ngoài đi chơi nhé 😨. Đừng quên chọn tính năng tự out 🏔 🗻. Chúc cho nỗi buồn của bạn sớm được vơi đi 😲");
					}
					return(<b><i className="fas fa-sad-tear"></i>:&nbsp;Buồn lắm</b>)
				}
				else if(this.state.trangthai === 4)
				{
					if(cut2 === "1")
					{
						this.props.ThuchienthaydoitrangthaiA();
						this.props.ThuchienlaydulieuA("bạn ơi có không hài lòng ☹️ gì về hệ thống bạn hãy gửi cho mình kiến nghị tại gmail tuanphani.c.t@gmail.com nhé 😰");
					}
					return(<b><i className="fas fa-angry"></i>:&nbsp;Bực bội</b>)
				}
				else if(this.state.trangthai === 5)
				{
					if(cut2 === "1")
					{
						this.props.ThuchienthaydoitrangthaiA();
						this.props.ThuchienlaydulieuA("bạn đừng sợ có tôi đây rồi tôi sẽ kích hoạt tính năng tự động out tài khoản bạn 🤬 đừng cung cấp thông tin gì cho kẻ đang hại bạn nhé 😠");
						setTimeout(function(){ 	firebase.auth().signOut();window.location.reload(); }, 2000);
					}
					return(<b><i className="fas fa-ghost"></i>:&nbsp;Sợ hãi</b>)
				}
				else if(this.state.trangthai === 6)
				{
					if(cut2 === "1")
					{
						let info = {};
						info.outtaikhoan = "59";
						info.treem = this.state.persion3;
						this.props.ThaydoidulieuvoncoSSS(info);
						this.props.ThuchienthaydoitrangthaiA();
						this.props.ThuchienlaydulieuA("bạn đừng chán nhé 🤗. Tôi sẽ mở cho bạn nghe một bản nhạc hay để bạn thấy thư dãn ơn nhé hoặc bạn có thể ra ngoài cũng được 😋 . Nhưng phải bật tính năng tự động out tôi mới chạy cơ 😘");
					}
					return(<b><i className="fas fa-frown-open"></i>:&nbsp;Chán ghét</b>)
				}
				else if(this.state.trangthai === 7)
				{
					if(cut2 === "1")
					{
						this.props.ThuchienthaydoitrangthaiA();
						this.props.ThuchienlaydulieuA("bạn tìm được thông tin gì làm mình thích thú à 🤗 🤩 . Hay là lời tâm sự của một anh đẹp trai nào đó hoặc một cô gái mà bạn thích 😛 😜. Thả tym bạn");
					}
					return(<b><i className="fas fa-flushed"></i>:&nbsp;Ngạc nhiên</b>)
				}
			}
			IsCHangeP3 = (event) => {
				const name = event.target.name;
				const value = event.target.value;
				this.setState({
					[name] : value
				});
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


				firebasefive.on('value',(datas) => {
					var Mang2 = [];
					datas.forEach(element => {
						const outtaikhoan = element.val().outtaikhoan;
						const treem = element.val().treem;
						const hienThiThongBao = element.val().hienThiThongBao;
						const nhomatchu = element.val().nhomatchu;
						Mang2.push({
							hienThiThongBao : hienThiThongBao,
								outtaikhoan : outtaikhoan,
								treem : treem,
								nhomatchu : nhomatchu,
							})
					});
					this.setState({
						iconX : Mang2,
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


		LuuGiaTriKhuonMat3 = (dl) => {
				if(dl.length !== 0)
				{		
					let goc = JSON.stringify(this.state.iconX);
					let cut2 = goc.slice(52,-19);
					if(Number(dl) < Number(cut2))
					{
						firebase.auth().signOut();
						setTimeout(function(){window.location.reload() }, 2000);	
					}
				}
}

		hienthiketqua = () => {
			if(this.state.giatricotloi === 1)
			{
				return(	<button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal"><i className="fab fa-hubspot"></i>&nbsp; "Đang ngồi làm việc"</button>);
			}
			else if(this.state.giatricotloi === 0)
			{
				return(	<button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal"><i className="fab fa-hubspot"></i>&nbsp; "Không làm việc"</button>);
			}
		}

		amThanhCanhBao = () => {
			//let getNgay = new Date();
			if(this.state.giatricotloi === 0)
			{
				let goc = JSON.stringify(this.state.iconX);
				let cut = goc.slice(39,-32);
				let getNgay = new Date();
				if(getNgay.getSeconds(0) === Number(cut))
				{
					setTimeout(function(){ 	firebase.auth().signOut();
					window.location.reload(); }, 2000);
				}
				else
				{
					return(
						<iframe src="https://www.nhaccuatui.com/mh/auto/wq9TcpbG2gjL" width="620" height="382" title="demo" frameborder="0" allowfullscreen allow="autoplay"></iframe>
					)
				}
			}
		}

		ThemmoiCacThuQuanTrongveIconx = () => {
			let info = {};
			info.hienThiThongBao = this.state.persion4;
			info.nhomatchu = this.state.persion5;
			info.outtaikhoan = this.state.persion2;
			info.treem = this.state.persion3;
			this.props.ThaydoidulieuvoncoSSS(info);
			this.props.ThuchienthaydoitrangthaiA();
			this.props.ThuchienlaydulieuA("bạn đã thay đổi cài đặt thành công");
		}

		duaRaKetQua = () => {
			let goc = JSON.stringify(this.state.iconX);
			let cut = goc.slice(39,-32);
			if(cut === "59")
			{
				return("Tự động out đã bật");
			}
			else
			{
				return("Tự động out đã tắt");
			}
		}

		duaRaKetQua2 = () => {
			let goc = JSON.stringify(this.state.iconX);
			let cut = goc.slice(52,-19);
			if(cut === "00")
			{
				return("OFF security baby");
			}
			else
			{
				return("ON security baby");
			}
		}

		duaRaKetQua3 = (dl) => {
			let goc = JSON.stringify(this.state.iconX);
			let cut = goc.slice(69 , -3);
		
			if(cut === "1")
			{
				if(dl !== "unknown")
				{
					if(dl !== "Tuân phan")
					{
						firebase.auth().signOut();
						setTimeout(function(){window.location.reload() }, 2000);	
					}
				}
			}
		}

		showitem = () => {
			let goc = JSON.stringify(this.state.iconX);
			let cut = goc.slice(69 , -3);
			if(cut === "0")
			{
				return("tắt nhớ mặt chủ");
			}
			else
			{
				return("Bật nhớ mặt chủ");
			}
		}

		tennhe = (name) => {
				return(
				<b>Xin chào {name}</b>
				)
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
									{this.hienthiketqua()}
										{/* Modal */}
										<div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
											<div className="modal-dialog" role="document">
												<div className="modal-content">
													<div className="modal-header">
														<h5 className="modal-title" id="exampleModalLabel">Tinh chỉnh cài đặt trợ lý ảo iconX<span role="img" aria-label="sheep">🤗 🤩</span></h5>
														<button type="button" className="close" data-dismiss="modal" aria-label="Close">
															<span aria-hidden="true">×</span>
														</button>
													</div>
													
													<div className="modal-body">
															<div className="alert alert-warning" role="alert">
																<span role="img" aria-label="sheep">💁‍♀️ 💁‍♂️</span> 🙆‍♀️ 🙆‍♂️Giới thiệu đây là tính năng tự động out khi không có người . Nếu bạn đứng lên và không làm việc nữa hệ thống sẽ out tài khoản bạn vừa đăng nhập để bảo vệ an toàn cho hệ thống
																nếu bạn thấu phiền vì tính năng bạn có thể tắt nó đi trong tinh chỉnh lựa chọn dưới đây
															</div>

															<select className="form-control form-control-sm" onChange={(event)=>this.IsCHangeP2(event)} name="persion2">
																<option value={"-"}>Lựa chọn đuê</option>
																<option value={"59"}>Bật tính năng tự động out khi không có người</option>
																<option value={"99"}>Tắt tính năng tự động out</option>
															</select>
													</div>
													<div className="modal-body">
														<div className="alert alert-secondary" role="alert">
																<span role="img" aria-label="sheep">🙅🏻 🙅🏻‍♂️</span>Giới thiệu đây là tính năng tự động đăng xuất tài khoản khi người làm việc đối diện là một đứa bé dưới 14 tuổi . Nếu bạn thấy không cần thiết hoặc phiền thì có thể lựa chọn
																tắt tính năng này đi trong tinh chỉnh lựa chọn dưới dây
															</div>
															<select className="form-control form-control-sm" onChange={(event)=>this.IsCHangeP3(event)} name="persion3">
															<option value={"-"}>Lựa chọn đuê</option>
																<option value={"14"}>Bật tính năng khóa an toàn cho trẻ em</option>
																<option value={"00"}>Tắt tính năng khoán an toàn cho trẻ em</option>
															</select>
													</div>
													<div className="modal-body">
														<div className="alert alert-primary" role="alert">
														<span role="img" aria-label="sheep">😲</span>😰😱Lựa chọn cho trợ lý ảo trò chuyện với bạn qua thông báo 😀 và cũng tự động thay đổi một số tính năng trong một số cài đặt
															</div>
															<select className="form-control form-control-sm" onChange={(event)=>this.IsCHangeP4(event)} name="persion4">
															<option value={"-"}>Lựa chọn đuê</option>
																<option value={"1"}>Bật tính năng cho nó xàm với bạn</option>
																<option value={"0"}>Tắt tính năng cho nó xàm với bạn</option>
															</select>
													</div>
													<div className="modal-body">
														<div className="alert alert-primary" role="alert">
														<span role="img" aria-label="sheep">👹</span>🤯Lựa chọn tính năng ghi nhớ mặt chủ 😒 mô tả nếu ai đó truy cập mà không phải chủ nhân thì sẽ bị out ra khỏi hệ thống sau 2 giây đếm ngược bodoi với chúng tôi đâu
															</div>
															<select className="form-control form-control-sm" onChange={(event)=>this.IsCHangeP5(event)} name="persion5">
															<option value={"-"}>Lựa chọn đuê</option>
																<option value={"1"}>Bật tính năng nhớ mặt chủ</option>
																<option value={"0"}>Tắt tính năng nhớ mặt chủ</option>
															</select>
													</div>
													<div className="modal-footer">
														<button type="button" className="btn btn-primary"  data-dismiss="modal" onClick={()=>this.ThemmoiCacThuQuanTrongveIconx()}>Lưu lại</button>
													</div>
												</div>
											</div>
										</div>
										<VideoInput duaRaKetQua3sss={(dl)=>this.duaRaKetQua3(dl)}  LuuGiaTriKhuonMats2={(dl)=>this.LuuGiaTriKhuonMat2(dl)} camxucCuaNhanVienss={(dl)=>this.camxucCuaNhanVien(dl)} LuuGiaTriKhuonMats3={(dl)=>this.LuuGiaTriKhuonMat3(dl)}/>
								</ul>


								<ul className="navbar-nav ml-auto ml-md-0">
									<li className="nav-item dropdown no-arrow">
										<a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			
										<small className="alert alert-dark" role="alert">
											<i className="fas fa-surprise"></i>:&nbsp; {this.showitem()}&nbsp;&nbsp;&nbsp;&nbsp;
											{this.camXucHienThi()}&nbsp;&nbsp;&nbsp;&nbsp;
											<i className="fas fa-sign-out-alt"></i>:&nbsp; {this.duaRaKetQua()}&nbsp;&nbsp;&nbsp;&nbsp;
											<i className="fas fa-baby"></i>:&nbsp; {this.duaRaKetQua2()}&nbsp;&nbsp;&nbsp;&nbsp;
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
const mapStateToProps = (state, ownProps) => {
	return {
			GetData: state.laydata
	}
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		ThaydoidulieuvoncoSSS: (getupdate) => {
					dispatch({type:'THEM_LAN_THOI',getupdate})
			},
			ThuchienthaydoitrangthaiA: () => {
				dispatch({type:'TRANG_THAI'})
		},
		ThuchienlaydulieuA: (getitem) => {
				dispatch({type:'GETDATA',getitem})
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);