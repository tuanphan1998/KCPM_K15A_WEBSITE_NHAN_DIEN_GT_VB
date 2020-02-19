import React, { Component , Fragment } from "react";
import Login from "./Login";
import   firebase from "firebase";
import {firebasefor} from '../firebaseconnectio';
import  { firebaseApp } from "../firebaseconnectio";
import DieuHuongUrl from  './../router/DieuHuongUrl';
import dl from "../components/Data/DulieuVuaNhap.json";
import MenuFullOprion from "./MenuFullOprion";
import Countdown from 'react-countdown';
import Webcam from 'react-webcam';
import { loadModels, getFullFaceDescription, createMatcher } from '../api/face';
const JSON_PROFILE = require('../descriptors/bnk48.json');
const WIDTH = 720;
const HEIGHT = 420;
const inputSize = 160;
const Completionist = () => <span>Hẹn gặp lại bạn nhé</span>;
class UserInfo extends Component {
   constructor(props) {
		 super(props);
		 this.webcam = React.createRef();
		 this.state = {
			email: null,
			displayName: null,
			photoURL : null,
			uid : null,
			dataBaseQR : [],
			fullDesc: null,
      detections: null,
      descriptors: null,
      faceMatcher: null,
      match: null,
      facingMode: null,
			time: new Date()
		 };
	 }

			componentWillMount = async () => {
				await loadModels();
				this.setState({ faceMatcher: await createMatcher(JSON_PROFILE) });
				this.setInputDevice();
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

			setInputDevice = () => {
				navigator.mediaDevices.enumerateDevices().then(async devices => {
					let inputDevice = await devices.filter(
						device => device.kind === 'videoinput'
					);
					if (inputDevice.length < 2) {
						await this.setState({
							facingMode: 'user'
						});
					} else {
						await this.setState({
							facingMode: { exact: 'environment' }
						});
					}
					this.startCapture();
				});
			};
			startCapture = () => {
				this.interval = setInterval(() => {
					this.capture();
				}, 1500);
			};
			componentWillUnmount() {
				clearInterval(this.interval);
			}
			capture = async () => {
				if (!!this.webcam.current) {
					await getFullFaceDescription(
						this.webcam.current.getScreenshot(),
						inputSize
					).then(fullDesc => {
						if (!!fullDesc) {
							this.setState({
								detections: fullDesc.map(fd => fd.detection),
								descriptors: fullDesc.map(fd => fd.descriptor)
							});
						}
					});
		
					if (!!this.state.descriptors && !!this.state.faceMatcher) {
						let match = await this.state.descriptors.map(descriptor =>
							this.state.faceMatcher.findBestMatch(descriptor)
						);
						this.setState({ match });
					}
				}
			};
	
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
				return(
					<small className="alert alert-success" role="alert">
  				<i className="fas fa-smile-beam"></i> : Mã QR được quét
				</small>
				)
			}
			else
			{
				return(
					<small className="alert alert-danger" role="alert">
					<i className="fas fa-angry"></i> : Mã QR không được quét
				</small>
				)
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



  render() {
		console.log(this.state.match);
    const { detections, match, facingMode } = this.state;
    let videoConstraints = null;
    let camera = '';
    if (!!facingMode) {
      videoConstraints = {
        width: WIDTH,
        height: HEIGHT,
        facingMode: facingMode
      };
      if (facingMode === 'user') {
        camera = 'Front';
      } else {
        camera = 'Back';
      }
    }

    let drawBox = null;
    if (!!detections) {
      drawBox = detections.map((detection, i) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;
        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                border: 'solid',
                borderColor: 'blue',
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`
              }}
            >
              {!!match && !!match[i] ? (
                <p
                  style={{
                    backgroundColor: 'blue',
                    border: 'solid',
                    borderColor: 'blue',
                    width: _W,
                    marginTop: 0,
                    color: '#fff',
                    transform: `translate(-3px,${_H}px)`
                  }}
                >
                  {match[i]._label}
                </p>
              ) : null}
            </div>
          </div>
        );
      });
    }
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
									<li className="nav-item dropdown no-arrow">
										<a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									
										<small className="alert alert-dark" role="alert">
											<i className="fas fa-sign-out-alt"></i>:&nbsp;<Countdown date={Date.now() + 57000}><Completionist /></Countdown>&nbsp;&nbsp;&nbsp;&nbsp;
											<i className="far fa-user-circle"></i> :&nbsp;{this.dangTaiKhoan()}&nbsp;&nbsp;&nbsp;&nbsp;
											<i className="fas fa-clock"></i> :&nbsp;{this.state.time.toLocaleTimeString()}&nbsp;&nbsp;&nbsp;&nbsp;
										</small>
										
										{this.trangthaikichhoatQR()}
										
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
								<MenuFullOprion Phanquen={ketqua} mauuidgit={this.state.uid} />
								<div id="content-wrapper">
									<div className="container-fluid">
										{/* Breadcrumbs*/}

										<DieuHuongUrl/>










										<div
        className="Camera"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <p>Camera: {camera}</p>
        <div
          style={{
            width: WIDTH,
            height: HEIGHT
          }}
        >
          <div style={{ position: 'relative', width: WIDTH }}>
            {!!videoConstraints ? (
              <div style={{ position: 'absolute' }}>
                <Webcam
                  audio={false}
                  width={WIDTH}
                  height={HEIGHT}
                  ref={this.webcam}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              </div>
            ) : null}
            {!!drawBox ? drawBox : null}
          </div>
        </div>
      </div>









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