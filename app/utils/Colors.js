
import RamdomBetween from "./RamdomBetween";

function Colors() {
  let _color = ["81A632", "BCBF5A", "8A8C46", "D9D0C7", "A67356", "538EA6", "427F8C", "73B1BF", "7ED0D9",
              "90A680", "9DBF7A", "7B52AB", "9768D1", "F2B705", "F28705", "F2AF5C", "92A4A6", "C5D7D9"]

  return {
      getRamdom() {
        return _color[RamdomBetween(0, _color.length)];
      }
  }
}

export default Colors();