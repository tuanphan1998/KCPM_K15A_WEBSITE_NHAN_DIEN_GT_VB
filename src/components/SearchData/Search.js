import React, { Component } from 'react';
 
class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            search : ''
        };
    }
    IsChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name] : value
        });
        console.log(this.state);
        this.props.GhiNhanKietQuaTimKiem(this.state.search);
    }
    render() { 
        return (
        <div className="form-group">
            <div className="btn-group  d-flex justify-content-start">
              <input type="text" onChange={(event)=>this.IsChange(event)} name="search"  style={{width: '260px'}} className="form-control"  aria-describedby="helpId" placeholder="Nhập từ khóa" />
              <div className="btn btn-info" onClick={(dl)=>this.props.GhiNhanKietQuaTimKiem(this.state.search)}>Tìm kiếm</div>
            </div>
          </div>
        );
    }
}
 
export default Search;