import React from 'react';
import "./ErrorLog.css"
import {connect} from "react-redux";

const mapStateToProps = state => ({
  invalidTag: state.validation.invalidTag
})

export function ErrorLog(props) {
  const {erros} = props;

  return <div className="errorLog">
    <div className="container">
      <h4>type</h4>
      <p>Info</p>
    </div>
    <div className="container">
      <h4>type</h4>
      <p>Info</p>
    </div>
    <div className="container">
      <h4>type</h4>
      <p>Info</p>
    </div>
  </div>;
}

export default connect(mapStateToProps)(ErrorLog);
