import React from 'react';
import PropTypes from 'prop-types';
import CreateLink from '../../CreateLink';

export default function DynamicComponent(props) {
  const NewComponent = props.component ? props.component : CreateLink;
  return <NewComponent />;
}

DynamicComponent.propTypes = {
  component: PropTypes.element,
};
