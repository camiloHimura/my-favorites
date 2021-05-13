export default function Icon(PropType) {
  return (Icon.propType = {
    style: PropType.object,
    color: PropType.string,
    pointer: PropType.bool,
    className: PropType.string,
    name: PropType.string.isRequired,
    onClick: PropType.func.isRequired,
  });
}
