import React from 'react';
import './ErrorLog.css';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export function ErrorLog(props) {
  const { errors } = props;
  console.log('errors', errors);

  return (
    <div className="errorLog">
      {errors.map((error, index) => {
        return (
          <div key={`error-${index}`} className="container">
            <h4>{error.type}</h4>
            <p>{error.info}</p>
          </div>
        );
      })}
    </div>
  );
}

export default connect(mapStateToProps)(ErrorLog);
