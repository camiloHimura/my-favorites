import React from 'react';
import CreateLink from "../../CreateLink";

export default function DynamicComponent(props) {
  const NewComponent = props.component? props.component: CreateLink;
  return <NewComponent />;
}
