export default function findByTestAttr(wrapper, val) {
  return wrapper.find(`[data-test="${val}"]`)
}