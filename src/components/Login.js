import React from "react";
import logo from '../../src/logo.svg';
import '../../src/App.css';
const Login = props => (
	<div className="App">
	<header className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
		<p>Đăng nhập + đăng ký nhanh</p>



		<button className="btn btn-success fa fa-github" onClick={() => props.authenticate("Github")}>
    </button>

		<div>
			<p>Hoặc</p>
		</div>

    <button className="btn btn-primary fa fa-facebook" onClick={() => props.authenticate("Facebook")}>
    </button>
	</header>
	</div>


);

export default Login;