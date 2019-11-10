import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router} from "react-router-dom";
import AleartInfo from './components/notifier/AleartInfo';
import {connect} from 'react-redux';
import UserInfo from './components/UserInfo';
class App extends Component {
  showthongbao = () => {
    if(this.props.changthai === true)
    {
      return <AleartInfo/>;
    }
	}

	
  render() {
  return (
    <Router>

		{this.showthongbao()}
				<UserInfo/>
      </Router>
    );
}
}
const mapStateToProps = (state, ownProps) => {
  return {
    changthai: state.thongbao.chang
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    Getdata: () => {
      dispatch({type:'TRANG_THAI'})
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
