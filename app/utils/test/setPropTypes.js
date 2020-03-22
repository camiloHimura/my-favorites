import checkPropTypes from 'check-prop-types';

export default function setPropTypes({component, prop, values, requiredValues}) {
  return values.map(value =>  
    checkPropTypes(component.propTypes, { ...requiredValues, [prop]: value}, 'prop', component[prop])
  )
}