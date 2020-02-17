import React, { Component , Fragment } from "react";
import Login from "./Login";
import   firebase from "firebase";
import  { firebaseApp } from "../firebaseconnectio";
import DieuHuongUrl from  './../router/DieuHuongUrl';
class UserInfo extends Component {
    state = {
       			email: null,
				displayName: null,
				photoURL : null
      };
    
      componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            this.authHandler({ user });
          }
        });
      }


      authHandler = async authData => {
        console.log(authData);
        const user = authData.user;
        this.setState({
          email: user.email,
					displayName: user.displayName,
					photoURL : user.photoURL
        });
      };
    
      authenticate = provider => {
        console.log(provider);
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
          .auth()
          .signInWithPopup(authProvider)
          .then(this.authHandler);
      };
    
      logout = async () => {
        console.log("logout");
        await firebase.auth().signOut();
        this.setState({ email: null, displayName: null , photoURL : null });
      };



  render() {
   const logout = <button onClick={this.logout}>Log Out!</button>;
    if (!this.state.email) {
      return <Login authenticate={this.authenticate} />;
		}
		console.log(this.state);
    return (
     <Fragment>
      	<div>
							<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
								{/* Brand/logo */}
								<a className="navbar-brand" href="/">
									<img src={this.state.photoURL} alt="logo" style={{width: '40px'}} />
								</a>
								{/* Links */}
								<ul className="navbar-nav">
									<li className="nav-item">
										<a className="nav-link" href="/">Username : <span>{this.state.displayName}</span></a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="/">Email : <span>{this.state.email}</span></a>
									</li>
								</ul>
							</nav>


								<div className="App">
									<header className="App-header">
										<div className="container mt-5 mb-4">
												<div className="row">
																<div className="col-4">
																	<div className="list-group" id="list-tab" role="tablist">
																		<a  className="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Front card</a>
																		<a className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Back card</a>
																		<a className="list-group-item list-group-item-action" id="list-profile-list2" data-toggle="list" href="#list-profile2" role="tab" aria-controls="profile">Back up Card</a>
																		<a className="list-group-item list-group-item-action" id="list-profile-list3" data-toggle="list" href="#list-profile3" role="tab" aria-controls="profile">InFo Edit Card</a>
																		<a className="list-group-item list-group-item-action" id="list-profile-list4" data-toggle="list" href="#list-profile4" role="tab" aria-controls="profile">Language</a>
																		<a className="list-group-item list-group-item-action" id="list-profile-list7" data-toggle="list" href="#list-profile7" role="tab" aria-controls="profile">Language Data Show</a>
																		<a className="list-group-item list-group-item-action" id="list-profile-list5" data-toggle="list" href="#list-profile5" role="tab" aria-controls="profile">Language Data del</a>
																		<a className="list-group-item list-group-item-action" id="list-profile-list6" data-toggle="list" href="#list-profile6" role="tab" aria-controls="profile">Put card no AI</a>
																		<a className="list-group-item list-group-item-action" id="list-profile-list8" data-toggle="list" href="#list-profile8" role="tab" aria-controls="profile">Infos system</a>
																	</div>
																</div>
																<div className="col-8">
																	<div className="tab-content" id="nav-tabContent">
																		<div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list"> Mặt trước cung cấp đủ thông tin cho người dùng bao gồm tự động nhận diện ảnh face , thông tin mã <code>cmnd or số cccd</code> địa chỉ quê quán và ngày sinh <a href="/mat-truoc">Ấn vào đây</a></div>
																		<div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">Mặt sau cung cấp đủ thông tin cho người dùng bao gồm tự động nhận diện văn bản khu vực tôn giáo , dân tộc , nơi cấp <a href="/mat-sau">Ấn vào đây</a></div>
																		<div className="tab-pane fade" id="list-profile2" role="tabpanel" aria-labelledby="list-profile-list2">Đưa ra danh sách user thống kê lưu trữ mọi thông tin đã cấp quyền quét <a href="/danh-sach">Ấn vào đây</a></div>
																		<div className="tab-pane fade" id="list-profile3" role="tabpanel" aria-labelledby="list-profile-list3">Đưa ra các sự lựa chọn về sửa đổi dữ liệu user và thống kê tỉ lệ các thay đổi đã thiết lập<a href="/thong-ke">Ấn vào đây</a></div>
																		<div className="tab-pane fade" id="list-profile4" role="tabpanel" aria-labelledby="list-profile-list4">Đưa ra công cụ chuyển hóa văn bản thành giọng nói đảm bảo chất lượng âm thanh tốt mang lại một trải ngiệm tốt <a href="/giong-noi">Ấn vào đây</a></div>
																		<div className="tab-pane fade" id="list-profile7" role="tabpanel" aria-labelledby="list-profile-list7"> Lưu trữ toàn tệp âm thanh và hình ảnh tài liệu của nhà bạn :))<a href="/hien-thi-danh-sach">Ấn vào đây</a></div>
																		<div className="tab-pane fade" id="list-profile5" role="tabpanel" aria-labelledby="list-profile-list5"> Lưu trữ toàn bộ tệp âm thanh và các thao tác xóa văn bản hành chính online của bạn <a href="/du-lieu-giong-noi">Ấn vào đây</a></div>
																		<div className="tab-pane fade" id="list-profile6" role="tabpanel" aria-labelledby="list-profile-list6"> Update data không sử dụng hình ảnh và công nghệ trí tuệ nhân tạo <a href="/du-lieu-update-no-ai">Ấn vào đây</a></div>
																		<div className="tab-pane fade" id="list-profile8" role="tabpanel" aria-labelledby="list-profile-list8"> View info system tổng hợp lại toàn bộ thông tin nhà phát triển , tổng số lần gọi <a href="/thong-tin-he-thong">Ấn vào đây</a></div>
																	</div>
																</div>
											</div>
											<DieuHuongUrl/>
										</div>
									</header>
								</div>
					</div>
					  <div>{logout}</div>
      </Fragment>
    );
  }
}

export default UserInfo;