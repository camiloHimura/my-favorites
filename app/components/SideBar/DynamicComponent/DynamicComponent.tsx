import React from 'react';
import CreateLink from '../../CreateLink';

interface iProps {
  component: React.FC
}

export const DynamicComponent: React.FC<iProps> = (props) => {
  const NewComponent = props.component ? props.component : CreateLink;
  return <NewComponent />;
}

export default DynamicComponent;
