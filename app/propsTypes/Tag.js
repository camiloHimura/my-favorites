export default function Tag(PropTypes){
  return {
    id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }
}