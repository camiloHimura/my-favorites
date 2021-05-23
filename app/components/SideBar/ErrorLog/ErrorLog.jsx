import React from 'react';
import PropTypes from 'prop-types';
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

ErrorLog.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
    }),
  ),
};

export default connect(mapStateToProps)(ErrorLog);
