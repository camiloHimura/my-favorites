import React from 'react';
import './ErrorLog.css';
import { RootState } from '../../../state/store';
import { useAppSelector } from '../../../hooks/redux';

const selectErrors = (state: RootState) => state.errors;

const ErrorLog: React.FC = () => {
  const errors = useAppSelector(selectErrors);

  return (
    <div className="errorLog">
      {errors.map((error, index) => (
        <div key={`error-${index}`} className="container">
          <h4>{error.type}</h4>
          <p>{error.info}</p>
        </div>
      ))}
    </div>
  );
};

export default ErrorLog;
