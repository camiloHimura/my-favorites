import checkPropTypes from 'check-prop-types';

export default function setPropTypes({component, prop, value, requiredValues}) {
  return checkPropTypes(component.propTypes, { ...requiredValues, [prop]: value}, 'prop', component[prop])
}