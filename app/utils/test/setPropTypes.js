import checkPropTypes from 'check-prop-types';

export default function setPropTypes({component, prop, value, requiredValues}) {
  checkPropTypes(component.propTypes, { ...requiredValues, [prop]: value}, 'prop', component[prop])
}