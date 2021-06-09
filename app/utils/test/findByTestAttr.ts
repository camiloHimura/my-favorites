import { ReactWrapper } from "enzyme";

export default function findByTestAttr(wrapper, val): ReactWrapper {
  return wrapper.find(`[data-test="${val}"]`);
}
